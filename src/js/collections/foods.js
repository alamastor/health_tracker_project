'use strict';
var Foods = Backbone.Collection.extend({
    sync: function() {},

    initialize: function() {
        this.on('add', function() {
            console.log('added');
            console.log(this);
        });
    },

    getTotalCalories: function() {
        return this.reduce(function(memo, food) {
            return memo + food.get('calories');
        }, 0);
    },
});
module.exports = Foods;
