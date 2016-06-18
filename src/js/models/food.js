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
        if (attr == 'date') {
            return new Date(val);
        } else {
            return val;
        }
    },

    toJSON: function() {
        var json = Backbone.Model.prototype.toJSON.call(this);
        json.date = json.date.toISOString();
        return json;
    },
});
module.exports = Food;
