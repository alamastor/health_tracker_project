'use strict';
var DayView = Backbone.View.extend({
    tagName: 'div',

    initialize: function() {
        this.listenTo(this.model.foods, 'all', this.render);
    },

    template: _.template(
        '<section class="day">' +
            '<header class="day__header">' +
                '<%= date %>' +
            '</header>' +
            '<ul>' +
                '<% foods.forEach(function(food) { %>' +
                    '<li><% print(food.get("name")) %></li>' +
                '<% }) %>' +
            '</ul>' +
        '</section>'
    ),

    render: function() {
        var self = this;
        this.$el.html(this.template({
            date: self.model.get('date'),
            foods: self.model.foods,
        }));
        return this;
    },
});
module.exports = DayView;
