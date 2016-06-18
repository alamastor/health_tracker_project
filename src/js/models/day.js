'use strict';
var Foods = require('../collections/foods.js');
var Day = Backbone.Model.extend({
    constructor: function() {
        // remove hours from day
        for (var arg in arguments) {
            if (arguments.hasOwnProperty(arg)) {
                arguments[arg] = {date: new Date(arguments[arg].date.setHours(0,0,0,0))};
            }
        }
        Backbone.Model.apply(this, arguments);
    },

    initialize: function() {
        this.foods = new Foods()
    },
});
module.exports = Day;
