'use strict';
var foodHistory = require('../collections/food_history.js');
var Days = require('../collections/days');
var DayView = require('./day.js');
var HistoryView = Backbone.View.extend({
    el: 'body',

    initialize: function() {
        this.collection = new Days();

        this.$foodHistory = this.$('#food-history');

        this.listenTo(this.collection, 'days_loaded', this.render);
    },

    render: function() {
        var self = this;
        this.$foodHistory.empty();

        this.collection.forEach(function(day) {
            var view = new DayView({model: day});
            self.$foodHistory.append(view.render().el);
        });
    },
});

module.exports = HistoryView;
