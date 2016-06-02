define(['backbone'], function(Backbone) {
    var searchResult = Backbone.Model.extend({
        defaults: {
            name: '',
            brand: '',
            calories: '',
        },

        sync: function(method, collection) {
            console.log(method);
            console.log(collection);
        },
    });
    return searchResult;
});
