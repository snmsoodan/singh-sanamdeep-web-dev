(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController",ProfileController);
    
    function ProfileController($routeParams,UserService) {
         var vm=this;

        // vm.updateUser=updateUser;
        

        var id=$routeParams.id;
        function init() {
            vm.user=UserService.findUserById(id);
        }
        init();

        function updateUser(newUser) {
            UserService.updateUser(id,newUser);
            // console.log(newUser);
            // users[index].firstname=newUser.firstname;
            // users[index].lastname=newUser.lastname;

        }

    }
})();
