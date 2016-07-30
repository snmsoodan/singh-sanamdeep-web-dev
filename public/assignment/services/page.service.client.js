(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService)



    function PageService($http) {
        var api={
            findPageByWebsiteId:findPageByWebsiteId,
            createPage:createPage,
            findPageById:findPageById,
            updatePage:updatePage,
            deletePage:deletePage
        };
        return api;
        
        function findPageByWebsiteId(websiteId) {
            // var resultset=[];
            // for(var i in pages){
            //     if(pages[i].websiteId===websiteId){
            //         resultset.push(pages[i]);
            //     }
            // }
            // return resultset;
            console.log("service");
            console.log(websiteId);
            var url="/api/website/"+websiteId+"/page";
            console.log(url);
            return $http.get(url);

        }
        
        function createPage(websiteId,name,userId) {
            var newPage={
               // _id:(new Date()).getTime()+"",
                name:name,
                _website:websiteId
            }
            // pages.push(newPage);
            // return true;

            var url="/api/website/"+websiteId+"/page";
            return $http.post(url,newPage);
        }


        function findPageById(pageId) {
            // for(var i in pages){
            //     if(pages[i]._id===pageId){
            //         return pages[i];
            //     }
            // }
            // return null;

            var url="/api/page/"+pageId;
            return $http.get(url);

        }


        function updatePage(pageId,page) {
            // for(var i in pages){
            //     if(pages[i]._id===pageId){
            //         pages[i].name=page.name;
            //         return true
            //     }
            // }
            // return null;
            
            var url="/api/page/"+pageId;
            return $http.put(url,page);
        }

        function deletePage(pageId) {
            // for (var i in pages) {
            //     if (pages[i]._id===pageId) {
            //         pages.splice(i,1);
            //         return true;
            //     }
            // }
            // return null;
            
            var url="/api/page/"+pageId;
            return $http.delete(url);
            
        }


        

    }
})();
