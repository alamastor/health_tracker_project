'use strict';
var DayView = Backbone.View.extend({
    tagName: 'div',

    template: _.template(
        '<section class="day">' +
            '<header class="day__header">' +
                '<%= date %>' +
            '</header>' +
            '<ul>' +
                '<% foods.forEach(function(food) { %>' +
                    '<li><%= food %></li>' +
                '<% }) %>' +
            '</ul>' +
        '</section>'
    ),

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },
});
module.exports = DayView;
