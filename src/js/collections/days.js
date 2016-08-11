/**
 * Singleton days Backbone collection. This the main collection that appears in the app, and will
 * be populated after the foodHistory collection is fetched from the server.
 */
'use strict';
var authController = require('../controllers/auth.js');
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
        this.stopListening();
        this.reset();

        // Add 1 month as a minimum setup
        var today = new Date();
        today.setHours(0,0,0,0);
        var monthAgo = new Date();
        monthAgo.setMonth(today.getMonth() - 1);
        var day = monthAgo;
        while (day <= today) {
            this.addDay(day);
            // Increment day
            day = new Date(day.setDate(day.getDate() + 1));
        }

        this.listenTo(authController, 'auth_state_changed', this.initialize);
        this.listenTo(authController.foodHistory, 'add', this.addFood);
        var self = this;
        authController.foodHistory.forEach(function(food) {
            self.addFood(food);
        });
    },

    // Maintain a mapping of dates to models, so can call `get` with a date argument
    // and corresponding model.
    dateMap: {},

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
        var today = new Date();
        // Don't add days in future, so they can be preloaded in db for demo.
        if (food.get('date') <= today) {
            if (this.dateMap.hasOwnProperty(date.toString())) {
                day = this.dateMap[date.toString()];
            } else {
                // Rare case where day does not alreay exists, this should only happen
                // when day changes while using app.
                day = this.addDay(date);
            }
                day.foods.add(food);
            // Need to trigger manually here so listeners are notified food has changed.
            this.trigger('update');
        }
    },
});

var days = new Days();
module.exports = days;
