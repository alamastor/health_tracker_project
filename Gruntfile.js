module.exports = function(grunt) {
    grunt.initConfig({
      bowerRequirejs: {
        target: {
          rjsConfig: 'src/js/config.js'
        }
      }
    });
    grunt.loadNpmTasks('grunt-bower-requirejs');

    grunt.registerTask('default', ['bowerRequirejs']);
}
