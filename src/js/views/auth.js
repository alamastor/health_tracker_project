/**
 * Backbone view for current login state.
 */
'use strict';
var tokens = require('../tokens.js');
var authController = require('../auth.js');
var authTemplate = require('../../templates/auth.html');
var authController = require('../auth.js');
var AuthView = Backbone.View.extend({
    el: '#auth',

    template: authTemplate,

    events: {
        'click #google-login': 'doGoogleLogin',
        'click #anon-login': 'doAnonymousLogin',
        'click #logout': 'doLogout'
    },

    initialize: function() {
        this.listenTo(authController, 'auth_state_changed', this.render);
        this.render();
    },

    render: function() {
        this.$el.html(this.template({username: authController.username}));
        // Change state based whether use is logged in or not.
        if (authController.loggedIn) {
            this.$('#logout').removeClass('hidden');
            this.$('#google-login').addClass('hidden');
            this.$('#anon-login').addClass('hidden');
        } else {
            this.$('#google-login').removeClass('hidden');
            this.$('#anon-login').removeClass('hidden');
            this.$('#logout').addClass('hidden');
        }
        return this;
    },

    /**
     * Login with a Google account.
     */
    doGoogleLogin: function() {
        authController.doGoogleLogin();
    },

    /**
     * Do Firebase anonymous login.
     */
    doAnonymousLogin: function() {
        authController.doAnonymousLogin();
    },

    doLogout: function() {
        authController.doLogout();
    },
});

module.exports = AuthView;
