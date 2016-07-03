'use strict';
var firebase = require('firebase/app');
require('firebase/auth');
var FoodHistory = require('./collections/food_history.js');
var router = require('./router.js');
var tokens = require('./tokens.js');
var EXAMPLE_DB_URL = tokens.firebase.databaseURL + '/example/food_history';

// TODO: Change this to use _.extend with an initialize method I call after creation
var authController = _.clone(Backbone.Events);
authController.dbUrl = EXAMPLE_DB_URL;
authController.username = 'Example';
authController.firebaseApp = firebase.initializeApp(tokens.firebase);
authController.auth = authController.firebaseApp.auth();
authController.foodHistory = new FoodHistory(null, {url: authController.dbUrl});
authController.auth.onAuthStateChanged(function(user) {
    if (user) {
        authController.dbUrl = tokens.firebase.databaseURL + '/' + user.uid + '/food_history';
        authController.username = user.displayName;
        authController.foodHistory = new FoodHistory(null, {url: authController.dbUrl});
        router.navigate('dist/' + user.uid);
    } else {
        authController.dbUrl = EXAMPLE_DB_URL;
        authController.username = 'Example';
        authController.foodHistory = new FoodHistory(null, {url: authController.dbUrl});
        router.navigate('dist/');
    }
    authController.trigger('auth_state_changed');
});
authController.doGoogleLogin = function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    authController.auth.signInWithPopup(provider).then(function(result) {
        // User signed in
        var uid = result.user.uid;
    }).catch(function(error) {
        console.log(error);
    });
};
authController.doLogout = function() {
    authController.auth.signOut();
};


module.exports = authController;
