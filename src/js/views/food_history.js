'use strict';
var Days = require('../collections/days');
var DayView = require('./day.js');
var authContoller = require('../auth.js');
var HistoryView = Backbone.View.extend({
    el: 'body',

    initialize: function() {
        this.collection = new Days();

        this.$foodHistory = this.$('#food-history');

        this.listenTo(this.collection, 'days_loaded', this.render);
        this.listenTo(authContoller, 'auth_state_changed', this.updateCollection);
    },

    render: function() {
        var self = this;
        this.$foodHistory.empty();

        this.collection.forEach(function(day) {
            var view = new DayView({model: day});
            self.$foodHistory.append(view.render().el);
        });
    },

    updateCollection: function() {
        this.stopListening(this.collection);

        this.collection = new Days();

        this.listenTo(this.collection, 'days_loaded', this.render);
    },
});

module.exports = HistoryView;
