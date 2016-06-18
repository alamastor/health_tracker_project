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
        self.model.foods.forEach(function(food) {
            console.log(food.get('name'));
        });
        return this;
    },
});
module.exports = DayView;
