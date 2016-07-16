'use strict';
var tokens = require('./tokens.js');
// TODO: add promises polyfill & remove Promises from jshint
var searchController = {
    search: function(searchText) {
        var promise = new Promise(function(resolve, reject) {
            console.log('executing search');
            $.ajax('https://api.nutritionix.com/v1_1/search/' + searchText, {
                    data: {
                        results: '0:20',
                        cal_min: '0',
                        cal_max: '50000',
                        fields: '*',
                        appId: tokens.nutritionix.id,
                        appKey: tokens.nutritionix.key,
                    }
            }).done(function(data, textStatus, jqXHR) {
                console.log('search done');
                console.log(data);
                console.log(textStatus);
                console.log(jqXHR);
                if (data.hits.length === 0) {
                    reject('no_results');
                } else {
                    resolve(data.hits);
                }
            }).fail(function(textStatus, jqXHR, errorThrown) {
                console.log('search fail');
                console.log(textStatus);
                console.log(jqXHR);
                console.log(errorThrown);
            });
        });
        return promise;
    },
};

module.exports = searchController;
