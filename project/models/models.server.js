module.exports=function () {

    // var mongoose = require('mongoose');
    // mongoose.connect('mongodb://localhost/cs5610summer1');

    var models={
        userModel:require("./user/user.model.server")(),
        movieModel:require("./movie/movie.model.server")(),
        likeModel:require("./like/like.model.server")(),
        reviewModel:require("./review/review.model.server")(),
        followModel:require("./follow/follow.model.server")()
        //TODO:add all the other models:websteModel,pageModel...
    };
    

    return models;
};