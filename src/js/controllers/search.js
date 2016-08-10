/**
 * Module for handling food searches to Nutritionix API.
 */
'use strict';
var tokens = require('../lib/tokens.js');
var Promise = require('promise').Promise;
var searchController = {
    /**
     * Send search to Nutrionix API with searchText argument as the query, returning
     * a Promise object which will resolve with an array of results objects if
     * successfull or reject with an error message if possible.
     */
    search: function(searchText) {
        var promise = new Promise(function(resolve, reject) {
            $.ajax(tokens.nutritionix.url + searchText, {
                    data: {
                        results: '0:20',
                        cal_min: '0',
                        cal_max: '50000',
                        fields: '*',
                        appId: tokens.nutritionix.id,
                        appKey: tokens.nutritionix.key,
                    }
            }).done(function(data, textStatus, jqXHR) {
                if (data.hits.length === 0) {
                    reject('no_results');
                } else {
                    resolve(data.hits);
                }
            }).fail(function(textStatus, jqXHR, errorThrown) {
                reject(textStatus);
            });
        });
        return promise;
    },
};

module.exports = searchController;
