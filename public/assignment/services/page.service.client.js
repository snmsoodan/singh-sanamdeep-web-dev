(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService)

    var pages=[
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    function PageService() {
        var api={
            findPageByWebsiteId:findPageByWebsiteId,
            createPage:createPage,
            findPageById:findPageById,
            updatePage:updatePage,
            deletePage:deletePage
        };
        return api;
        
        function findPageByWebsiteId(websiteId) {
            var resultset=[];
            for(var i in pages){
                if(pages[i].websiteId===websiteId){
                    resultset.push(pages[i]);
                }                
            }
            return resultset;
        }
        
        function createPage(websiteId,name,userId) {
            var newPage={
                _id:(new Date()).getTime()+"",
                name:name,
                websiteId:websiteId
            }
            pages.push(newPage);
            return true;
        }


        function findPageById(pageId) {
            for(var i in pages){
                if(pages[i]._id===pageId){
                    return pages[i];
                }
            }
            return null;

        }


        function updatePage(pageId,page) {
            for(var i in pages){
                if(pages[i]._id===pageId){
                    pages[i].name=page.name;
                    return true
                }
            }
            return null;
        }

        function deletePage(pageId) {
            for (var i in pages) {
                if (pages[i]._id===pageId) {
                    pages.splice(i,1);
                    return true;
                }
            }
            return null;
        }


        

    }
})();
