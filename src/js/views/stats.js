'use strict';
var authController = require('../auth.js');
var statsTemplate = require('../../templates/stats.html');
var StatsView = Backbone.View.extend({
    el: '#stats',

    collection: authController.foodHistory,

    template: statsTemplate,

    initialize: function() {
        this.listenTo(authController.foodHistory, 'update', this.render);
    },

    render: function() {
        this.$el.html(statsTemplate({
            weeklyAveCals: this.collection.getWeeklyAve(),
            monthlyAveCals: this.collection.getMonthlyAve(),
        }));
    },
});
module.exports = StatsView;
