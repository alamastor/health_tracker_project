/**
 * Main Backbone view for the app, shows all the days in the users history.
 */
'use strict';
var Days = require('../collections/days');
var DayView = require('./day.js');
var authContoller = require('../auth.js');
var HistoryView = Backbone.View.extend({
    el: '#food-history',

    initialize: function() {
        this.collection = new Days();

        this.listenTo(this.collection, 'add', this.render);
        this.render();
    },

    render: function() {
        var self = this;
        // Clear and rerender when a new day is added. After initial load this
        // should only occur when the day changes while use has app open, so doing
        // a full reload is not a problem.
        this.$el.empty();

        this.collection.forEach(function(day) {
            var view = new DayView({model: day});
            self.$el.append(view.render().el);
        });
    },
});

module.exports = HistoryView;
