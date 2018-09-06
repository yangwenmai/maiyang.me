---
title: 'Drone 源码分析之数据库初始化'
keywords: golang, sync, drone, CI/CD, DevOps
date: 2018-09-04T06:00:00+08:00
lastmod: 2018-09-04T06:00:00+08:00
draft: false
description: 'Drone 源码分析之数据库初始化'
categories: [golang]
tags: [golang, sync, drone, CI/CD, DevOps]
comments: true
author: mai
---

本文是来自于我在使用 Drone 过程中遇到一个问题的排查，然后延伸出来的一篇 Drone 源码分析，希望能对你有所帮助。

----

## 缘由

我增加 commit 信息为中文后提交推送到 gitlab 上，结果 Drone 任务没有触发执行

>为什么没有自动触发构建呢？

难道是 Webhook 没有调用？遇到问题，肯定最好的方式是查看日志了。

```sh
time="2018-09-05T02:01:52Z" level=error msg="failure to save commit for developer-learning/gcd. meddler.Insert: DB error in Exec: Error 1366: Incorrect string value: '\\xE6\\x8F\\x90\\xE4\\xBA\\xA4...' for column 'build_message' at row 1"
```

从日志我们可以很明显的看到错误信息 `meddler.Insert: DB error in Exec: Error 1366: Incorrect string value`，典型的是数据库字符集问题。

>commit message 为中文时，无法插入到 MySQL 数据库，然后我去查看 MySQL 的数据库表：

```sql
CREATE TABLE `builds` (
  `build_id` int(11) NOT NULL AUTO_INCREMENT,
  `build_repo_id` int(11) DEFAULT NULL,
  `build_number` int(11) DEFAULT NULL,
  `build_event` varchar(500) DEFAULT NULL,
  `build_status` varchar(500) DEFAULT NULL,
  `build_enqueued` int(11) DEFAULT NULL,
  `build_created` int(11) DEFAULT NULL,
  `build_started` int(11) DEFAULT NULL,
  `build_finished` int(11) DEFAULT NULL,
  `build_commit` varchar(500) DEFAULT NULL,
  `build_branch` varchar(500) DEFAULT NULL,
  `build_ref` varchar(500) DEFAULT NULL,
  `build_refspec` varchar(1000) DEFAULT NULL,
  `build_remote` varchar(500) DEFAULT NULL,
  `build_title` varchar(1000) DEFAULT NULL,
  `build_message` varchar(2000) DEFAULT NULL,
  `build_timestamp` int(11) DEFAULT NULL,
  `build_author` varchar(500) DEFAULT NULL,
  `build_avatar` varchar(1000) DEFAULT NULL,
  `build_email` varchar(500) DEFAULT NULL,
  `build_link` varchar(1000) DEFAULT NULL,
  `build_deploy` varchar(500) DEFAULT NULL,
  `build_signed` tinyint(1) DEFAULT NULL,
  `build_verified` tinyint(1) DEFAULT NULL,
  `build_parent` int(11) DEFAULT NULL,
  `build_error` varchar(500) DEFAULT NULL,
  `build_reviewer` varchar(250) DEFAULT NULL,
  `build_reviewed` int(11) DEFAULT NULL,
  `build_sender` varchar(250) DEFAULT NULL,
  `build_config_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`build_id`),
  UNIQUE KEY `build_number` (`build_number`,`build_repo_id`),
  KEY `ix_build_repo` (`build_repo_id`),
  KEY `ix_build_author` (`build_author`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

发现 `build_message` 表的字符集是 `latin1` 。

>有关[MySQL 字符集](https://dev.mysql.com/doc/mysql-g11n-excerpt/5.7/en/charset-unicode.html)

## 源码分析

`server.go` 中调用 `setupStore`：

```golang
// cmd/drone-serverserver.go
store_ := setupStore(c)
```

```golang
// setup.go
func setupStore(c *cli.Context) store.Store {
	return datastore.New(
		c.String("driver"),
		c.String("datasource"),
	)
}
```

```golang
// store/datastore/store.go
// New creates a database connection for the given driver and datasource
// and returns a new Store.
func New(driver, config string) store.Store {
	return &datastore{
		DB:     open(driver, config),
		driver: driver,
		config: config,
	}
}
...
// open opens a new database connection with the specified
// driver and connection string and returns a store.
func open(driver, config string) *sql.DB {
	db, err := sql.Open(driver, config)
	if err != nil {
		logrus.Errorln(err)
		logrus.Fatalln("database connection failed")
	}
	if driver == "mysql" {
		// per issue https://github.com/go-sql-driver/mysql/issues/257
		db.SetMaxIdleConns(0)
	}

	setupMeddler(driver)

	if err := pingDatabase(db); err != nil {
		logrus.Errorln(err)
		logrus.Fatalln("database ping attempts failed")
	}

	if err := setupDatabase(driver, db); err != nil {
		logrus.Errorln(err)
		logrus.Fatalln("migration failed")
	}
	return db
}

...

// helper function to setup the databsae by performing
// automated database migration steps.
func setupDatabase(driver string, db *sql.DB) error {
	return ddl.Migrate(driver, db)
}
```

```golang
// store/datastore/ddl/migrate.go
// Migrate performs the database migration. If the migration fails
// and error is returned.
func Migrate(driver string, db *sql.DB) error {
	if err := checkPriorMigration(db); err != nil {
		return err
	}
	switch driver {
	case DriverMysql:
		return mysql.Migrate(db)
	case DriverPostgres:
		return postgres.Migrate(db)
	default:
		return sqlite.Migrate(db)
	}
}
```

```golang
// store/datastore/ddl/mysql/ddl_gen.go
// Migrate performs the database migration. If the migration fails
// and error is returned.
func Migrate(db *sql.DB) error {
	if err := createTable(db); err != nil {
		return err
	}
	completed, err := selectCompleted(db)
	if err != nil && err != sql.ErrNoRows {
		return err
	}
	for _, migration := range migrations {
		if _, ok := completed[migration.name]; ok {

			continue
		}

		if _, err := db.Exec(migration.stmt); err != nil {
			return err
		}
		if err := insertMigration(db, migration.name); err != nil {
			return err
		}

	}
	return nil
}
```

从 `migrations` 表中查询到数据并存放到一个 map 中，然后用这个 map 来检查清单语句是否存在，也就是检查表是否已经存在，存在即跳出，继续 for 循环，否则执行 SQL 语句，然后将其插入 `migrations` 表中。

Drone 支持数据库：

- SQLite3
- MySQL
- PostgreSQL

## 思考

1. 如果 Drone 业务逻辑调整，表结构要调整的话，这里的代码逻辑应该会遇到问题吧？（不兼容）
2. Drone 使用原生的 `database/sql` 包，没有使用数据库插件/ORM；

## 参考资料

1. [default some columns to utf8mb4 #2144](https://github.com/drone/drone/issues/2144)

----

## 参考资料

1. 

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
