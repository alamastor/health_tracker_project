var Food = Backbone.Model.extend({
    defaults: {
        name: '',
        brand: '',
        calories: '',
        date: '',
    },

    parse: function(response, options) {
        console.log(response);
        return reponse;
    },

    toJSON: function() {
        var json = Backbone.Model.prototype.toJSON.call(this);
        json.date = json.date.toISOString();
        return json;
    },
});
module.exports = Food;
