var app = app || {};
var SearchResults = Backbone.Collection.extend({
    model: app.SearchResult,
});
app.searchResults = new SearchResults();
