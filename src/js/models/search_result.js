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

    sync: function() {},
});

module.exports = SearchResult;
