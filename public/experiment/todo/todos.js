(function () {
    angular.module("MyDirectives",[])
        .directive("todos",todos);

    function todos() {
        return{
            template:"These are my todos"
        }
    }

})();
