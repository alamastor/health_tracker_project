'use strict';
var Day = require('../models/day.js');
var foodHistory = require('./food_history.js');
var Days = Backbone.Collection.extend({
    sync: function() {},

    model: Day,

    comparator: function(first, second) {
        if (first.get('date') < second.get('date')) {
            return 1;
        }
        if (first.get('date') == second.get('date')) {
            return 0;
        }
        return -1;
    },

    initialize: function() {
        this.listenTo(foodHistory, 'sync', _.once(this.addExistingDays));
    },

    dateMap: {},

    addExistingDays: function() {
        var self = this;
        var firstDay = foodHistory.chain()
            .min(function(food) {
                return food.get('date');
            })
            .value()
            .get('date');
        var day = firstDay;
        var today = new Date().setHours(0,0,0,0);
        var days = [];
        while (day.setHours(0,0,0,0) <= today) {
            var dayModel = new Day({'date': day});
            days.push(dayModel);
            this.dateMap[new Date(day.setHours(0,0,0,0)).toString()] = dayModel;
            day = new Date(day.setDate(day.getDate() + 1));
        }
        this.add(days);

        foodHistory.forEach(function(food) {
            var day = self.dateMap[new Date(food.get('date').setHours(0,0,0,0)).toString()];
            day.foods.add(food);
        });

        this.trigger('days_loaded');
    },
});
module.exports = Days;
