module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            build: {
                files: {
                    './build/styles/main.css': './source/styles/*.less'
                }
            }
        },
        uglify: {
            target: {
                files: {
                    './build/scripts/main.min.js': './source/scripts/main.js'
                }
            }
        },
        watch: {
            less: {
                files: ['./source/styles/*.less'],
                tasks: ['less:build']
            },
            uglify: {
                files: ['./source/scripts/*.js'],
                tasks: ['uglify']
            },
            html: {
                files: ['./source/*.html'],
                tasks: ['replace:build']
            }
        },
        replace: {
            build: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['source/index.html'],
                        dest: 'build/'
                    }
                ]
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:build', 'uglify','replace:build']);
    grunt.registerTask('compilaLess', ['less:build']);
    grunt.registerTask('comprimeJS', ['uglify']);
}


