/**
 * Days Backbone collection. This the main collection that appears in the app, and will
 * be populated after the foodHistory collection is fetched from the server.
 */
'use strict';
var authContoller = require('../auth.js');
var Day = require('../models/day.js');
var Days = Backbone.Collection.extend({
    sync: function() {},

    model: Day,

    // Sort collection by date, newest to oldest.
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
        this.listenToOnce(authContoller.foodHistory, 'sync', this.addExistingDays);
    },

    // Maintain a mapping of dates to models, so can call `get` with a date argument
    // and corresponding model.
    dateMap: {},

    // Add all days in foodHistory to collection
    addExistingDays: function() {
        this.reset();
        var self = this;

        var today = new Date();
        today.setHours(0,0,0,0);

        // If first day in collection is less than one month ago, then just use one
        // month ago as the first day.
        var firstDay;
        if (_.isEmpty(authContoller.foodHistory)) {
            var defaultFirstDay = new Date();
            defaultFirstDay.setMonth(today.getMonth() - 1);
            firstDay = defaultFirstDay;
        } else {
            firstDay = authContoller.foodHistory.chain()
                .min(function(food) {
                    return food.get('date');
                }).value().get('date');
        }

        // Add days from first day to now to collection
        var day = firstDay();
        while (day <= today) {
            this.addDay(day);
            // Increment day
            day = new Date(day.setDate(day.getDate() + 1));
        }

        // Add all foods in foodHistory to their day.
        authContoller.foodHistory.forEach(function(food) {
            var day = self.dateMap[food.get('date').toString()];
            day.foods.add(food);
        });

        // Trigger main load event.
        this.trigger('days_loaded');

        this.listenTo(authContoller.foodHistory, 'add', this.addFood);
    },

    // Create a new day model and add it to collection
    addDay: function(date) {
        var dayModel = new Day({'date': date});
        this.add(dayModel);
        this.dateMap[date.toString()] = dayModel;
        return dayModel;
    },

    // Called when food added to foodHistory, adding food to corresponding day.
    addFood: function(food) {
        var date = food.get('date');
        var day;
        if (this.dateMap.hasOwnProperty(date.toString())) {
            day = this.dateMap[date.toString()];
        } else {
            // Rare case where day does not alreay exists, this should only happen
            // when day changes while using app.
            day = this.addDay(date);
        }
        day.foods.add(food);
    },
});
module.exports = Days;
