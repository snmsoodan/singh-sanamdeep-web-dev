(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService)


    var widgets=[
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">If you didn’t grow up in the American Midwest, you’ve probably never truly experienced the fury of a tornado-spewing summer thunderstorm. Storm chaser and wedding photographer <a href="http://www.mikeolbinski.com/" rel="noopener" target="_blank">Mike Olbinski</a> edited 60,000 frames worth of timelapse sequences into this <a href="https://vimeo.com/174312494" rel="noopener" target="_blank">six-minute montage</a> called Vorticity that will leave you with a new respect for Mother Nature.</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ]

    function WidgetService() {
        var api={
            findWidgetsForPageId:findWidgetsForPageId,
            createWidget:createWidget,
            deleteWidget:deleteWidget,
            findWidgetById:findWidgetById,
            updateWidget:updateWidget
        };
        return api;
        
        function updateWidget(widgetId, widget) {
            for(var i in widgets){
                if(widgets[i]._id===widgetId){
                    if(widget.widgetType==="HEADER") {
                        widgets[i].text = widget.text;
                        widgets[i].size = widget.size;
                        return true;
                    }
                    else if(widget.widgetType==="IMAGE") {
                        console.log("image")
                        console.log(widget.url)
                        console.log(widget.widgetType)
                        widgets[i].text = widget.text;
                        widgets[i].width = widget.width;
                        widgets[i].url = widget.url;
                        return true;
                    }
                    else if(widget.widgetType==="YOUTUBE") {
                        widgets[i].text = widget.text;
                        widgets[i].width = widget.width;
                        widgets[i].url = widget.url;
                        return true;
                    }
                    else if(widget.widgetType==="HTML") {
                        widgets[i].text = widget.text;
                        widgets[i].width = widget.width;
                        return true;
                    }
                }
            }
            return null;
        }

        function findWidgetById(widgetId) {
            for(var i in widgets){
                if(widgets[i]._id===widgetId){
                    return widgets[i];
                }
            }
            return null;
        }

        function findWidgetsForPageId(pageId) {
            return widgets;

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
                widgets.push(newWidget);

                return type;
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
                widgets.push(newWidget);
                return type;
            }
            else if(type==="widget-youtube"){

                var newWidget= {
                    _id:widgetId,
                    widgetType:"YOUTUBE",
                    pageId:pageId,
                    width:"100%",
                    url:"https://youtu.be/AM2Ivdi9c4E"
                };
                widgets.push(newWidget);
                return type;
            }
            else {
                return null;
            }
            
        }


        function deleteWidget(widgetId) {
            for(var i in widgets){
                if(widgets[i]._id===widgetId){
                    widgets.splice(i,1);
                    return true;
                }
            }
            return null;
        }
        
    };




})();