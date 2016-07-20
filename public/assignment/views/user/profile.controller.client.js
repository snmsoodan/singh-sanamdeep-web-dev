(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController",ProfileController);
    
    function ProfileController($location,$routeParams,UserService) {
         var vm=this;
        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;

        var id=$routeParams.id;
        function init() {
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user=response.data;
                })
        }
        init();

        function updateUser(newUser) {
            UserService
                .updateUser(id,newUser)
                .then(
                    function (response) {
                        vm.success="updated successfully";
                    },
                    function (error) {
                        vm.error="unable to update user";
                    });
        }
        
        function deleteUser() {
            var id=$routeParams.id;
            UserService
                .deleteUser(id)
                .then(
                function () {
                    $location.url("/login");
            },
            function (error) {
                vm.error="unable to update user";
            })
        };

    }
})();
