(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController",EditWebsiteController)
    function EditWebsiteController($location,$routeParams,WebsiteService) {
        var vm=this;
        vm.userId=$routeParams.userId;
        vm.websiteId=$routeParams.websiteId;
        vm.deleteWebsite=deleteWebsite;

        function deleteWebsite(websiteId) {
            var result=WebsiteService.deleteWebsite(websiteId);
            if(result){
                $location.url("/user/"+vm.userId+"/website");
            }else{
                vm.error="unable to create website";
            }

        }



    }

})();