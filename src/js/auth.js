'use strict';
var firebase = require('firebase/app');
require('firebase/auth');
var FoodHistory = require('./collections/food_history.js');
var router = require('./router.js');
var tokens = require('./tokens.js');
var EXAMPLE_DB_URL = tokens.firebase.databaseURL + '/example/food_history';

var authController = {
    dbUrl: EXAMPLE_DB_URL,

    username: 'Example',

    firebaseApp: firebase.initializeApp(tokens.firebase),

    initialize: function() {
        this.foodHistory = new FoodHistory(null, {url: this.dbUrl});
        this.auth = this.firebaseApp.auth();
        var self = this;
        this.auth.onAuthStateChanged(function(user) {
            if (user) {
                self.dbUrl = tokens.firebase.databaseURL + '/' + user.uid + '/food_history';
                self.username = user.displayName;
                self.foodHistory = new FoodHistory(null, {url: self.dbUrl});
                router.navigate('dist/' + user.uid);
            } else {
                self.dbUrl = EXAMPLE_DB_URL;
                self.username = 'Example';
                self.foodHistory = new FoodHistory(null, {url: self.dbUrl});
                router.navigate('dist/');
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
