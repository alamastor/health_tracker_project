/**
 * Backbone view for controlling body of page.
 */
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

        this.listenTo(this.searchResultsView, 'open', this.searchOpened);
    },

    /**
     * Toggle food history chart open state.
     */
    chartIsOpen: false,
    toggleChart: function() {
        if (this.chartIsOpen) {
            this.closeChart();
        } else {
            this.openChart();
        }
    },

    /**
     * Open food history chart.
     */
    openChart: function() {
        this.listenTo(this.chartView, 'close', this.closeChart);
        this.$chart.removeClass('hidden');
        this.$main.addClass('fade');
        this.chartView.render();
        this.chartIsOpen = true;
    },

    /**
     * Close food history chart.
     */
    closeChart: function() {
        this.$main.removeClass('fade');
        this.$chart.addClass('hidden');
        this.chartIsOpen = false;
    },

    /**
     * Function to update page background when search results window opens.
     */
    searchOpened: function() {
        this.$container.addClass('fade');

        // Add click handler to cancel search on click which aren't on one of the
        // buttons in this view.
        var self = this;
        this.$el.click(function() {
            self.closeSearch();
        });
    },

    /**
     * Function to close search results window.
     */
    closeSearch: function() {
        this.searchResultsView.cancelSearch();
        this.$container.removeClass('fade');
    },
});

module.exports = AppView;
