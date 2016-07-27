(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);

   


    function WebsiteService($http,$routeParams) {
        var api={
            findWebsiteById:findWebsiteById,
            deleteWebsite:deleteWebsite,
            createWebsite:createWebsite,
            findWebsitesForUserId:findWebsitesForUserId,
            updateWebsite:updateWebsite
        };
        return api;
        
        
        function findWebsitesForUserId(userId) {
           var url="/api/user/"+userId+"/website";
            return $http.get(url);

        }

        function createWebsite(developerId,name,description) {
            var newWebsite={
                _id: (new Date()).getTime()+"",
                name: name,
                description: description,
                developerId: developerId
            };
            // websites.push(newWebsite);
            // return newWebsite;
            var url="/api/user/"+developerId+"/website";
            return $http.post(url,newWebsite);

        }
        function deleteWebsite(websiteId) {
            // for(var i in websites){
            //     if(websites[i]._id===websiteId){
            //         websites.splice(i,1);
            //         return true
            //     }
            // }
            // return false;

            var url="/api/website/"+websiteId;
            return $http.delete(url);


        }

        function findWebsiteById(websiteId) {
            // for(var i in websites){
            //     if(websites[i]._id===websiteId){
            //         return websites[i];
            //     }
            // }
            var url="/api/website/"+websiteId;
            return $http.get(url);
            
        };

        function updateWebsite(websiteId,newWebsite) {
            // for(var i in websites){
            //     if(websites[i]._id===id){
            //         websites[i].name=website.name;
            //         return true;
            //     }
            // }
            // return false;
            console.log("controller");
            console.log(websiteId);
            var url="/api/website/"+websiteId;
             return $http.put(url,newWebsite);


        };
    }


})();
