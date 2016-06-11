'use strict';
var SearchResult = Backbone.Model.extend({
    defaults: {
        name: '',
        brand: '',
        calories: '',
    },

    sync: function(method, collection) {
        // Overridden to prevent default writing to database.
    },
});

module.exports = SearchResult;
