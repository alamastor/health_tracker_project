'use strict';
require('backbonefire');
var util = require('../util.js');
var Food = require('../models/Food.js');
var tokens = require('../tokens.js');
var firebase = require('firebase/app');
var database = require('firebase/database');

var FoodHistory = Backbone.Firebase.Collection.extend({
    constructor: function(models, options) {
        this.url = options.url;
        Backbone.Firebase.Collection.prototype.constructor.call(this);
    },

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

module.exports = FoodHistory;
