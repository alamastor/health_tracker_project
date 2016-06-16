'use strict';
var util = {
    isThisWeek: function(date) {
        var now = new Date();
        var todayDay = now.getDay();
        var dateDiff = (now.setHours(0,0,0,0) - date.setHours(0,0,0,0)) / (1000*60*60*24);
        if (dateDiff <= now.getDay()) {
            return true;
        } else {
            return false;
        }
    },
};
module.exports = util;
