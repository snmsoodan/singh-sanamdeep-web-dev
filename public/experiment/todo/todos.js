(function () {
    angular.module("MyDirectives",[])
        .directive("todos",todos);

    function todos() {
        function linker(scope, element,attributes) {
            var data =scope.data;
            var myscope=scope;
            var startindex=-1;
            var endindex=1;
            $(element).find("tbody")
                .sortable({axis:'y',
                start:function (event,ui) {
                    console.log("sorting started")
                    console.log(event);
                    console.log(ui.item.index());
                    startindex=ui.item.index();
                },
                    stop:function (event,ui) {
                        console.log("sorting stopped");
                        endindex=ui.item.index();
                        console.log(myscope);
                        console.log([startindex,endindex]);
                        myscope.callback({start:startindex,end:endindex});
                        var reorderedElement=myscope.data.splice(startindex,1);
                        console.log(reorderedElement);
                        myscope.data.splice(endindex,0,reorderedElement);
                        myscope.$apply();
                    }
                });
        }
            return {
                //template:"These are my todos"
                templateUrl: "todos.html",
                scope: {
                    //   data:"=data"
                    data: "=",
                    callback:"&"
                },
                link: linker
            }

    }
})();
