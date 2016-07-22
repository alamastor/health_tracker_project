'use strict';
var Days = require('../collections/days');
var DayView = require('./day.js');
var authContoller = require('../auth.js');
var HistoryView = Backbone.View.extend({
    el: 'body',

    initialize: function() {
        this.collection = new Days();

        this.$foodHistory = this.$('#food-history');

        this.listenTo(this.collection, 'add', this.render);
        this.render();
    },

    render: function() {
        var self = this;
        this.$foodHistory.empty();

        this.collection.forEach(function(day) {
            var view = new DayView({model: day});
            self.$foodHistory.append(view.render().el);
        });
    },
});

module.exports = HistoryView;
