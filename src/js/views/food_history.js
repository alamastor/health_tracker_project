'use strict';
var foodHistory = require('../collections/food_history.js');
var Days = require('../collections/days');
var DayView = require('./day.js');
var HistoryView = Backbone.View.extend({
    el: 'body',

    collection: foodHistory,

    initialize: function() {
        this.days = new Days();

        this.$foodHistory = this.$('#food-history');

        this.listenTo(foodHistory, 'all', this.render);
    },

    render: function() {
        var self = this;
        this.$foodHistory.empty();
        // this.collection.sort();
        var prevDate = new Date(1990, 1, 1);
        var days = [];
        this.collection.forEach(function(food) {
            if (food.attributes.date !== '') {
                var dateObj = food.get('date');
                // Clear time, just leaving day
                dateObj.setHours(0,0,0,0);
                if (dateObj.valueOf() !== prevDate.valueOf()) {
                    days.push({
                        date: dateObj.toString(),
                        foods: [food.get('name')]
                    });
                } else {
                    _.last(days).foods.push(food.attributes.name);
                }
                prevDate = dateObj;
            }
        });

        days.forEach(function(day) {
            var model = new Backbone.Model();
            model.set(day);
            var view = new DayView({model: model});
            self.$foodHistory.append(view.render().el);
        });
    },
});

module.exports = HistoryView;
