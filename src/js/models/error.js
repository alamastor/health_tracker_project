'use strict';
var ErrorModel = Backbone.Model.extend({
    defaults: {
        text: '',
    },

    sync: function() {},
});

var errorModel = new ErrorModel();
module.exports = errorModel;
