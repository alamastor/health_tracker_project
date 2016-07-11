'use strict';
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
var FoodHistory = require('./collections/food_history.js');
var tokens = require('./tokens.js');
var EXAMPLE_DB_URL = '/example/food_history';

var authController = {

    username: 'Example',

    firebaseApp: firebase.initializeApp(tokens.firebase),

    initialize: function() {
        var db = firebase.database();
        var dbRef = db.ref(EXAMPLE_DB_URL);
        this.foodHistory = new FoodHistory(null, {url: dbRef});
        this.auth = this.firebaseApp.auth();
        var self = this;
        this.auth.onAuthStateChanged(function(user) {
            if (user) {
                dbRef = db.ref(user.uid + '/food_history');
                self.username = user.displayName;
                self.foodHistory = new FoodHistory(null, {url: dbRef});
            } else {
                dbRef = db.ref(EXAMPLE_DB_URL);
                self.username = 'Example';
                self.foodHistory = new FoodHistory(null, {url: dbRef});
            }
            self.trigger('auth_state_changed');
        });
    },

    doGoogleLogin: function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        this.auth.signInWithPopup(provider).then(function(result) {
            // User signed in
            var uid = result.user.uid;
        }).catch(function(error) {
            console.log(error);
        });
    },

    doLogout: function() {
        this.auth.signOut();
    },
};
_.extend(authController, Backbone.Events);
authController.initialize();

module.exports = authController;
