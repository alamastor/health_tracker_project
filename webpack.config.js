'use strict';
var webpack = require('webpack');
var bowerPath = function(path) {
    return __dirname + '/bower_components/' + path;
};
module.exports = {
    entry: './src/js/app.js',
    output: {
        path: 'dist/js',
        filename: 'bundle.js',
        publicPath: 'dist'
    },
    resolve: {
        alias: {
            jquery: bowerPath('jquery/dist/jquery.js'),
            underscore: bowerPath('underscore/underscore.js'),
            backbone: bowerPath('backbone/backbone.js'),
            backbonefire: bowerPath('backbonefire/dist/backbonefire.js'),
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
            {test: /\.html$/, loader: 'underscore-template-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.scss$/, loaders: ['style', 'css', 'sass']}
        ]
    }
};
