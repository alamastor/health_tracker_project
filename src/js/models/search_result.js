var app = app || {};
app.SearchResult = Backbone.Model.extend({
    defaults: {
        name: '',
        brand: '',
        calories: '',
    },

    sync: function(method, collection) {
        // Overridden to prevent default writing to database.
    },
});
