define(['backbone', 'jquery', 'tokens', '../collections/search_results'], function(Backbone, $, tokens, searchResults) {
    var AppView = Backbone.View.extend({
        tagName: 'body',

        template: _.template('<ul></ul>'),

        initialize: function() {
            this.listenTo(searchResults, 'add', this.addSearchResult);
            this.render();
        },

        render: function() {
            this.$('#main').html('<ul></ul>');
        },

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
                data.hits.forEach(function(res) {
                    searchResults.create({name: res.fields.item_name});
                });
            }).fail(function(textStatus, jqXHR, errorThrown) {
                console.log('search fail');
                console.log(textStatus);
                console.log(jqXHR);
                console.log(errorThrown);
            });
        },

        addSearchResult: function() {
            console.log('add search res');
            $('ul').append('<li>123</li>');
        },
    });
    return new AppView();
});
