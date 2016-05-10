module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            src: ['dist'],
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
                rjsConfig: 'src/js/config.js'
            }
        },
    });
    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean', 'copy', 'bowerRequirejs']);
}
