module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            build: ['dist/*', '!dist/bower_components'],
        },
        copy: {
            files: {
                expand: true,
                cwd: 'src',
                src: ['**'],
                dest: 'dist',
            },
        },
        bowerRequirejs: {
            target: {
                rjsConfig: 'dist/js/config.js'
            }
        },
    });
    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean', 'copy', 'bowerRequirejs']);
}
