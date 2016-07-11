'use strict';
require('../css/style.css');
var HistoryView = require('./views/food_history.js');
var StatsView = require('./views/stats.js');
var SearchView = require('./views/search.js');
var SearchResultsView = require('./views/search_results.js');
var AuthView = require('./views/auth.js');

new HistoryView();
new StatsView();
new SearchView();
new SearchResultsView();
new AuthView();
