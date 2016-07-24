/**
 * Main collection for the app, containing all the foods for the user and linked
 * to the Firebase backend. Extends of the backbonefire's collection class.
 */
'use strict';
require('backbonefire');
var util = require('../util.js');
var Food = require('../models/food.js');
var tokens = require('../tokens.js');
var firebase = require('firebase/app');
var database = require('firebase/database');

var FoodHistory = Backbone.Firebase.Collection.extend({
    /**
     * Overridden constructor method, firebase.database.ref should be passed as
     * url property in options. This is require to connect to Firebase backend.
     */
    constructor: function(models, options) {
        this.url = options.url;
        Backbone.Firebase.Collection.prototype.constructor.call(this);
    },

    /**
     * Overriden model methodr. Dates are stored as text on server and in this
     * collection, this means when access with `get` etc dates will be as JS
     * Date type.
     */
    model: function(attrs, options) {
        if (attrs.date.constructor.name == 'Date') {
            return new Food(attrs, options);
        } else {
            attrs.date = new Date(attrs.date);
            return new Food(attrs, options);
        }
    },

    // Order by date.
    comparator: 'date',

    /**
     * Calculute the mean daily calories for current week.
     */
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

    /**
     * Calculute the mean daily calories for current month.
     */
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
