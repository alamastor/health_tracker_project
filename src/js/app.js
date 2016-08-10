/**
 * Main app module, just runs the app view.
 */
'use strict';
var AppView = require('./views/app.js');

$(function() {
    new AppView();
});
