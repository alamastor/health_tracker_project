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
        this.$loader = this.$('#loader');
    },

    searchSubmit: function(event) {
        // Stop refresh after submit
        event.preventDefault();
        var today = new Date();
        today.setHours(0,0,0,0);
        search.search(this.$searchInput.val(), today, this.searchDone.bind(this));
        this.$searchInput.val('');
        this.$loader.removeClass('hidden');
    },

    searchDone: function() {
        this.$loader.addClass('hidden');
    }
});
module.exports = SearchView;
