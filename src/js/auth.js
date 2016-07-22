/**
 * AuthController module used to interact with the the Firebase auth system. This
 * object will emit Backbone event 'auth_state_changed' when on a successfull login
 * or logout.
 */
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

    // Required Firebase initialization
    firebaseApp: firebase.initializeApp(tokens.firebase),

    initialize: function() {
        var db = firebase.database();
        var dbRef = db.ref(EXAMPLE_DB_URL);
        this.exampleFoodHistory = new FoodHistory(null, {url: dbRef});
        this.foodHistory = this.exampleFoodHistory;
        this.auth = this.firebaseApp.auth();
        var self = this;
        // Firebase auth callbacks, triggered on successfull login/logout.
        this.auth.onAuthStateChanged(function(user) {
            // If user this is a login event.
            if (user) {
                self.loggedIn = true;
                dbRef = db.ref(user.uid + '/food_history');
                self.foodHistory = new FoodHistory(null, {url: dbRef});
                if (user.isAnonymous) {
                    self.username = ANONYMOUS_USERNAME;
                } else {
                    self.username = user.displayName;
                }
            // Not user, this is a logout event.
            } else {
                self.loggedIn = false;
                self.foodHistory = self.exampleFoodHistory;
                self.username = EXAMPLE_USERNAME;
            }
            self.trigger('auth_state_changed');
        });
    },

    // Login to Firebase using their Google auth provider.
    doGoogleLogin: function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        // Don't need success/fail handlers, the onAuthStateChanged handler and
        // Google login window will deal with these.
        this.auth.signInWithPopup(provider);
    },

    // Login to Firebase anonymously.
    doAnonymousLogin: function() {
        // Don't need success handlers, the onAuthStateChanged handler deal with
        // this.
        this.auth.signInAnonymously().catch(function(error) {
            // TODO: handle errors
        });
    },

    doLogout: function() {
        // onAuthStateChanged will catch this.
        this.auth.signOut();
    },
};
_.extend(authController, Backbone.Events);
authController.initialize();

module.exports = authController;
