'use strict';
var searchResults = require('../collections/search_results.js');
var SearchResultView = require('./search_result.js');
var SearchResultsView = Backbone.View.extend({
    el: '#search-results',

    initialize: function() {
        this.listenTo(searchResults, 'add', this.addSearchResult);
    },

    addSearchResult: function(result) {
        console.log('add search res');
        var view = new SearchResultView({model: result});
        this.$el.append(view.render().el);
    },
});
module.exports = SearchResultsView;
