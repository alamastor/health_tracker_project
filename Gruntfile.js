module.exports = function(grunt) {
    'use strict';
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config.js');
    grunt.initConfig({
        clean: {
            build: ['dist/*', '!dist/bower_components'],
        },
        copy: {
            files: {
                expand: true,
                cwd: 'src',
                src: ['*', 'images/*'],
                dest: 'dist',
            },
        },
        webpack: {
            options: webpackConfig,
            build: {
            },
            'build-dev': {
                devtool: 'sourcemap',
                debug: true
            }
        },
        'webpack-dev-server': {
            options: {
                webpack: webpackConfig,
                publicPath: '/' + webpackConfig.output.path
            },
            start: {
                keepAlive: true,
                webpack: {
                    devtool: 'sourcemap',
                    debug: true
                }
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('default', ['clean', 'copy', 'webpack-dev-server:start']);

    grunt.registerTask('build', ['webpack:build']);
};
