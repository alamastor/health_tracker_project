'use strict';
var webpack = require('webpack');
module.exports = {
    entry: './src/js/app.js',
    output: {
        path: 'dist/js',
        filename: 'bundle.js',
        publicPath: 'dist'
    },
    resolve: {
        alias: {
            jquery: __dirname + '/bower_components/jquery/dist/jquery.js',
            underscore: __dirname + '/bower_components/underscore/underscore.js',
            backbone: __dirname + '/bower_components/backbone/backbone.js',
            firebase: __dirname + '/bower_components/firebase/firebase.js',
            backbonefire: __dirname + '/bower_components/backbonefire/dist/backbonefire.js'
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
            {test: /\.html$/, loader: 'underscore-template-loader'}
        ]
    },
};
