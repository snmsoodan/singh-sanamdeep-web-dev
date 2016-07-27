(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController)

    function PageListController($routeParams,PageService) {
        var vm=this;
        vm.userId=$routeParams.userId;
        vm.websiteId=$routeParams.websiteId;

        function init() {
           // vm.pages=PageService.findPageByWebsiteId(vm.websiteId);
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .then(function (response) {
                    console.log("controller");
                    vm.pages=response.data;
                })
            
        }
        init();

    }
})();