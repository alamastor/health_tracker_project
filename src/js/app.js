'use strict';
var HistoryView = require('./views/food_history.js');
var StatsView = require('./views/stats.js');
var SearchView = require('./views/search.js');
var SearchResultsView = require('./views/search_results.js');
new HistoryView();
new StatsView();
new SearchView();
new SearchResultsView();

var firebase = require('firebase')
