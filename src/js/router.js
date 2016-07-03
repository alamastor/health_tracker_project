'use strict';
var FoodHistory = require('./collections/food_history.js');
var tokens = require('./tokens.js');
var Router = Backbone.Router.extend({
    routes: {
        'dist/': 'exampleCollection',
        'dist/:uid': 'userCollection'
    },
});

var router = new Router();
Backbone.history.start();

module.exports = router;
