var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports=function (app,models) {

    var userModel=models.userModel;

    var users=[
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];


    app.post("/api/user",createUser);
    app.post("/api/login",passport.authenticate('local'),login);
    app.post("/api/logout",logout);
    app.post("/api/register",register);
    app.get("/api/loggedIn",loggedIn);
    app.get("/api/user",getUsers);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function loggedIn(req,res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        }else{
            res.send('0');
        }
    }

    function register(req,res) {
        var username=req.body.username;
        var password=req.body.password;

        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user){
                    res.status(400).send("username already used");
                    return;
                }
                else{
                    req.body.password = bcrypt.hashSync(req.body.password);
                     userModel
                        .createUser(req.body)
                       .then(function (user) {
                            if(user){
                                req.login(user,function (err) {
                                    if(err){
                                        res.status(400).send(err);
                                    }
                                    else{
                                        res.json(user);
                                    }
                                });
                            }
                       },function (err) {
                           res.status(400).send(err);
                       })
                }
            },function (err) {
                res.status(400).send(err);
            })
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user && bcrypt.compareSync(password, user.password)){
                    done(null,user);
                }else{
                    done(null,false);
                }
            },function (error) {
                done(err);
            })
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function logout(req,res) {
        req.logOut();
        res.send(200);
    }
    function login(req,res) {
        var user=req.user;
        res.json(user);
    }

    function deleteUser(req,res) {
        var id=req.params.userId;

        userModel
            .deleteUser(id)
            .then(function (stat) {
                console.log(stat);
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })

        // for(var i in users){
        //     if(users[i]._id===id){
        //         users.splice(i,1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }

    function createUser(req,res) {
        var user=req.body;
        console.log(user);

        userModel
            .createUser(user)
            .then(function (user) {
                console.log(user);
                res.json(user);
        },function (error) {
                res.statusCode(400).send(error);
            })

        // user._id=(new Date()).getTime()+"";
        // users.push(user);
        // res.send(user);
    }

    function updateUser(req,res) {
        var id=req.params.userId;
        var newUser=req.body;

        userModel
            .updateUser(id,newUser)
            .then(function (status) {
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })

        // for(var i in users){
        //     if(users[i]._id===id){
        //         users[i].firstName=newUser.firstName;
        //         users[i].lastName=newUser.lastName;
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }

    function findUserById(req,res) {
        //console.log("a")
        var id=req.params.userId;
        console.log(req.session.currentUser);
        userModel
            .findUserById(id)
            .then(function (user) {
                res.send(user);
            },function (error) {
                res.statusCode(404).send(error);
            })
        
        // for(var i in users){
        //     if(users[i]._id===id){
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send(403);
    }

    function getUsers(req,res) {
        var username=req.query.username;
        var password=req.query.password;
        if(username&&password){
            findUserByCredentials(username,password,req,res);
        }else if(username){
            findUserByUsername(username,res);
        }else{
            res.send(users);
        }
    }

    function findUserByCredentials(username,password,req,res) {

        userModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                console.log(req.session);
                req.session.currentUser=user;

                res.json(user);
            },function (error) {
                res.statusCode(404).send(error);
            })

        // for(var i in users){
        //     if(users[i].username===username&&users[i].password===password){
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send(403);

    }

    function findUserByUsername(username,res) {
        
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            },function (error) {
                res.statusCode(404).send(error);
            })
        
        // for(var i in users){
        //     if(users[i].username===username){
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send({})

    }

};