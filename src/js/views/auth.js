'use strict';
var tokens = require('../tokens.js');
var authController = require('../models/auth.js');
var authTemplate = require('../../templates/auth.html');
var firebase = require('firebase/app');
require('firebase/auth');
var AuthView = Backbone.View.extend({
    el: '#auth',

    template: authTemplate,

    events: {
        'click #login': 'doGoogleLogin',
        'click #logout': 'doLogout'
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    },

    doGoogleLogin: authController.doGoogleLogin,
    doLogout: authController.doLogout

});

module.exports = AuthView;
