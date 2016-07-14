'use strict';
require('../css/style.scss');
var HistoryView = require('./views/food_history.js');
var StatsView = require('./views/stats.js');
var SearchView = require('./views/search.js');
var SearchResultsView = require('./views/search_results.js');
var AuthView = require('./views/auth.js');
var authContoller = require('./auth.js');

new HistoryView();
new StatsView();
new SearchView();
new SearchResultsView();
new AuthView();
Backbone.listenTo(authContoller, 'auth_state_changed', function() {
    new HistoryView();
});

