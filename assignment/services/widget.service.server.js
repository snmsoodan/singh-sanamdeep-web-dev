module.exports=function (app) {


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

    app.post ("/api/uploads", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        //res.send(200);
        for(var i in widgets){
            if(widgets[i]._id===widgetId){
                widgets[i].url="/uploads/"+filename;
            }
        }

        res.redirect("/assignment/#/user/456/website/456/page/321/widget-image/"+widgetId);
    }

    function createWidget(req,res) {
        var pageId=req.params.pageId;
        var newWidget=req.body;
        widgets.push(newWidget);
        res.send(200);
    }

    function findAllWidgetsForPage(req,res) {
        console.log("a")
        res.send(widgets);
    }

    function findWidgetById(req,res) {
        var widgetId=req.params.widgetId;
        for(var i in widgets){
            if(widgets[i]._id===widgetId){
                res.send(widgets[i]);
                return;
            }
        }
        res.send(400);
    }

    function deleteWidget(req,res) {
        var widgetId=req.params.widgetId;
        for(var i in widgets){
            if(widgets[i]._id===widgetId){
                widgets.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function updateWidget(req,res) {
         var widget=req.body;
        var widgetId=req.params.widgetId;
        for(var i in widgets){
            if(widgets[i]._id===widgetId){
                if(widget.widgetType==="HEADER") {
                    widgets[i].text = widget.text;
                    widgets[i].size = widget.size;
                    res.send(200);
                    return;
                }
                else if(widget.widgetType==="IMAGE") {
                    console.log("image")
                    console.log(widget.url)
                    console.log(widget.widgetType)
                    widgets[i].text = widget.text;
                    widgets[i].width = widget.width;
                    widgets[i].url = widget.url;
                    res.send(200);
                    return;
                }
                else if(widget.widgetType==="YOUTUBE") {
                    widgets[i].text = widget.text;
                    widgets[i].width = widget.width;
                    widgets[i].url = widget.url;
                    res.send(200);
                    return;
                }
                else if(widget.widgetType==="HTML") {
                    widgets[i].text = widget.text;
                    widgets[i].width = widget.width;
                    res.send(200);
                    return;
                }
            }
        }
        res.send(400);
        
    }



}