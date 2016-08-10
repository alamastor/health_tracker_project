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
        // Using grunt pleeease as can't get webpack version to work
        pleeease: {
            custom: {
                files: {'src/css/built_style.css': 'src/css/style.scss'},
                options: {
                    sass: true
                }
            }
        },
        webpack: {
            options: webpackConfig,
            build: {
                plugins: [
                    new webpack.optimize.UglifyJsPlugin(),
                    new webpack.optimize.DedupePlugin()
                ]
            },
            'build-dev': {
                devtool: 'sourcemap',
                debug: true,
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
    grunt.loadNpmTasks('grunt-pleeease');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('default', ['clean', 'copy', 'pleeease', 'webpack-dev-server:start']);

    grunt.registerTask('build', ['clean', 'copy', 'pleeease', 'webpack:build']);
};
