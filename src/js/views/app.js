'use strict';
var ChartView = require('./chart.js');
var SearchResultsView = require('./search_results.js');
var AppView = Backbone.View.extend({
    el: 'body',

    events: {
        'click #chart-button': 'toggleChart',
    },

    initialize: function() {
        this.$container = this.$('#container');
        this.$main = this.$('main');
        this.$chart = this.$('#chart');

        this.chartView = new ChartView();
        this.searchResultsView = new SearchResultsView();

        this.listenTo(this.searchResultsView, 'open', this.openSearch);
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
        this.$chart.removeClass('hidden');
        this.$main.addClass('fade');
        this.chartView.update();
        this.chartIsOpen = true;
    },

    closeChart: function() {
        this.$main.removeClass('fade');
        this.$chart.addClass('hidden');
        this.chartIsOpen = false;
    },

    openSearch: function() {
        this.$container.addClass('fade');

        // Add click handler to cancel search on click which aren't on one of the
        // buttons in this view.
        var self = this;
        this.$el.click(function() {
            self.closeSearch();
        });
    },

    closeSearch: function() {
        this.searchResultsView.cancelSearch();
        this.$container.removeClass('fade');
    },
});

module.exports = AppView;
