require('backbonefire');
var Food = require('../models/Food.js');
var FoodHistory = Backbone.Firebase.Collection.extend({
    url: 'https://udacity-heath-tracker.firebaseio.com/food_history',
    model: Food,

    parse: function(response, options) {
        console.log(response);
        return reponse;
    },

    comparator: 'date',
});
var foodHistory = new FoodHistory({parse: true});
module.exports = foodHistory;
