require(['./config'], function(config) {
    require(['views/app'], function(AppView) {
        new AppView;
    });
});
