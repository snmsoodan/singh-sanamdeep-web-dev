(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController)
    function WidgetListController($sce,$routeParams,WidgetService) {
        var vm=this;
        vm.userId=$routeParams.userId;
        vm.websiteId=$routeParams.websiteId;
        vm.pageId=$routeParams.pageId;
        vm.getSafeHtml=getSafeHtml;
        vm.getSafeUrl=getSafeUrl;
        vm.reorderWidget=reorderWidget;

        

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);

        }
        function getSafeUrl(widget) {
            var urlParts=widget.url.split("/");
            var id=urlParts[urlParts.length -1];
            var url="https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);

        }

        function init(){

           // vm.widgets=WidgetService.findWidgetsForPageId(vm.pageId);
            WidgetService
                .findWidgetsForPageId(vm.pageId)
                .then(function (response) {
                    vm.widgets=response.data;
                    // $(".container")
                    //     .sortable({axis:"y"});
                })

        }
        init();

        function reorderWidget(start, end) {
            console.log("contr")
            console.log(start+ "  " + end);
            WidgetService
                .reorderWidget(vm.pageId, start, end)
                .then(
                    function (response) {
                        init();
                    },
                    function (error) {
                        console.log("/re")
                        vm.error = "Widgets could not be reordered";
                    });

        }





    }

})();