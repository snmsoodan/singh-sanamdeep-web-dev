(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController",EditWebsiteController)
    function EditWebsiteController($location,$routeParams,WebsiteService) {
        var vm=this;
        vm.userId=$routeParams.userId;
        vm.websiteId=$routeParams.websiteId;
        vm.deleteWebsite=deleteWebsite;
        vm.updateWebsite=updateWebsite;

        
        function findWebsiteById() {
            vm.website=WebsiteService.findWebsiteById(vm.websiteId);
        }findWebsiteById();
        
        
        function deleteWebsite(websiteId) {
            var result=WebsiteService.deleteWebsite(websiteId);
            if(result){
                $location.url("/user/"+vm.userId+"/website");
            }else{
                vm.error="unable to create website";
            }

        }
        
        function updateWebsite(id,website) {
            var result=WebsiteService.updateWebsite(id,website);
            if(result){
                $location.url("/user/"+vm.userId+"/website");
            }else{
                vm.error="unable to create website";
            }
        }



    }

})();