/**
 * A Backbone view for displaying the food history stats.
 */
'use strict';
var authController = require('../auth.js');
var ChartView = require('./chart.js');
var statsTemplate = require('../../templates/stats.html');
var StatsView = Backbone.View.extend({
    el: '#stats',

    collection: authController.foodHistory,

    template: statsTemplate,

    initialize: function() {
        this.listenTo(authController, 'auth_state_changed', this.updateCollection);
        this.listenTo(this.collection, 'update', this.render);
    },

    /**
     * When the user changes a new FoodHistory collection is created, need to
     * listen to that and stop listenting to the old one.
     */
    updateCollection: function() {
        this.stopListening(this.collection);

        this.collection = authController.foodHistory;

        this.listenTo(authController, 'auth_state_changed', this.updateListener);
        this.listenTo(this.collection, 'update', this.render);

        this.render();
    },

    render: function() {
        this.$el.html(statsTemplate({
            weeklyAveCals: this.collection.getWeeklyAve(),
            monthlyAveCals: this.collection.getMonthlyAve(),
        }));
    },
});
module.exports = StatsView;
