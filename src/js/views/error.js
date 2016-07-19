'use strict';
var errorModel = require('../models/error.js');
var errorView = Backbone.View.extend({
    el: '#error-text',

    initialize: function() {
        this.listenTo(errorModel, 'change', this.render);
    },

    render: function() {
        this.$el.text(errorModel.get('text'));
    },
});

module.exports = errorView;
