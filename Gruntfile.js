module.exports = function(grunt) {
    'use strict';
    var webpack = require('webpack');
    grunt.initConfig({
        clean: {
            build: ['dist/*', '!dist/bower_components'],
        },
        copy: {
            files: {
                expand: true,
                cwd: 'src',
                src: ['*', 'css/*'],
                dest: 'dist',
            },
        },
        webpack: {
            options: {
                entry: './src/js/app.js',
                debug: true,
                devtool: 'source-map',
                output: {
                    path: 'dist/js',
                    filename: 'bundle.js',
                },
                resolve: {
                    alias: {
                        jquery: __dirname + '/bower_components/jquery/dist/jquery.js',
                        underscore: __dirname + '/bower_components/underscore/underscore.js',
                        backbone: __dirname + '/bower_components/backbone/backbone.js',
                        firebase: __dirname + '/bower_components/firebase/firebase.js',
                        backbonefire: __dirname + '/bower_components/backbonefire/dist/backbonefire.js',
                    }
                },
                plugins: [
                    new webpack.ProvidePlugin({
                        $: 'jquery',
                        _: 'underscore',
                        Backbone: 'backbone',
                    })
                ],
                module: {
                    loaders: [
                        {test: /underscore\.js$/, loader: 'expose?_'},
                        {test: /backbonefire\.js/, loader: 'imports?firebase'},
                        {test: /\.html$/, loader: 'underscore-template-loader'},
                    ]
                },
            },
            build: {
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('default', ['clean', 'copy', 'webpack:build']);
}
