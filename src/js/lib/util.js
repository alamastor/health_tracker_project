/**
 * Utility functions for the app.
 */
'use strict';
var util = {
    /**
     * Test whether a date is this week.
     * @param {Date} date - The date to test.
     * @returns {Boolean}
     */
    isThisWeek: function(date) {
        var now = new Date();
        var todayDay = now.getDay();
        var dateDiff = now.setHours(0,0,0,0) - date.setHours(0,0,0,0);
        dateDiff = dateDiff / (1000*60*60*24);
        if (dateDiff <= now.getDay()) {
            return true;
        } else {
            return false;
        }
    },
};

module.exports = util;
