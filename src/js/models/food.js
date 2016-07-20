'use strict';
var Food = Backbone.Model.extend({
    defaults: {
        name: '',
        brand: '',
        calories: '',
        date: '',
    },

    get: function(attr) {
        var val = Backbone.Model.prototype.get.call(this, attr);
        // Convert date gets from string to date object, and set hours
        // to zero because only ever interested in day.
        if (attr == 'date') {
            var day = new Date(val);
            day.setHours(0,0,0,0);
            return day;
        } else {
            return val;
        }
    },

    toJSON: function() {
        var obj = Backbone.Model.prototype.toJSON.call(this);
        obj.date = obj.date.toJSON();
        return obj;
    },
});
module.exports = Food;
