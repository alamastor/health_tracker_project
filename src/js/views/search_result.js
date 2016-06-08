var app = app || {};
app.SearchResultView = Backbone.View.extend({
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
        app.foodHistory.add([
            this.model.attributes,
        ]);
    }
})
