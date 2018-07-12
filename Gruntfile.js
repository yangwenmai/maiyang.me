module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            includes: {
                src: '_includes/head.raw.html',
                dest: '_includes/head.html'
            }
        },
        less: {
            options: {
                paths: ['<%= pkg.srcRoot %>/css']
            },
            "<%= pkg.srcRoot %>/css/main.css": "<%= pkg.srcRoot %>/css/main.less",
            "<%= pkg.srcRoot %>/css/posts.css": "<%= pkg.srcRoot %>/css/posts.less",
            "<%= pkg.srcRoot %>/css/pages.css": "<%= pkg.srcRoot %>/css/pages.less",
        },
        useminPrepare: {
            html: '_includes/head.html',
            options: {
                root: '.',
                dest: '.tmp'
            }
        },
        filerev: {
            files: {
                src: ['<%= pkg.srcRoot %>/js/**/*.js', '.tmp/<%= pkg.dstRoot %>/style.css'],
                dest: '<%= pkg.dstRoot %>'
            }
        },
        usemin: {
            html: '_includes/head.html',
            options: {
                assetsDirs: ['.tmp']
            }
        },
        concat: {
            react_debug: {
                src: ['articles.raw/articles.md', 'articles.raw/debug.html'],
                dest: 'pages/1_articles.md'
            },
            react_release: {
                src: ['articles.raw/articles.md', 'articles.raw/release.html'],
                dest: 'pages/1_articles.md'
            }
        },
        shell: {
            jekyll_build: {
                command: 'bundle exec jekyll build'
            },
            jekyll_serve: {
                command: 'bundle exec jekyll serve --incremental'
            },
            clean_tmp: {
                command: 'rm -r .tmp'
            },
            react_parse: {
                command: './node_modules/react-tools/bin/jsx pages/ build/'
            },
            deploy: {
                command: [
                    'git checkout gh-pages',
                    'cd _site',
                    'cp -r * ..',
                    'cd ..',
                    'git add .',
                    'git commit -m "rebuild"',
                    'git push origin gh-pages',
                    'git checkout master'
                ].join('&&')
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-filerev');

    grunt.task.registerTask('debug_test', 'A sample task that logs stuff.', function(arg1, arg2) {
        //console.log(grunt.config('cssmin.generated'));
        console.log(grunt.filerev.summary);
    });

    grunt.registerTask('build', [
        'less',
        'copy:includes',
        'concat:react_debug',
        'shell:jekyll_build'
    ]);

    grunt.registerTask('debug', [
        'less',        
        'copy:includes',
        'concat:react_debug',
        'shell:jekyll_serve'
    ]);

    grunt.registerTask('release', [
        'less',    
        'copy:includes',
        'concat:react_release',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'filerev',
        'usemin',
        'shell:clean_tmp',
        'shell:react_parse',
        'shell:jekyll_build'
    ]);

    grunt.registerTask('serve', [
        'less',
        'copy:includes',
        'concat:react_release',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'filerev',
        'usemin',
        'shell:clean_tmp',
        'shell:react_parse',
        'shell:jekyll_serve'
    ]);

    grunt.registerTask('_deploy', ['shell:deploy']);

    grunt.task.registerTask('deploy', 'Deploy to gh-pages', function() {
        grunt.task.run(['release', '_deploy']);
    })
};