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
        e.target.parentElement.querySelector('.food__delete').classList.remove('hidden');
    },

    mouseleave: function(e) {
        e.target.parentElement.querySelector('.food__delete').classList.add('hidden');
    },

    delete: function(e) {
        var foodName = e.target.parentElement.querySelector('.food__name').textContent;
        // Use for instead of forEach because breaking is required
        for (var i = 0; i < this.model.foods.length; i++) {
            if (this.model.foods.models[i].get('name') == foodName) {
                this.model.foods.models[i].destroy();
                break;
            }
        };
    },
});
module.exports = DayView;
