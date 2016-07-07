'use strict';
var tokens = require('../tokens.js');
var authController = require('../auth.js');
var authTemplate = require('../../templates/auth.html');
var authController = require('../auth.js');
var AuthView = Backbone.View.extend({
    el: '#auth',

    template: authTemplate,

    events: {
        'click #login': 'doGoogleLogin',
        'click #logout': 'doLogout'
    },

    initialize: function() {
        this.listenTo(authController, 'auth_state_changed', this.render);
        this.render();
    },

    render: function() {
        this.$el.html(this.template({username: authController.username}));
        return this;
    },

    doGoogleLogin: function() {
        authController.doGoogleLogin();
    },

    doLogout: function() {
        authController.doLogout();
    },
});

module.exports = AuthView;
