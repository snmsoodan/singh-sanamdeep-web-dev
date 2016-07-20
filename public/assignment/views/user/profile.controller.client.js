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
            UserService.updateUser(id,newUser);


        }
        
        function deleteUser() {
            console.log("controller function");
            var id=$routeParams.id;
            var result=UserService.deleteUser(id);
            if(result){
                console.log("controller function end");
                $location.url("/login");
            }
            else{
                console.log("controller failure");
                vm.error("Some error");                
            }
            
        };

    }
})();
