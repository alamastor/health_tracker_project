var app = app || {};
app.Food = Backbone.Model.extend({
    defaults: {
        name: '',
        brand: '',
        calories: '',
    },
});
