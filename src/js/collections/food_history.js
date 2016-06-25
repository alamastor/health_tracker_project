'use strict';
require('backbonefire');
var util = require('../util.js');
var Food = require('../models/Food.js');
var FoodHistory = Backbone.Firebase.Collection.extend({
    url: 'https://udacity-heath-tracker.firebaseio.com/food_history',

    model: function(attrs, options) {
        if (attrs.date.constructor.name == 'Date') {
            return new Food(attrs, options);
        } else {
            attrs.date = new Date(attrs.date);
            return new Food(attrs, options);
        }
    },

    comparator: 'date',

    getWeeklyAve: function() {
        var now = new Date();
        return this.chain()
            .filter(function(food) {
                return util.isThisWeek(food.get('date'));
            })
            .reduce(function(memo, food) {
                return memo + food.get('calories');
            }, 0) / (now.getDay() + 1);
    },

    getMonthlyAve: function() {
        var now = new Date();
        return this.chain()
            .filter(function(food) {
                return (food.get('date').getMonth() == now.getMonth());
            })
            .reduce(function(memo, food) {
                return memo + food.get('calories');
            }, 0) / now.getDate();
    },
});
var foodHistory = new FoodHistory();
module.exports = foodHistory;
