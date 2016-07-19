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
        this.listenTo(this.collection, 'reset', this.resetSearchResults);

        this.$searchResultsList = this.$('#search-results__list');
        $('#search-header').click(function() {
            return false;
        });
        $('#api-link').click(function(e) {
            e.stopPropagation();
        });
    },

    addSearchResult: function(result) {
        console.log('add search res');
        var view = new SearchResultView({
            model: result,
        });
        view.foodHistory = this.foodHistory;
        this.$searchResultsList.append(view.render().el);
        this.$el.removeClass('hidden');
        $('.container').addClass('fade');
        var self = this;
        $('body').click(function() {
            self.cancelSearch();
            return false;
        });
    },

    cancelSearch: function() {
        this.collection.reset();
        $('body').unbind('click');
    },

    resetSearchResults: function() {
        this.$searchResultsList.scrollTop(0);
        this.$el.addClass('hidden');
        this.$searchResultsList.empty();
        $('.container').removeClass('fade');
    },
});
module.exports = SearchResultsView;
