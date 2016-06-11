require('backbonefire');
var Food = require('../models/Food.js');
var FoodHistory = Backbone.Firebase.Collection.extend({
    url: 'https://udacity-heath-tracker.firebaseio.com/food_history',
    model: Food,
});
var foodHistory = new FoodHistory();
module.exports = foodHistory;
