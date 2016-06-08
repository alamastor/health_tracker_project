var app = app || {};
app.AppView = Backbone.View.extend({
    el: 'body',

    events: {
        'submit #search-form': 'searchSubmit',
    },

    initialize: function() {
        this.$searchInput = this.$('#search-input');
        this.$searchResults = this.$('#search-results');

        this.listenTo(app.searchResults, 'add', this.addSearchResult);
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
                    appId: app.tokens.nutritionix.id,
                    appKey: app.tokens.nutritionix.key,
                }
        }).done(function(data, textStatus, jqXHR) {
            console.log('search done');
            console.log(data);
            console.log(textStatus);
            console.log(jqXHR);
            data.hits.forEach(function(result) {
                app.searchResults.create({
                    name: result.fields.item_name,
                    brand: result.fields.brand_name,
                    calories: result.fields.nf_calories,
                });
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
        var view = new app.SearchResultView({model: result});
        this.$searchResults.append(view.render().el);
    },
});
