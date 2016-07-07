'use strict';
var searchResultTemplate = require('../../templates/search_result.html');
var searchResults = require('../collections/search_results.js');
var authContoller = require('../auth.js');
var SearchResultView = Backbone.View.extend({
    tagName: 'li',

    events: {
        'click': 'select',
    },

    template: searchResultTemplate,

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    select: function() {
        var new_food = this.model.attributes;
        authContoller.foodHistory.add([
            new_food,
        ]);
        searchResults.reset();
    },
});

module.exports = SearchResultView;
