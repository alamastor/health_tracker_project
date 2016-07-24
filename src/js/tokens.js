/**
 * API tokens for Firebase and Nutritionix. This is bad practice, on a real project
 * they should be kept on the the server, and out of version control, with API
 * calls also made server side, but this is a front end only project.
 */
'use strict';
var tokens = {
    nutritionix: {
        url: 'https://api.nutritionix.com/v1_1/search/',
        id: '21f75ade',
        key: 'e01a63a7b8e2dba4b187ce386582689e',
    },
    firebase: {
        apiKey: 'AIzaSyDk8_N8GOWuQI0nIIfcTf9owgh96bGvwzQ',
        authDomain: 'udacity-heath-tracker.firebaseapp.com',
        databaseURL: 'https://udacity-heath-tracker.firebaseio.com',
        storageBucket: 'udacity-heath-tracker.appspot.com',
    },
};

module.exports = tokens;
