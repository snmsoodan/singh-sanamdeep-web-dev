(function () {
    angular
        .module("WebAppMaker")
        .factory("ReviewService",ReviewService)

    function ReviewService($http) {

        var api = {
            reviewCreate: reviewCreate,
            getReview:getReview,
            updateReview:updateReview,
            deleteReview:deleteReview,
            getAllReviews:getAllReviews,
            findAllReviewsByUserId:findAllReviewsByUserId

        };
        return api;


        function findAllReviewsByUserId(userId) {
            console.log(userId);
            var url="/api/findReviews/"+userId;
            return $http.get(url);
        }
        
        function reviewCreate(review) {
            console.log("review create client")
            var url="/api/review/create"
            return $http.post(url,review);
        }

        function getReview(userId,titleId) {
            console.log("review get client")
            var url="/api/review/user/"+userId+"/title/"+titleId;
            return $http.get(url);
        }


        function getAllReviews(titleId) {
            console.log("review get client")
            var url="/api/review/getAll/"+titleId;
            return $http.get(url);
        }
        
        function updateReview(userId,titleId,review) {
            console.log("review update client")
            var url="/api/review/user/"+userId+"/title/"+titleId;
            return $http.put(url,review);
        }

        function deleteReview(userId,titleId) {
            console.log("review delete client")
            var url="/api/review/user/"+userId+"/title/"+titleId;
            return $http.delete(url);
        }


    }

})();
