'use strict';
var HistoryView = require('./views/food_history.js');
var StatsView = require('./views/stats.js');
var SearchView = require('./views/search.js');
var SearchResultsView = require('./views/search_results.js');
var AuthView = require('./views/auth.js');
var FoodHistory = require('./collections/food_history');
var tokens = require('./tokens.js');

var foodHistory = new FoodHistory(null, {
    url: tokens.firebase.databaseURL + '/example/food_history'
});
var historyView = new HistoryView({foodHistory: foodHistory});
new StatsView();
new SearchView();
var searchResultsView = new SearchResultsView();
searchResultsView.foodHistory = foodHistory;
var firebase = require('firebase/app');
require('firebase/auth');
var app = firebase.initializeApp(tokens.firebase);
new AuthView({firebase: firebase});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
    } else {
        console.log('no user');
    }
});
