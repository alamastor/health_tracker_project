/**
 * Backbone model representing individual search result.
 */
'use strict';
var SearchResult = Backbone.Model.extend({
    defaults: {
        name: '',
        brand: '',
        calories: '',
    },
});

module.exports = SearchResult;
