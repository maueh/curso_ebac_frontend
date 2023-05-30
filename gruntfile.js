module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'build/styles/main.css': 'source/styles/main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['./source/styles/main.less'],
                tasks: ['less:development']
            },
            uglify: {
                files: ['./source/scripts/main.js'],
                tasks: ['uglify']
            }
        },
        uglify: {
            target: {
                files: {
                    './build/scripts/main.min.js': './source/scripts/main.js'
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('less', ['less:development']);
    //grunt.registerTask('comprimeJS', ['uglify']);
}


