'use strict';
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
var FoodHistory = require('./collections/food_history.js');
var tokens = require('./tokens.js');
var EXAMPLE_DB_URL = '/example/food_history';

var ANONYMOUS_USERNAME = 'Anonymous User';
var EXAMPLE_USERNAME = 'Example User';

var authController = {

    username: EXAMPLE_USERNAME,
    loggedIn: false,

    firebaseApp: firebase.initializeApp(tokens.firebase),

    initialize: function() {
        var db = firebase.database();
        var dbRef = db.ref(EXAMPLE_DB_URL);
        this.foodHistory = new FoodHistory(null, {url: dbRef});
        this.auth = this.firebaseApp.auth();
        var self = this;
        this.auth.onAuthStateChanged(function(user) {
            if (user) {
                self.loggedIn = true;
                dbRef = db.ref(user.uid + '/food_history');
                if (user.isAnonymous) {
                    self.username = ANONYMOUS_USERNAME;
                } else {
                    self.username = user.displayName;
                }
            } else {
                self.loggedIn = false;
                dbRef = db.ref(EXAMPLE_DB_URL);
                self.username = EXAMPLE_USERNAME;
            }
            self.foodHistory = new FoodHistory(null, {url: dbRef});
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

    doAnonymousLogin: function() {
        this.auth.signInAnonymously().catch(function(error) {
            // TODO: handle errors
        });
    },

    doLogout: function() {
        this.auth.signOut();
    },
};
_.extend(authController, Backbone.Events);
authController.initialize();

module.exports = authController;
