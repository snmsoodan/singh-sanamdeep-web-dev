(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetHeadingController",WidgetHeadingController)
    function WidgetHeadingController($location,$routeParams,WidgetService) {
        var vm=this;
        vm.userId=$routeParams.userId;
        vm.websiteId=$routeParams.websiteId;
        vm.pageId=$routeParams.pageId;
        vm.widgetId=$routeParams.widgetId;
        vm.deleteWidget=deleteWidget;
        vm.updateWidget=updateWidget;
        
        function init() {
           // vm.widget=WidgetService.findWidgetById(vm.widgetId);
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget=response.data;
                })
        }
        init();

        function updateWidget(widget) {
            // console.log("a")
            // var result=WidgetService.updateWidget(vm.widgetId,widget);
            // if(result){
            //     console.log("b")
            //     $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            // }
            // else{
            //     console.log("c")
            //     vm.error="failure";
            // }
            WidgetService
                .updateWidget(vm.widgetId,widget)
                .then(function (response) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                },function (error) {
                    vm.error="failure";
                })
        }


        function deleteWidget() {
            // console.log(vm.widgetId)
            // var result=WidgetService.deleteWidget(vm.widgetId);
            // if(result){
            //
            //     $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            // }
            // else{
            //
            //     vm.error="failure";
            // }
            console.log(vm.widgetId);
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function (response) {
                    console.log("a")
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                },function (error) {
                    vm.error="failure";
                })
        }

    }

})();