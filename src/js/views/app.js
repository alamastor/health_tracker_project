'use strict';
var ChartView = require('./chart.js');
var AppView = Backbone.View.extend({
    el: 'body',

    events: {
        'click #chart-button': 'openChart',
    },

    initialize: function() {
        this.chartView = new ChartView();
    },

    openChart: function() {
        this.listenTo(this.chartView, 'close', this.chartClose);
        $('#chart').removeClass('hidden');
        $('main').addClass('fade');
        this.chartView.update();
    },

    chartClose: function() {
        $('main').removeClass('fade');
        $('#chart').addClass('hidden');
    },
});

module.exports = AppView;
