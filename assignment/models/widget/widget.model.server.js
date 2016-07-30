module.exports=function () {
    var mongoose=require("mongoose");
    var WidgetSchema=require("./widget.schema.server")();
    var Widget=mongoose.model("Widget",WidgetSchema);

    var api={
        createWidget:createWidget,
        findAllWidgetsForPage:findAllWidgetsForPage,
        findWidgetById:findWidgetById,
        updateWidget:updateWidget,
        deleteWidget:deleteWidget
    }
    return api;

    function createWidget(widget) {
        return Widget.create(widget);
    }
    
    function findAllWidgetsForPage(pageId){
        return Widget.find({_page:pageId});
    }
    
    function findWidgetById(id){
        return Widget.findById(id);
    }
    
    function updateWidget(type,widget){
        if(widget.type==="HEADER") {
            return Widget
                .update({_id:widget._id},{
                    $set:{
                        text:widget.text,
                        size:widget.size
                    }
                })
        }

        else if(widget.type==="IMAGE") {
            return Widget
                .update({_id:widget._id},{
                    $set:{
                        text :widget.text,
                        width :widget.width,
                        url :widget.url
                    }
                })
        }

        else if(widget.type==="YOUTUBE") {
            return Widget
                .update({_id:widget._id},{
                    $set:{
                        text :widget.text,
                        width :widget.width,
                        url :widget.url
                    }
                })
        }



    }
    
    function deleteWidget(id){
        return Widget.remove({_id:id})
    }

};