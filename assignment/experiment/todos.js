module.exports=function (app) {
    var mongoose=require("mongoose");
    var TodoSchema=mongoose.Schema({
        priority:Number,
        title:String,
        todo:String
    });
    var Todo= mongoose.model("Todo",TodoSchema);
    app.get("/api/todos",findAllTodos);
    function findAllTodos(req,res) {
        Todo.find()
            .then(function (todos) {
                res.json(todos);
            });
    }
    
    // Todo.create({"priority":1,"title":"CS5610","todo":"Teach angular directives"});
    // Todo.create({"priority":2,"title":"CS200","todo":"Learn angular directives"});
    // Todo.create({"priority":3,"title":"CS1100","todo":" directives"});
    // Todo.create({"priority":4,"title":"CS6610","todo":"Teach angular directives"});
    // Todo.create({"priority":5,"title":"CS700","todo":"Learn angular directives"});
    // Todo.create({"priority":6,"title":"CS8100","todo":" directives"});
} 