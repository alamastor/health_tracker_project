/**
 * Backbone view of the main search box. Results will be add to searchResults
 * collection.
 */
'use strict';
var searchResults = require('../collections/search_results.js');
var tokens = require('../tokens.js');
var searchController = require('../search.js');
var errorModel = require('../models/error.js');
var SearchView = Backbone.View.extend({
    el: '#search',

    events: {
        'submit #search-form': 'searchSubmit',
    },

    initialize: function() {
        this.$searchInput = this.$('#search-input');
        this.$loader = this.$('#loader');
        this.$errorText = this.$('#error-text');
    },

    /**
     * Submit food search and add results to searchResults collection.
     */
    searchSubmit: function(event) {
        var self = this;
        // Prevent form causing page refresh after submit.
        event.preventDefault();

        var today = new Date();
        today.setHours(0,0,0,0);

        // Clear error text.
        errorModel.set({text: ''});

        // Do search.
        searchController.search(this.$searchInput.val()).then(function(results) {
            results.forEach(function(result) {
                searchResults.create({
                    name: result.fields.item_name,
                    brand: result.fields.brand_name,
                    calories: result.fields.nf_calories,
                    date: today,
                });
            });
            self.searchDone();
        }).catch(function(error) {
            switch (error) {
                case 'no_results':
                    errorModel.set({text: 'No matching foods found'});
                    break;
                default:
                    // TODO: Handle other errors.
                    console.log(error);
            }
            self.searchDone();
        });

        // Show loading icon.
        this.$loader.removeClass('hidden');
    },

    /**
     * Clear search text and hide loading icon.
     */
    searchDone: function() {
        this.$searchInput.val('');
        this.$searchInput.blur();
        this.$loader.addClass('hidden');
    },
});
module.exports = SearchView;
