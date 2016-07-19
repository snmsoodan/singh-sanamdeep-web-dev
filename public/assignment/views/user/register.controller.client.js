(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController)


    function RegisterController($location,UserService) {
        var vm=this;
        vm.createUser = createUser;
        console.log("reached register controller");


        function createUser(username,password,verifyPassword) {
            var id=(new Date()).getTime()+"";
            var success=UserService.createUser(id,username,password,verifyPassword);
            if(success){
                $location.url("/user/"+id);
            }
            else{
                $location.url("/register");
            }
        };


    }


})();
