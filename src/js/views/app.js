define(['backbone', 'jquery', 'tokens'], function(Backbone, $, tokens) {
    var AppView = Backbone.View.extend({

        search: function(searchText) {
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
            }).fail(function(textStatus, jqXHR, errorThrown) {
                console.log('search fail');
                console.log(textStatus);
                console.log(jqXHR);
                console.log(errorThrown);
            });
        }
    });
    return new AppView();
});
