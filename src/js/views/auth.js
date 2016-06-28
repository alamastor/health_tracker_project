'use strict';
var tokens = require('../tokens.js');
var authTemplate = require('../../templates/auth.html');
var AuthView = Backbone.View.extend({
    el: '#auth',

    template: authTemplate,

    events: {
        'click #login': 'doGoogleLogin',
        'click #logout': 'doLogout'
    },

    initialize: function(options) {
        this.firebase = options.firebase;
        this.auth = this.firebase.auth();
        this.render();
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    },

    doGoogleLogin: function() {
        var provider = new this.firebase.auth.GoogleAuthProvider();
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
});

module.exports = AuthView;
