'use strict';
var authContoller = require('../auth.js');
var Day = require('../models/day.js');
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
        this.listenTo(authContoller.foodHistory, 'sync', this.addExistingDays);
    },

    dateMap: {},

    addExistingDays: function() {
        this.reset();
        var self = this;
        var today = new Date();
        var defaultFirstDay = new Date();
        defaultFirstDay.setMonth(today.getMonth() - 1);
        defaultFirstDay.setHours(0,0,0,0);
        var firstDay;
        if (authContoller.foodHistory.length === 0) {
            firstDay = defaultFirstDay;
        } else {
            firstDay = authContoller.foodHistory.chain()
                .min(function(food) {
                    return food.get('date');
                })
                .value()
                .get('date');
        }
        var day = _.min([firstDay, defaultFirstDay]);
        var days = [];
        while (day.setHours(0,0,0,0) <= today.setHours(0,0,0,0)) {
            var dayModel = new Day({'date': day});
            days.push(dayModel);
            this.dateMap[new Date(day.setHours(0,0,0,0)).toString()] = dayModel;
            day = new Date(day.setDate(day.getDate() + 1));
        }
        this.add(days);

        authContoller.foodHistory.forEach(function(food) {
            var day = self.dateMap[food.get('date').toString()];
            day.foods.add(food);
        });

        this.trigger('days_loaded');
        this.listenTo(authContoller.foodHistory, 'add', this.addFood);
    },

    addFood: function(food) {
        var dateStr = food.get('date').toString();
        if (this.dateMap.hasOwnProperty(dateStr)) {
            var day = this.dateMap[dateStr];
            day.foods.add(food);
        } else {
            // Rare case where day does not alreay exists, rerender view
            this.addExistingDays();
        }
    },

    updateLister: function() {
        this.stopListening();

        this.listenTo(authContoller.foodHistory, 'sync', this.addExistingDays);
        this.listenTo(authContoller, 'auth_state_changed', this.updateLister);
    },
});
module.exports = Days;
