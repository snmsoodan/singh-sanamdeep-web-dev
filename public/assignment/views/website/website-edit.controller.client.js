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
           // vm.website=WebsiteService.findWebsiteById(vm.websiteId);
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (response) {
                    vm.website=response.data;
                })
        }findWebsiteById();
        
        
        function deleteWebsite(websiteId) {
            // var result=WebsiteService.deleteWebsite(websiteId);
            // if(result){
            //     $location.url("/user/"+vm.userId+"/website");
            // }else{
            //     vm.error="unable to create website";
            // }
            
            WebsiteService
                .deleteWebsite(websiteId)
                .then(function (response) {
                    console.log("here")
                        $location.url("/user/"+vm.userId+"/website")
                },
                function (error) {
                    console.log("not here")
                    vm.error="unable to delete website";
                })

        }
        
        function updateWebsite(id,website) {
            // var result=WebsiteService.updateWebsite(id,website);
            // if(result){
            //     $location.url("/user/"+vm.userId+"/website");
            // }else{
            //     vm.error="unable to create website";
            // }

            WebsiteService 
                .updateWebsite(id,website)
                .then(function (response) {
                    console.log("a");
                    $location.url("/user/"+vm.userId+"/website");
                        console.log("b");
                },
                function (error) {
                    console.log("e");
                    vm.error="unable to create website";
                })
            
            
        }



    }

})();