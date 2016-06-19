'use strict';
var dayTemplate = require('../../templates/day.html');
var DayView = Backbone.View.extend({
    tagName: 'div',

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
});
module.exports = DayView;
