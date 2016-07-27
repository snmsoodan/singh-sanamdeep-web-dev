(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController",WidgetChooserController)
    function WidgetChooserController($location,$routeParams,WidgetService) {
        var vm=this;
        vm.userId=$routeParams.userId;
        vm.websiteId=$routeParams.websiteId;
        vm.pageId=$routeParams.pageId;
        vm.createWidget=createWidget;



        function createWidget(type){
            var widgetId=(new Date).getTime()+"";
            // var result=WidgetService.createWidget(widgetId,type,vm.pageId);
            // if(result){
            //    
            //
            //     $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/"+result+"/"+widgetId);
            // }
            // else{
            //   
            //     vm.error="failure";
            // }
            WidgetService
                .createWidget(widgetId,type,vm.pageId)
                .then(function (response) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/"+type+"/"+widgetId);
                },function (error) {
                    vm.error="failure";
                })
        }




    }

})();