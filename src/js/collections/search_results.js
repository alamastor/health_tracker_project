var SearchResult = require('../models/search_result.js');
var SearchResults = Backbone.Collection.extend({
    model: SearchResult,
});
var searchResults = new SearchResults();
module.exports = searchResults;
