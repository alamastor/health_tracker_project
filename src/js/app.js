/**
 * Main app module. Pull in all required components, and set up listener for auth
 * state change.
 */
'use strict';
require('../css/style.scss');
var HistoryView = require('./views/food_history.js');
var StatsView = require('./views/stats.js');
var SearchView = require('./views/search.js');
var SearchResultsView = require('./views/search_results.js');
var AuthView = require('./views/auth.js');
var ErrorView = require('./views/error.js');
var authContoller = require('./auth.js');

$(function() {
    var historyView = new HistoryView();
    new StatsView();
    new SearchView();
    new SearchResultsView();
    new AuthView();
    new ErrorView();

    // When auth state changes replace the HistoryView with an new one which will have
    // the new users' data.
    Backbone.listenTo(authContoller, 'auth_state_changed', function() {
        // Call stop listening to allow garbage collection of view, can't call remove
        // because it will also remove the view.
        historyView.stopListening();
        historyView = new HistoryView();
    });
});
