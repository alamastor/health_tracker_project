'use strict';
var searchResults = require('../collections/search_results.js');
var SearchResultView = require('./search_result.js');
var foodHistory = require('../collections/food_history.js');
var DayView = require('./day.js');
var tokens = require('../tokens.js');
var util = require('../util.js');
var AppView = Backbone.View.extend({
    el: 'body',

    events: {
        'submit #search-form': 'searchSubmit',
    },

    initialize: function() {
        this.$searchInput = this.$('#search-input');
        this.$searchResults = this.$('#search-results');
        this.$foodHistory = this.$('#food-history');
        this.$stats= this.$('#stats');

        this.listenTo(searchResults, 'add', this.addSearchResult);
        this.listenTo(foodHistory, 'add remove reset', this.updateHistory);
        this.listenTo(foodHistory, 'add remove reset', this.updateStats);
    },

    searchSubmit: function(event) {
        // Stop refresh after submit
        event.preventDefault();
        this.search(this.$searchInput.val());
    },

    search: function(searchText) {
        console.log('executing search');
        $.ajax('https://api.nutritionix.com/v1_1/search/' + searchText, {
                data: {
                    results: '0:20',
                    cal_min: '0',
                    cal_max: '50000',
                    fields: '*',
                    appId: tokens.nutritionix.id,
                    appKey: tokens.nutritionix.key,
                }
        }).done(function(data, textStatus, jqXHR) {
            console.log('search done');
            console.log(data);
            console.log(textStatus);
            console.log(jqXHR);
            data.hits.forEach(function(result) {
                searchResults.create({
                    name: result.fields.item_name,
                    brand: result.fields.brand_name,
                    calories: result.fields.nf_calories,
                });
            });
        }).fail(function(textStatus, jqXHR, errorThrown) {
            console.log('search fail');
            console.log(textStatus);
            console.log(jqXHR);
            console.log(errorThrown);
        });
    },

    addSearchResult: function(result) {
        console.log('add search res');
        var view = new SearchResultView({model: result});
        this.$searchResults.append(view.render().el);
    },

    updateHistory: function(foodHistory) {
        var self = this;
        this.$foodHistory.empty();
        foodHistory.collection.sort();
        var prevDate = new Date(1990, 1, 1);
        var days = [];
        foodHistory.collection.forEach(function(food) {
            console.log(food);
            if (food.attributes.date !== '') {
                var dateObj = new Date(food.attributes.date);
                // Clear time, just leaving day
                dateObj.setHours(0,0,0,0);
                if (dateObj.valueOf() !== prevDate.valueOf()) {
                    days.push({
                        date: dateObj.toString(),
                        foods: [food.attributes.name]
                    });
                } else {
                    _.last(days).foods.push(food.attributes.name);
                }
                prevDate = dateObj;
            }
        });

        days.forEach(function(day) {
            var model = new Backbone.Model();
            model.set(day);
            var view = new DayView({model: model});
            self.$foodHistory.append(view.render().el);
        });
    },

    updateStats: function(foodHistory) {
        var now = new Date();
        var today = now.setHours(0,0,0,0);
        var todayCalories = 0;
        var thisWeekCalories = 0;
        var thisMonthCalories = 0;
        foodHistory.collection.forEach(function(food) {
            var foodTime = new Date(food.get('date'));
            if (foodTime.setHours(0,0,0,0) == today) {
                todayCalories += food.get('calories');
            }
            if (util.isThisWeek(foodTime)) {
                thisWeekCalories += food.get('calories');
            }
            if (foodTime.getMonth() == now.getMonth()) {
                thisMonthCalories += food.get('calories');
            }
        });
        var weeklyAve = thisWeekCalories / (now.getDay() + 1);
        var monthlyAve = thisMonthCalories / (now.getDate());

        var statsTemplate = require('../../templates/stats.html');
        this.$stats.html(statsTemplate({
            todayCals: todayCalories,
            weeklyAveCals: weeklyAve,
            monthlyAveCals: monthlyAve,
        }));
    },

});

module.exports = AppView;
