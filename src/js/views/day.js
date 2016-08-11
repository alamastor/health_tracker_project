/**
 * A Backbone view for rendering a one day in the user's food history.
 */
'use strict';
var dayTemplate = require('../../templates/day.html');
var searchController = require('../controllers/search.js');
var searchResults = require('../collections/search_results.js');
var errorModel = require('../models/error.js');
var DayView = Backbone.View.extend({
    tagName: 'section',
    className: 'day',

    events: {
        'submit .day__header--add': 'addFood',
        'click .food__delete': 'delete',
    },

    initialize: function() {
        this.listenTo(this.model.foods, 'all', this.render);
    },

    template: dayTemplate,

    render: function() {
        // If day is today or yesterday, then use that as title, otherwise just use
        // date.
        var self = this;
        var today = new Date();
        today.setHours(0,0,0,0);
        var yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        yesterday.setHours(0,0,0,0);
        var dateStr;
        if (this.model.get('date').valueOf() == today.valueOf()) {
            dateStr = 'Today';
        } else if (this.model.get('date').valueOf() == yesterday.valueOf()) {
            dateStr = 'Yesterday';
        } else {
            var dateSplit = this.model.get('date').toDateString().split(' ');
            dateStr = dateSplit[0] + ', ' + dateSplit[1] + ' ' + dateSplit[2];
        }

        this.$el.html(this.template({
            date: dateStr,
            dayCalories: this.model.foods.getTotalCalories(),
            foods: self.model.foods,
        }));

        this.$searchInput = this.$('#day-food-search');
        this.$loader = this.$('#loader');

        return this;
    },

    /**
     * Delete a food.
     */
    delete: function(event) {
        var foodElement = event.target.parentElement.parentElement;
        var foodName = foodElement.querySelector('.food__name').textContent;
        // Match food model to the text in element associated with the event.
        // Use for instead of forEach because breaking is required
        for (var i = 0; i < this.model.foods.length; i++) {
            if (this.model.foods.models[i].get('name') == foodName) {
                this.model.foods.models[i].destroy();
                break;
            }
        }
    },

    /**
     * Submit a food search and add result to search results collection.
     */
    addFood: function() {
        var self = this;
        this.$loader.removeClass('hidden');
        searchController.search(
            this.$searchInput.val()
        ).then(function(results) {
            errorModel.set({text: ''});
            results.forEach(function(result) {
                searchResults.create({
                    name: result.fields.item_name,
                    brand: result.fields.brand_name,
                    calories: result.fields.nf_calories,
                    date: self.model.get('date'),
                });
            });
            self.searchDone();
        }).catch(function(error) {
            switch (error) {
                case 'no_results':
                    errorModel.set({text: 'No matching foods found'});
                    break;
                default:
                    errorModel.set({text: 'Unable to connect to nutritionix.com'});
            }
            self.searchDone();
        });
        return false;
    },

    /**
     * Clean up view after a search completes.
     */
    searchDone: function() {
        this.$searchInput.val('');
        this.$searchInput.blur();
        this.$loader.addClass('hidden');
    },
});
module.exports = DayView;
