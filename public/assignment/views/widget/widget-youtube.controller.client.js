(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetYoutubeController",WidgetYoutubeController)

    function WidgetYoutubeController($location,$routeParams,WidgetService){
        var vm=this;
        vm.userId=$routeParams.userId;
        vm.websiteId=$routeParams.websiteId;
        vm.pageId=$routeParams.pageId;
        vm.widgetId=$routeParams.widgetId;
        vm.deleteWidget=deleteWidget;
        vm.updateWidget=updateWidget;
        
        function init() {
            vm.widget=WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function updateWidget(widget) {
            
            var result=WidgetService.updateWidget(vm.widgetId,widget);
            if(result){
                
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }
            else{
              
                vm.error="failure";
            }
        }


        function deleteWidget() {
            
            var result=WidgetService.deleteWidget(vm.widgetId);
            if(result){
                
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }
            else{
            
                vm.error="failure";
            }
        }

    }

})();