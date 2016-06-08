var app = app || {}
var FoodHistory = Backbone.Firebase.Collection.extend({
    url: 'https://udacity-heath-tracker.firebaseio.com/food_history',
    model: app.Food,
});
app.foodHistory = new FoodHistory();
