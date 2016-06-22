'use strict';
var searchResults = require('../collections/search_results.js');
var SearchResultView = require('./search_result.js');
var SearchResultsView = Backbone.View.extend({
    el: '#search-results',

    events: {
        'click #search-results__cancel': 'cancelSearch'
    },

    initialize: function() {
        this.listenTo(searchResults, 'add', this.addSearchResult);
        this.listenTo(searchResults, 'reset', this.resetSearchResults);

        this.$searchResultsList = this.$('#search-results__list');
    },

    addSearchResult: function(result) {
        console.log('add search res');
        var view = new SearchResultView({model: result});
        this.$searchResultsList.append(view.render().el);
        this.$el.removeClass('hidden');
    },

    cancelSearch: function() {
        searchResults.reset();
    },

    resetSearchResults: function() {
        this.$el.addClass('hidden');
    },
});
module.exports = SearchResultsView;
