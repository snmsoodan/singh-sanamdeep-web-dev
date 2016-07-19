(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController)
    function WebsiteListController($location,$routeParams,WebsiteService) {
        var vm=this;
        
        vm.userId=$routeParams.userId;
        
        function init(){
            vm.websites=WebsiteService.findWebsitesForUserId(vm.userId);
        }
        init();





    }

})();