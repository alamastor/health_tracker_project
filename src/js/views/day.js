'use strict';
var dayTemplate = require('../../templates/day.html');
var DayView = Backbone.View.extend({
    tagName: 'div',

    events: {
        'mouseenter li': 'mouseenter',
        'mouseleave li': 'mouseleave',
        'click .food__delete': 'delete',
    },

    initialize: function() {
        this.listenTo(this.model.foods, 'all', this.render);
    },

    template: dayTemplate,

    render: function() {
        var self = this;
        this.$el.html(this.template({
            date: self.model.get('date'),
            foods: self.model.foods,
        }));
        return this;
    },

    mouseenter: function(e) {
        var foodName = e.target.parentElement.querySelector('.food__delete').style.display = '';
    },

    mouseleave: function(e) {
        var foodName = e.target.parentElement.querySelector('.food__delete').style.display = 'none';
    },

    delete: function(e) {
        var foodName = e.target.parentElement.querySelector('.food__name').textContent;
        // Use for instead of forEach because breaking is required
        for (var i; i < this.model.foods.len; i++) {
            if (this.model.foods[i].get('name') == foodName) {
                this.model.foods[i].destroy();
                break;
            }
        };
    },
});
module.exports = DayView;
