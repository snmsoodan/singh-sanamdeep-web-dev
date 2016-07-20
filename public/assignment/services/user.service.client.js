(function () {
  angular
      .module("WebAppMaker")
      .factory("UserService",UserService);




    function UserService($http) {

        var api= {
            deleteUser:deleteUser,
            createUser:createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById:findUserById,
            updateUser:updateUser
        };
        return api;

        function updateUser(id, newUser) {
            for(var i in users){
                if(users[i]._id===id){
                    users[i].firstName=newUser.firstName;
                    users[i].lastName=newUser.lastName;
                    return true;
                }
            }
            return false;
        }

        function findUserById(id) {
           var url="/api/user/"+id;
            return $http.get(url);
        }

        function findUserByCredentials(username,password){
            var url="/api/user?username="+username+"&password="+password;
            return $http.get(url);

        }

        function createUser(username,password,verifyPassword) {
            if(password===verifyPassword){
                var newUser= {
                    username:username,
                    password:password,
                    firstName:username,
                    lastName:username
                };

                return $http.post("/api/user/",newUser);
            }
            else{
                return null;
            }

        }

        function deleteUser(id) {
            console.log(id);
            for(var i in users){
                if(users[i]._id===id){
                    users.splice(i,1);
                    return true;
                }
            }
            return null;
        }

    }
})();