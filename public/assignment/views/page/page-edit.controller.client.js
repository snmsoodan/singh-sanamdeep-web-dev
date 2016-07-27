(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController",PageEditController)

    function PageEditController($location,$routeParams,PageService) {
        var vm=this;
        vm.userId=$routeParams.userId;
        vm.websiteId=$routeParams.websiteId;
        vm.pageId=$routeParams.pageId;
        vm.updatePage=updatePage;
        vm.deletePage=deletePage;


        function init() {
           // vm.page=PageService.findPageById(vm.pageId);
            PageService
                .findPageById(vm.pageId)
                .then(function (response) {
                    vm.page=response.data;
                })
        }
        init();


        function updatePage(pageId,page) {
            // var result=PageService.updatePage(pageId,page);
            // if(result){
            //     $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            // }
            // else{
            //     vm.error="cannot update Page"
            // }
            PageService
                .updatePage(pageId,page)
                .then(function (response) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                },function (error) {
                    vm.error="cannot update Page";
                })
            
        }
        
        function deletePage(pageId) {
            // var result=PageService.deletePage(pageId);
            // if(result){
            //     $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            // }
            // else{
            //     vm.error="cannot delete Page"
            // }    

            PageService
                .deletePage(pageId)
                .then(function (response) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                },function (error) {
                    vm.error="cannot delete Page";
                })
            
        }


    }
})();