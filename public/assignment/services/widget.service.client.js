(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService)


    

    function WidgetService($http) {
        var api={
            findWidgetsForPageId:findWidgetsForPageId,
            createWidget:createWidget,
            deleteWidget:deleteWidget,
            findWidgetById:findWidgetById,
            updateWidget:updateWidget
        };
        return api;
        
        function updateWidget(widgetId, widget) {
            var url="/api/widget/"+widgetId;
            return $http.put(url,widget);
        }

        function findWidgetById(widgetId) {
            // for(var i in widgets){
            //     if(widgets[i]._id===widgetId){
            //         return widgets[i];
            //     }
            // }
            // return null;
            
            var url="/api/widget/"+widgetId;
            return $http.get(url);
        }

        function findWidgetsForPageId(pageId) {
            //return widgets;
            var url="/api/page/"+pageId+"/widget";
            return $http.get(url);
        }
        
        function createWidget(widgetId,type,pageId) {
            if(type==="widget-heading"){
                var newWidget={
                    _id:widgetId,
                    widgetType:"HEADER",
                    pageId:pageId,
                    size:2,
                    text:"Default Text"
                };
              //  widgets.push(newWidget);
                //return type;
                var url="/api/page/"+pageId+"/widget";
                return $http.post(url,newWidget);
            }
            else if(type==="widget-image"){
                console.log(widgetId);
                var newWidget= {
                    _id:widgetId,
                    widgetType:"IMAGE",
                    pageId:pageId,
                    width:"100%",
                    url:"http://lorempixel.com/400/200/",
                    text:"Default Text"
                };
                // widgets.push(newWidget);
                // return type;
                var url="/api/page/"+pageId+"/widget";
                return $http.post(url,newWidget);
            }
            else if(type==="widget-youtube"){

                var newWidget= {
                    _id:widgetId,
                    widgetType:"YOUTUBE",
                    pageId:pageId,
                    width:"100%",
                    url:"https://youtu.be/AM2Ivdi9c4E"
                };
                // widgets.push(newWidget);
                // return type;
                var url="/api/page/"+pageId+"/widget";
                return $http.post(url,newWidget);
            }
            else {
                return null;
            }
            
        }


        function deleteWidget(widgetId) {
            // for(var i in widgets){
            //     if(widgets[i]._id===widgetId){
            //         widgets.splice(i,1);
            //         return true;
            //     }
            // }
            // return null;
            
            var url="/api/widget/"+widgetId;
            return $http.delete(url);
        }
        
    };




})();