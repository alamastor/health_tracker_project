'use strict';
var ChartView = require('./chart.js');
var AppView = Backbone.View.extend({
    el: 'body',

    events: {
        'click #chart-button': 'openChart',
    },

    openChart: function() {
        this.chartView = new ChartView();
        this.listenTo(this.chartView, 'close', this.chartClose);
        this.chartView.render();
        $('.container').addClass('fade');
    },

    chartClose: function() {
        $('.container').removeClass('fade');
        $('.container').unbind('click');
        this.chartView.remove();
    },
});

module.exports = AppView;
