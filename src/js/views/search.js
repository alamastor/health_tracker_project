'use strict';
var searchResults = require('../collections/search_results.js');
var tokens = require('../tokens.js');
var search = require('../search.js');
var SearchView = Backbone.View.extend({
    el: '#search',

    events: {
        'submit #search-form': 'searchSubmit',
    },

    initialize: function() {
        this.$searchInput = this.$('#search-input');
    },

    searchSubmit: function(event) {
        // Stop refresh after submit
        event.preventDefault();
        this.search(this.$searchInput.val());
    },

    search: function(searchText) {
        var today = new Date();
        today.setHours(0,0,0,0);
        search.search(this.$searchInput.val(), today);
        this.$searchInput.val('');
    },
});
module.exports = SearchView;
