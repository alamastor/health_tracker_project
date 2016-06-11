var foodHistory = require('../collections/food_history');
var SearchResultView = Backbone.View.extend({
    tagName: 'li',

    events: {
        'click': 'select',
    },

    template:  _.template(
        '<li>' +
            '<p><%= name %></p>' +
            '<p><%= brand %></p>' +
            '<p><%= calories %></p>' +
        '</li>'
    ),

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    select: function() {
        console.log(this.model);
        foodHistory.add([
            this.model.attributes,
        ]);
    }
})

module.exports = SearchResultView;
