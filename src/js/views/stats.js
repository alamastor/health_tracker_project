'use strict';
var foodHistory = require('../collections/food_history.js');
var statsTemplate = require('../../templates/stats.html');
var StatsView = Backbone.View.extend({
    el: '#stats',

    collection: foodHistory,

    template: statsTemplate,

    initialize: function() {
        this.listenTo(foodHistory, 'all', this.render);
    },

    render: function() {
        this.$el.html(statsTemplate({
            todayCals: this.collection.getTodayCalories(),
            weeklyAveCals: this.collection.getWeeklyAve(),
            monthlyAveCals: this.collection.getMonthlyAve(),
        }));
    },
});
module.exports = StatsView;
