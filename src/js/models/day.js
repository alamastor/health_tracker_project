/**
 * Backbone model representing a day, and containing a foods collection of all food
 * eaten that day.
 */
'use strict';
var Foods = require('../collections/foods.js');
var Day = Backbone.Model.extend({

    /**
     * Override constructor so that dates passed to the contractor will have their
     * time removed, to represent just the day.
     */
    constructor: function() {
        for (var arg in arguments) {
            if (arguments.hasOwnProperty(arg)) {
                arguments[arg] = {date: new Date(arguments[arg].date.setHours(0,0,0,0))};
            }
        }
        Backbone.Model.apply(this, arguments);
    },

    initialize: function() {
        // Associate a collection of foods with the day.
        this.foods = new Foods();
    },

    /**
    * Get total calories of this day's food collection.
    */
    getTotalCalories: function() {
        return this.foods.getTotalCalories();
    },
});

module.exports = Day;
