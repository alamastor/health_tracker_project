'use strict';
var Foods = Backbone.Collection.extend({
    sync: function(models) {},
    initialize: function() {
        this.on('add', function() {
            console.log('added');
            console.log(this);
        });
    },
});
module.exports = Foods;
