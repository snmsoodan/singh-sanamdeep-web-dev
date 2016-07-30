module.exports=function (app,models) {

    var pageModel=models.pageModel;
    var pages=[
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ]

    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.delete("/api/page/:pageId",deletePage);
    app.put("/api/page/:pageId",updatePage);

    function findAllPagesForWebsite(req,res) {
        var websiteId=req.params.websiteId;
        //var resultset=[];
        // for(var i in pages){
        //     if(pages[i].websiteId===websiteId){
        //         resultset.push(pages[i]);
        //     }
        // }
        // res.json(resultset);
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            },function (error) {
                res.statusCode(404).send(error);
            })
        
        
    }
    
    function createPage(req,res) {
        var newpage=req.body;
        // pages.push(newpage);
        // res.send(200);
        pageModel
            .createPage(newpage)
            .then(function (status) {
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }




    function findPageById(req,res) {
        var pageId=req.params.pageId;
        // for(var i in pages){
        //     if(pages[i]._id===pageId){
        //          res.send(pages[i]);
        //         return;
        //     }
        // }
        // res.send(400);
        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            },function (error) {
                res.statusCode(404).send(error);
            })
        
    }

    function deletePage(req,res) {
        var pageId=req.params.pageId;
        // for (var i in pages) {
        //     if (pages[i]._id===pageId) {
        //         pages.splice(i,1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
        
        pageModel
            .deletePage(pageId)
            .then(function () {
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }

    function updatePage(req,res) {
        var page=req.body;
        var pageId=req.params.pageId;
        // for(var i in pages){
        //     if(pages[i]._id===pageId){
        //         pages[i].name=page.name;
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
        pageModel
            .updatePage(page,pageId)
            .then(function (status) {
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })
        

    }
    
};