/**
 * Singleton Backbone collection for food search results, cleared when search is
 * done.
 */
'use strict';
var SearchResult = require('../models/search_result.js');
var SearchResults = Backbone.Collection.extend({
    model: SearchResult,

    // Collection doesn't need to be sync, local only.
    sync: function() {},
});

var searchResults = new SearchResults();
module.exports = searchResults;
