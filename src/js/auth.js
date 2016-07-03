'use strict';
var firebase = require('firebase/app');
require('firebase/auth');
var tokens = require('../tokens.js');
var EXAMPLE_DB_URL = tokens.firebase.databaseURL + '/example/food_history';

// TODO: Change this to use _.extend with an initialize method I call after creation
var authController = _.clone(Backbone.Events);
authController.firebaseApp = firebase.initializeApp(tokens.firebase);
authController.auth = authController.firebaseApp.auth();
authController.auth.onAuthStateChanged(function(user) {
    if (user) {
        authController.dbUrl = tokens.firebase.databaseURL + '/' + user.uid + '/food_history';
    } else {
        authController.dbUrl = EXAMPLE_DB_URL;
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
