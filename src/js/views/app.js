'use strict';
var ChartView = require('./chart.js');
var AppView = Backbone.View.extend({
    el: 'body',

    events: {
        'click #chart-button': 'toggleChart',
    },

    initialize: function() {
        this.chartView = new ChartView();
    },

    chartIsOpen: false,
    toggleChart: function() {
        if (this.chartIsOpen) {
            this.closeChart();
        } else {
            this.openChart();
        }
    },

    openChart: function() {
        this.listenTo(this.chartView, 'close', this.closeChart);
        $('#chart').removeClass('hidden');
        $('main').addClass('fade');
        this.chartView.update();
        this.chartIsOpen = true;
    },

    closeChart: function() {
        $('main').removeClass('fade');
        $('#chart').addClass('hidden');
        this.chartIsOpen = false;
    },
});

module.exports = AppView;
