/**
 * Backbone model representing a food eaten by the user.
 */
'use strict';
var Food = Backbone.Model.extend({
    defaults: {
        name: '',
        brand: '',
        calories: '',
        date: '',
    },

    /**
     * Override get method to remove times from days as only the day is relevant.
     */
    get: function(attr) {
        var val = Backbone.Model.prototype.get.call(this, attr);
        if (attr == 'date') {
            var day = new Date(val);
            day.setHours(0,0,0,0);
            return day;
        } else {
            return val;
        }
    },

    /**
     * Override toJSON method which is called before model is sent to database,
     * to convert JS Date object to string.
     */
    toJSON: function() {
        var obj = Backbone.Model.prototype.toJSON.call(this);
        obj.date = obj.date.toJSON();
        return obj;
    },
});
module.exports = Food;
