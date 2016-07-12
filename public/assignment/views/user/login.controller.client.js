(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController)


    function LoginController($location) {
         var vm=this;
        var users=[
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ]
         vm.login=function (username,password) {
            for(var i in users){
                if(users[i].username===username&& users[i].password===password){
                    $location.url("/profile/"+users[i]._id);

                }
                else{
                    vm.error="Users not found";
                }
            }
        }
    }
})();