/**
 * Model representing the error status of the app. Just contains a string of
 * any error message that should be displayed to user. Usually messages about
 * failed API access.
 */
'use strict';
var ErrorModel = Backbone.Model.extend({
    defaults: {
        text: '',
    },

    sync: function() {},
});

var errorModel = new ErrorModel();
module.exports = errorModel;
