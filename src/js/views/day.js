'use strict';
var dayTemplate = require('../../templates/day.html');
var DayView = Backbone.View.extend({
    tagName: 'div',

    events: {
        'mouseenter li': 'hover',
        'click .food__delete': 'delete',
    },

    initialize: function() {
        this.listenTo(this.model.foods, 'all', this.render);
    },

    template: dayTemplate,

    render: function() {
        var self = this;
        this.$el.html(this.template({
            date: self.model.get('date'),
            foods: self.model.foods,
        }));
        return this;
    },

    hover: function(e) {
        console.log(e);
    },

    delete: function(e) {
        var foodName = e.target.parentElement.querySelector('.food__name').textContent;
        this.model.foods.forEach(function(food) {
            if (food.get('name') == foodName) {
                food.destroy();
            }
        });
    },
});
module.exports = DayView;
