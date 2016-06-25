'use strict';
var dayTemplate = require('../../templates/day.html');
var DayView = Backbone.View.extend({
    tagName: 'section',
    className: 'day',

    events: {
        'mouseenter li': 'mouseenter',
        'mouseleave li': 'mouseleave',
        'click .food__delete': 'delete',
    },

    initialize: function() {
        this.listenTo(this.model.foods, 'all', this.render);
    },

    template: dayTemplate,

    render: function() {
        var self = this;
        var dateStr;
        var today = new Date();
        today.setHours(0,0,0,0);
        var yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        yesterday.setHours(0,0,0,0);
        if (this.model.get('date').valueOf() == today.valueOf()) {
            dateStr = 'Today';
        } else if (this.model.get('date').valueOf() == yesterday.valueOf()) {
            dateStr = 'Yesterday';
        } else {
            var dateSplit = this.model.get('date').toDateString().split(' ');
            dateStr = dateSplit[0] + ', ' + dateSplit[1] + ' ' + dateSplit[2];
        }
        this.$el.html(this.template({
            date: dateStr,
            dayCalories: this.model.foods.getTotalCalories(),
            foods: self.model.foods,
        }));
        return this;
    },

    mouseenter: function(e) {
        e.target.parentElement.querySelector('.food__delete--icon').classList.remove('hidden');
    },

    mouseleave: function(e) {
        e.target.parentElement.querySelector('.food__delete--icon').classList.add('hidden');
    },

    delete: function(e) {
        var foodName = e.target.parentElement.parentElement.querySelector('.food__name').textContent;
        // Use for instead of forEach because breaking is required
        for (var i = 0; i < this.model.foods.length; i++) {
            if (this.model.foods.models[i].get('name') == foodName) {
                this.model.foods.models[i].destroy();
                break;
            }
        }
    },
});
module.exports = DayView;
