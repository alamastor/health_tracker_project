/**
 * Backbone view for loading sub views and controlling body of page.
 */
'use strict';
require('../../css/built_style.css');
var HistoryView = require('./food_history.js');
var StatsView = require('./stats.js');
var SearchView = require('./search.js');
var AuthView = require('./auth.js');
var ErrorView = require('./error.js');
var authContoller = require('../controllers/auth.js');
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

        var historyView = new HistoryView();
        new StatsView();
        new SearchView();
        new AuthView();
        new ErrorView();

        // When auth state changes replace the HistoryView with an new one which will have
        // the new users' data.
        Backbone.listenTo(authContoller, 'auth_state_changed', function() {
            // Call stop listening to allow garbage collection of views, can't call remove
            // because it will also remove the view.
            historyView.stopListening();
            historyView = new HistoryView();
        });
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
