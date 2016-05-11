define(['backbone', '../models/search_result'], function(Backbone, searchResult) {
    var searchResults = Backbone.Collection.extend({
        model: searchResult,
    });
    return new searchResults();
});
