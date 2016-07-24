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

        this.$searchResultsList = this.$('#search-results__list');

    },

    /**
     * Add a search result from the collection to the view.
     */
    addSearchResult: function(result) {
        console.log('add search res');
        var view = new SearchResultView({
            model: result,
        });
        view.foodHistory = this.foodHistory;
        this.$searchResultsList.append(view.render().el);

        this.showView();
    },

    /**
     * Make the view visible.
     */
    showView: function() {
        this.$el.removeClass('hidden');
        $('.container').addClass('fade');
        var self = this;

        // Add click handler to cancel search on click which aren't on one of the
        // buttons in this view.
        $('body').click(function() {
            self.cancelSearch();
            return false;
        });
        // Prevent click handling on these elements, as the body click handler
        // should not be called for clicks on these elements.
        $('#search-header').click(function() {
            return false;
        });
        $('#api-link').click(function(e) {
            e.stopPropagation();
        });
    },

    /**
     * Clear search results.
     */
    cancelSearch: function() {
        this.collection.reset();
        $('body').unbind('click');
    },

    /**
     * Make the view invisble.
     */
    hideView: function() {
        this.$searchResultsList.scrollTop(0);
        this.$el.addClass('hidden');
        this.$searchResultsList.empty();
        $('.container').removeClass('fade');
    },
});

module.exports = SearchResultsView;
