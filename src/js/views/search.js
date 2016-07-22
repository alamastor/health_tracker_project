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

    searchSubmit: function(event) {
        var self = this;
        // Stop refresh after submit
        event.preventDefault();
        var today = new Date();
        today.setHours(0,0,0,0);
        errorModel.set({text: ''});
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
                    console.log(error);
            }
            self.searchDone();
        });
        this.$loader.removeClass('hidden');
    },

    searchDone: function() {
        this.$searchInput.val('');
        this.$searchInput.blur();
        this.$loader.addClass('hidden');
    },
});
module.exports = SearchView;
