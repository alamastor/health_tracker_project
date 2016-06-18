'use strict';
var foodHistory = require('../collections/food_history.js');
var Days = require('../collections/days');
var DayView = require('./day.js');
var HistoryView = Backbone.View.extend({
    el: 'body',

    collection: new Days(),

    initialize: function() {
        this.days = new Days();

        this.$foodHistory = this.$('#food-history');

        this.listenTo(this.collection, 'days_loaded', this.addAllDays);
        //this.listenTo(this.collection, 'add', this.addDay);
    },

    addAllDays: function() {
        var self = this;
        this.$foodHistory.empty();

        this.collection.forEach(function(day) {
            var view = new DayView({model: day});
            self.$foodHistory.append(view.render().el);
        });
    },

});

module.exports = HistoryView;
