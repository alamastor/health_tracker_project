define(['backbone', 'jquery', 'tokens', '../collections/search_results'], function(Backbone, $, tokens, searchResults) {
    var AppView = Backbone.View.extend({
        el: 'body',

        template: _.template('<ul></ul>'),

        events: {
            'submit #search-form': 'searchSubmit',
        },

        initialize: function() {
            this.$searchInput = this.$('#search-input');
            this.$searchResults = this.$('#search-results');

            this.listenTo(searchResults, 'add', this.addSearchResult);
        },


        searchSubmit: function(event) {
            // Stop refresh after submit
            event.preventDefault();
            this.search(this.$searchInput.val());
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

        addSearchResult: function(result) {
            console.log('add search res');
            this.$searchResults.append('<li>' + result.attributes.name + '</li>');
        },
    });
    return new AppView();
});
