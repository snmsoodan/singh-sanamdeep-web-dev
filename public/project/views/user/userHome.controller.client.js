(function () {
    angular
        .module("WebAppMaker")
        .controller("UserHomeController",UserHomeController);

    function UserHomeController(MovieService, $location, $routeParams) {
    // function UserHomeController(YelpService, $location, $routeParams, $window) {
        var vm = this;

        vm.userId = $routeParams.userId;
// vm.userId = $routeParams.userId;

        // function init() {
        //     var food = $window.sessionStorage.getItem("Food");
        //     var location = $window.sessionStorage.getItem("Location");
        //     if(food){
        //         findRestaurant(food, location);
        //     }
        // }
        //     init();

        vm.findMovie = findMovie;
        // vm.findRestaurantById = findRestaurantById;

        function findMovie(searchMovie) {
            console.log(searchMovie);
            MovieService
                .findMovie(searchMovie)
                .then(function (response) {
                    if(response.data != null) {
                        console.log("data found controller");
                        console.log(response.data);
                        vm.movies = response.data;
                        // $window.sessionStorage.setItem("Food", searchFood);
                        // $window.sessionStorage.setItem("Location", searchLocation);
                        vm.nameExist = true;
                    }else{
                        vm.nameExist = false;
                    }

                }, function (error) {
                    vm.error = "Incorrect values for search";
                });
        }


        // function findRestaurantById(id) {
        //     console.log(id);
        //     console.log("client rest by id");
        //     YelpService
        //         .findRestaurantById(id)
        //         .then(
        //             function (response) {
        //                 console.log("got rest by id");
        //                 vm.restaurant = response.data;
        //                 console.log(response.data);
        //                 $location.url("/user/" + vm.userId + "/restaurant/" + id);
        //             }, function (error) {
        //                 console.log(error);
        //                 vm.error = error;
        //             }
        //         );
        // }

    }
})();

