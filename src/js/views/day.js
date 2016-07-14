'use strict';
var dayTemplate = require('../../templates/day.html');
var search = require('../search.js');
var DayView = Backbone.View.extend({
    tagName: 'section',
    className: 'day',

    events: {
        'submit .day__header--add': 'addFood',
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
        this.$searchInput = this.$('#day-food-search');

        return this;
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

    addFood: function() {
        search.search(this.$searchInput.val(), this.model.get('date'));
        this.$searchInput.val('');
        return false;
    },
});
module.exports = DayView;
