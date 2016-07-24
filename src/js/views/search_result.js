/**
 * A Backbone view to display an individual result from a search to Nutritionix.
 */
'use strict';
var searchResultTemplate = require('../../templates/search_result.html');
var searchResults = require('../collections/search_results.js');
var authContoller = require('../auth.js');
var SearchResultView = Backbone.View.extend({
    tagName: 'li',
    className: 'search-result',

    events: {
        'click': 'select',
    },

    template: searchResultTemplate,

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    /**
     * Select this food and add it to the list of food history.
     */
    select: function() {
        var new_food = this.model.attributes;
        authContoller.foodHistory.add([
            new_food,
        ]);
        // Clear the rest of food results.
        searchResults.reset();
    },
});

module.exports = SearchResultView;
