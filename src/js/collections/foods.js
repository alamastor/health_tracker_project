/**
 * Backbone collection of foods. Created Day models to store all foods eaten
 * that day.
 */
'use strict';
var Foods = Backbone.Collection.extend({
    // Override as this does not need to be synced.
    sync: function() {},

    /*
     * Calculate total calories of all foods in this collection.
     */
    getTotalCalories: function() {
        return this.reduce(function(memo, food) {
            return memo + food.get('calories');
        }, 0);
    },
});
module.exports = Foods;
