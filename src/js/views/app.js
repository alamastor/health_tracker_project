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
        this.$el.append(this.chartView.render());
        this.chartView.update();
        $('main').addClass('fade');
    },

    chartClose: function() {
        $('main').removeClass('fade');
        this.chartView.remove();
    },
});

module.exports = AppView;
