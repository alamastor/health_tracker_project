define(['backbone', 'jquery'], function(Backbone, $) {
    var searchResultView = Backbone.View.extend({
        tagName: 'li',

        template:  _.template(
            '<li>' +
                '<p><%= name %></p>' +
            '</li>'
        ),

        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
    })
    return searchResultView;
});
