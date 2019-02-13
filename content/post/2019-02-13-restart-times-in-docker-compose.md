---
title: '从查看 docker 服务 restart 次数说起->'
keywords: docker, golang, docker-compose, restart, times
date: 2019-02-13T16:13:00+08:00
lastmod: 2019-02-13T16:13:00+08:00
draft: false
description: '从查看 docker 服务 restart 次数说起->'
categories: [docker]
tags: [docker, golang, docker-compose, restart, times]
comments: true
author: mai
---

## 背景

为什么我要知道查看 docker 服务的 restart 次数呢？

```sh
CONTAINER ID        IMAGE                            COMMAND                  CREATED             STATUS              PORTS                                                                                                     NAMES
13c212bc5cf1        redis:4-alpine                   "docker-entrypoint.s…"   4 weeks ago         Up 13 days          0.0.0.0:6380->6379/tcp                                                                                    dev_redis_1
```

我发现每次调用一个会 panic 的 Docker 服务后，它的 `STATUS` 时间是显示 Up 几秒钟之前，但是 `CREATED` 的时间一直没有变化的。

从这里我联想到，那我是否可以查看每个 docker 容器的重启次数呢？

**当然，这里会有一个前提是，你的 docker 容器是设置了 `restart: Always` 或者： `restart: on-failure: 3` 这类的重启策略**

重启策略：

- no
- on-failure
- unless-stopped
- always

查看方法：

```sh
$ docker inspect -f "{{ .RestartCount }}" docker-service-name
102
```

输出的结果就是重启的次数。

为什么是这样写的呢？

### 首先，我们来看看 docker command help

```sh
$ docker help
...
inspect     Return low-level information on Docker objects # 返回 Docker 对象中的低级信息。
...
```

### docker inspect container_id

```json
➭ docker inspect dev_db_1
[
    {
        "Id": "xxx",
        "Created": "2019-01-27T09:59:20.849355325Z",
        "Path": "docker-entrypoint.sh",
        "Args": [
            "--character-set-server=utf8mb4",
            "--collation-server=utf8mb4_unicode_ci"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 3359,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2019-01-30T16:59:13.975716147Z",
            "FinishedAt": "2019-01-30T16:44:04.737912071Z"
        },
        "Image": "sha256:xxx",
        "ResolvConfPath": "/var/lib/docker/containers/xxx/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/xxx/hostname",
        "HostsPath": "/var/lib/docker/containers/xxx/hosts",
        "LogPath": "/var/lib/docker/containers/xxx/xx-json.log",
        "Name": "/dev_db_1",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": [
                ".../dev/config/mysql_init.sql:/docker-entrypoint-initdb.d/mysql_init.sql:rw",
                "dev_data_db:/var/lib/mysql:rw"
            ],
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "dev_default",
            "PortBindings": {
                "3306/tcp": [
                    {
                        "HostIp": "",
                        "HostPort": "3306"
                    }
                ]
            },
            "RestartPolicy": {
                "Name": "",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": [],
            "CapAdd": null,
            "CapDrop": null,
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "shareable",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "ConsoleSize": [
                0,
                0
            ],
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": null,
            "BlkioDeviceReadBps": null,
            "BlkioDeviceWriteBps": null,
            "BlkioDeviceReadIOps": null,
            "BlkioDeviceWriteIOps": null,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": null,
            "DeviceCgroupRules": null,
            "DiskQuota": 0,
            "KernelMemory": 0,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": false,
            "PidsLimit": 0,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/xxx-init/diff:/var/lib/docker/overlay2/xxx/diff:/var/lib/docker/overlay2/xxx/diff:/var/lib/docker/overlay2/xxx/diff:/var/lib/docker/overlay2/xxx/diff:/var/lib/docker/overlay2/xxx/diff:/var/lib/docker/overlay2/xxx/diff:/var/lib/docker/overlay2/xxx/diff:/var/lib/docker/overlay2/xxx/diff:/var/lib/docker/overlay2/xxx/diff:/var/lib/docker/overlay2/xxx/diff:/var/lib/docker/overlay2/xxx/diff",
                "MergedDir": "/var/lib/docker/overlay2/xxx/merged",
                "UpperDir": "/var/lib/docker/overlay2/xxx/diff",
                "WorkDir": "/var/lib/docker/overlay2/xxx/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [
            {
                "Type": "bind",
                "Source": ".../dev/config/mysql_init.sql",
                "Destination": "/docker-entrypoint-initdb.d/mysql_init.sql",
                "Mode": "rw",
                "RW": true,
                "Propagation": "rprivate"
            },
            {
                "Type": "volume",
                "Name": "dev_data_db",
                "Source": "/var/lib/docker/volumes/dev_data_db/_data",
                "Destination": "/var/lib/mysql",
                "Driver": "local",
                "Mode": "rw",
                "RW": true,
                "Propagation": ""
            }
        ],
        "Config": {
            "Hostname": "xxx",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "ExposedPorts": {
                "3306/tcp": {},
                "33060/tcp": {}
            },
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "MYSQL_ROOT_PASSWORD=xxx",
                "MYSQL_DATABASE=xxx",
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "GOSU_VERSION=1.7",
                "MYSQL_MAJOR=5.7",
                "MYSQL_VERSION=5.7.23-1debian9"
            ],
            "Cmd": [
                "--character-set-server=utf8mb4",
                "--collation-server=utf8mb4_unicode_ci"
            ],
            "Image": "mysql:5.7",
            "Volumes": {
                "/docker-entrypoint-initdb.d/mysql_init.sql": {},
                "/var/lib/mysql": {}
            },
            "WorkingDir": "",
            "Entrypoint": [
                "docker-entrypoint.sh"
            ],
            "OnBuild": null,
            "Labels": {
                "com.docker.compose.config-hash": "xxx",
                "com.docker.compose.container-number": "1",
                "com.docker.compose.oneoff": "False",
                "com.docker.compose.project": "dev",
                "com.docker.compose.service": "db",
                "com.docker.compose.version": "1.23.2"
            }
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "xxx",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {
                "3306/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "3306"
                    }
                ],
                "33060/tcp": null
            },
            "SandboxKey": "/var/run/docker/netns/xxx",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "",
            "Gateway": "",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "",
            "IPPrefixLen": 0,
            "IPv6Gateway": "",
            "MacAddress": "",
            "Networks": {
                "dev_default": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": [
                        "db",
                        "xxx"
                    ],
                    "NetworkID": "xxx",
                    "EndpointID": "xxx",
                    "Gateway": "172.20.0.1",
                    "IPAddress": "172.20.0.3",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "xxx",
                    "DriverOpts": null
                }
            }
        }
    }
]
```

这里的所有 Docker 对象的低级别的配置信息。

### 如何获取某个配置呢？

这么多的信息，我是否可以获取指定的配置呢？提供了 `format` 方法。

format 的语法是 golang 的 `text/template`。


## Docker inspect 源码阅读


*github.com/docker/cli/cli/command/system/inspect.go*

```golang
// NewInspectCommand creates a new cobra.Command for `docker inspect`
func NewInspectCommand(dockerCli command.Cli) *cobra.Command {
	var opts inspectOptions

	cmd := &cobra.Command{
		Use:   "inspect [OPTIONS] NAME|ID [NAME|ID...]",
		Short: "Return low-level information on Docker objects",
		Args:  cli.RequiresMinArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.ids = args
			return runInspect(dockerCli, opts)
		},
	}

	flags := cmd.Flags()
	flags.StringVarP(&opts.format, "format", "f", "", "Format the output using the given Go template")
	flags.StringVar(&opts.inspectType, "type", "", "Return JSON for specified type")
	flags.BoolVarP(&opts.size, "size", "s", false, "Display total file sizes if the type is container")

	return cmd
}

func runInspect(dockerCli command.Cli, opts inspectOptions) error {
	var elementSearcher inspect.GetRefFunc
	switch opts.inspectType {
	case "", "container", "image", "node", "network", "service", "volume", "task", "plugin", "secret":
		elementSearcher = inspectAll(context.Background(), dockerCli, opts.size, opts.inspectType)
	default:
		return errors.Errorf("%q is not a valid value for --type", opts.inspectType)
	}
	return inspect.Inspect(dockerCli.Out(), opts.ids, opts.format, elementSearcher)
}

// ...

func inspectContainers(ctx context.Context, dockerCli command.Cli, getSize bool) inspect.GetRefFunc {
	return func(ref string) (interface{}, []byte, error) {
		return dockerCli.Client().ContainerInspectWithRaw(ctx, ref, getSize)
	}
}
```

```golang
// ContainerInspectWithRaw returns the container information and its raw representation.
func (cli *Client) ContainerInspectWithRaw(ctx context.Context, containerID string, getSize bool) (types.ContainerJSON, []byte, error) {
	if containerID == "" {
		return types.ContainerJSON{}, nil, objectNotFoundError{object: "container", id: containerID}
	}
	query := url.Values{}
	if getSize {
		query.Set("size", "1")
	}
	serverResp, err := cli.get(ctx, "/containers/"+containerID+"/json", query, nil)
	if err != nil {
		return types.ContainerJSON{}, nil, wrapResponseError(err, serverResp, "container", containerID)
	}
	defer ensureReaderClosed(serverResp)

	body, err := ioutil.ReadAll(serverResp.body)
	if err != nil {
		return types.ContainerJSON{}, nil, err
	}

	var response types.ContainerJSON
	rdr := bytes.NewReader(body)
	err = json.NewDecoder(rdr).Decode(&response)
	return response, body, err
}
```

它在 Linux 的路径是：`/var/lib/docker/containers/containerID/config.v2.json`。

更多实战模板，可以看参考资料3。

```sh
docker inspect --format '{{$e := . }}{{with .NetworkSettings}} {{$e.Name}} 
{{range $index, $net := .Networks}}{{$index}} {{.IPAddress}}
{{end}}{{end}}' $(docker ps -q)
```

## 参考资料

1. [Docker inspect 命令](http://www.runoob.com/docker/docker-inspect-command.html)
2. [golang text/template](https://golang.org/pkg/text/template/)
3. [奇妙的 Docker Inspect 模版](https://886.iteye.com/blog/2322473)
4. [Start containers automatically](https://docs.docker.com/config/containers/start-containers-automatically/)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
