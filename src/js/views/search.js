'use strict';
var searchResults = require('../collections/search_results.js');
var tokens = require('../tokens.js');
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
        console.log('executing search');
        $.ajax('https://api.nutritionix.com/v1_1/search/' + searchText, {
                data: {
                    results: '0:20',
                    cal_min: '0',
                    cal_max: '50000',
                    fields: '*',
                    appId: tokens.nutritionix.id,
                    appKey: tokens.nutritionix.key,
                }
        }).done(function(data, textStatus, jqXHR) {
            console.log('search done');
            console.log(data);
            console.log(textStatus);
            console.log(jqXHR);
            data.hits.forEach(function(result) {
                searchResults.create({
                    name: result.fields.item_name,
                    brand: result.fields.brand_name,
                    calories: result.fields.nf_calories,
                });
            });
        }).fail(function(textStatus, jqXHR, errorThrown) {
            console.log('search fail');
            console.log(textStatus);
            console.log(jqXHR);
            console.log(errorThrown);
        });
    },
});
module.exports = SearchView;
