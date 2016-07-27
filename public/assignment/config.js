(function () {
    angular
        .module("WebAppMaker")
        .config(Config);


    function Config($routeProvider) {
        $routeProvider

            .when("/flickr",{
                templateUrl:"views/widget/widget-flickr-search.view.client.html",
                controller:"FlickrImageSearchController",
                controllerAs:"model"

        })

            .when("/",{
                templateUrl:"views/home.html"
            })
            .when("/login",{
                templateUrl:"views/user/login.view.client.html",
                controller:"LoginController",
                controllerAs: "model"
            })
            .when("/register",{
                templateUrl:"views/user/register.view.client.html",
                controller:"RegisterController",
                controllerAs:"model"
            })
            .when("/user/:id",{
                templateUrl:"views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs:"model"
            })

            .when("/user/:userId/website/:websiteId/page/:pageId/widget/new",{
                templateUrl:"views/widget/widget-chooser.view.client.html",
                controller:"WidgetChooserController",
                controllerAs:"model"

            })

            .when("/user/:userId/website/:websiteId/page/:pageId/widget-heading/:widgetId",{
                templateUrl:"views/widget/widget-heading.view.client.html",
                controller:"WidgetHeadingController",
                controllerAs:"model"

            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget-image/:widgetId",{
                templateUrl:"views/widget/widget-image.view.client.html",
                controller:"WidgetImageController",
                controllerAs:"model"


            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget-youtube/:widgetId",{
                templateUrl:"views/widget/widget-youtube.view.client.html",
                controller:"WidgetYoutubeController",
                controllerAs:"model"


            })




            .when("/user/:userId/website/:websiteId/page",{
                templateUrl:"views/page/page-list.view.client.html",
                controller:"PageListController",
                controllerAs:"model"
            })
            .when("/user/:userId/website/:websiteId/page/new",{
                templateUrl:"views/page/page-new.view.client.html",
                controller:"PageNewController",
                controllerAs:"model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId",{
                templateUrl:"views/page/page-edit.view.client.html",
                controller:"PageEditController",
                controllerAs:"model"
            })





            .when("/user/:userId/website",{
                templateUrl:"views/website/website-list.view.client.html",
                controller:"WebsiteListController",
                controllerAs:"model"
            })
            .when("/user/:userId/website/new",{
                templateUrl:"views/website/website-new.view.client.html",
                controller:"NewWebsiteController",
                controllerAs:"model"
            })
            .when("/user/:userId/website/:websiteId",{
                templateUrl:"views/website/website-edit.view.client.html",
                controller:"EditWebsiteController",
                controllerAs:"model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget",{
                templateUrl:"views/widget/widget-list.view.client.html",
                controller:"WidgetListController",
                controllerAs:"model"

            })





            .otherwise({
                redirectTo:"/login"
            })

    }
})();
