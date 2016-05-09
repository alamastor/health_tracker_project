define(['backbone'], function(Backbone) {
    var AppView = Backbone.View.extend({

        search: function() {
            console.log('executing search');
        }
    });
    return new AppView();
});
