/**
 * A Backbone view to display search results from Nutitionix API search.
 */
'use strict';
var searchResults = require('../collections/search_results.js');
var SearchResultView = require('./search_result.js');
var SearchResultsView = Backbone.View.extend({
    el: '#search-results',

    events: {
        'click #search-results__cancel': 'cancelSearch'
    },

    initialize: function() {
        this.collection = searchResults;

        this.listenTo(this.collection, 'add', this.addSearchResult);
        this.listenTo(this.collection, 'reset', this.hideView);

        this.$resultsList = this.$('#search-results__list');
        this.$header = $('#search-header');
        this.$apiLink = $('#api-link');
    },

    /**
     * Add a search result from the collection to the view.
     */
    addSearchResult: function(result) {
        var view = new SearchResultView({
            model: result,
        });
        view.foodHistory = this.foodHistory;
        this.$resultsList.append(view.render().el);

        this.showView();
    },

    /**
     * Make the view visible.
     */
    showView: function() {
        this.$el.removeClass('hidden');
        var self = this;

        // Prevent click handling on these elements, as the body click handler
        // should not be called for clicks on these elements.
        this.$header.click(function() {
            return false;
        });
        this.$apiLink.click(function(e) {
            e.stopPropagation();
        });
        this.trigger('open');
    },

    /**
     * Clear search results.
     */
    cancelSearch: function() {
        this.collection.reset();
    },

    /**
     * Make the view invisble.
     */
    hideView: function() {
        this.$resultsList.scrollTop(0);
        this.$el.addClass('hidden');
        this.$resultsList.empty();
        this.$header.unbind('click');
    },
});

module.exports = SearchResultsView;
