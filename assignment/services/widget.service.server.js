module.exports=function (app,models) {


    var widgetModel=models.widgetModel
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

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

    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.put("/api/widget/:widgetId",updateWidget);
    app.put("/page/:pageId/widget", reorderWidget);

    app.post ("/api/uploads", upload.single('myFile'), uploadImage);

    function reorderWidget(req, res) {
        var pageId = req.params.pageId;
        var start = parseInt(req.query.start);
        var end =  parseInt(req.query.end);
        start = start;
        end = end;
        console.log("service")

        widgetModel
            .reorderWidget( start, end, pageId)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400);
                });
        //             },
        // function (error) {
        //     res.json({});
        // });
    }

    function uploadImage(req, res) {
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        if(myFile == null)
        {
            res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget-image/"+widgetId);
            return;
        }
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        //res.send(200);
        // for(var i in widgets){
        //     if(widgets[i]._id===widgetId){
        //         widgets[i].url="/uploads/"+filename;
        //     }
        // }
        // res.redirect("/assignment/#/user/456/website/456/page/321/widget-image/"+widgetId);

        var newWidget = {
            url: "/uploads/"+filename,
            type:"IMAGE",
            _id:widgetId
        };

        widgetModel
            .updateWidget(newWidget.type, newWidget)
            .then(
                function (stats) {
                    res.redirect("/assignment/#/user/"+ userId+"/website/"+websiteId +"/page/"+pageId+"/widget-image/"+widgetId);
                },
                function (error) {
                    res.statusCode(404).send(error);

                }
            );
    }

    function createWidget(req,res) {
        var pageId=req.params.pageId;
        var newWidget=req.body;
        // widgets.push(newWidget);
        // res.send(200);
        widgetModel
            .createWidget(newWidget)
            .then(function (widget) {
                res.json(widget);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }

    function findAllWidgetsForPage(req,res) {
        //res.send(widgets);
        var pageId=req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }

    function findWidgetById(req,res) {
        var widgetId=req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.send(widget);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }

    function deleteWidget(req,res) {
        var widgetId=req.params.widgetId;
        // for(var i in widgets){
        //     if(widgets[i]._id===widgetId){
        //         widgets.splice(i,1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);

        widgetModel
            .deleteWidget(widgetId)
            .then(function (status) {
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }

    function updateWidget(req,res) {
        console.log("3")
         var widget=req.body;
        var widgetId=req.params.widgetId;
        var widgetType=widget.type;
        console.log(widgetType);
        // for(var i in widgets){
        //     if(widgets[i]._id===widgetId){
        //         if(widget.type==="HEADER") {
        //             widgets[i].text = widget.text;
        //             widgets[i].size = widget.size;
        //             res.send(200);
        //             return;
        //         }
        //         else if(widget.type==="IMAGE") {
        //             console.log("image")
        //             console.log(widget.url)
        //             console.log(widget.widgetType)
        //             widgets[i].text = widget.text;
        //             widgets[i].width = widget.width;
        //             widgets[i].url = widget.url;
        //             res.send(200);
        //             return;
        //         }
        //         else if(widget.type==="YOUTUBE") {
        //             widgets[i].text = widget.text;
        //             widgets[i].width = widget.width;
        //             widgets[i].url = widget.url;
        //             res.send(200);
        //             return;
        //         }
        //         else if(widget.type==="HTML") {
        //             widgets[i].text = widget.text;
        //             widgets[i].width = widget.width;
        //             res.send(200);
        //             return;
        //         }
        //     }
        // }
        // res.send(400);

        widgetModel
            .updateWidget(widgetType,widget)
            .then(function (status) {
                console.log("5")
                res.send(200);
            },function (error) {
                console.log("/5")
                res.statusCode(404).send(error);
            })
        
    }



}