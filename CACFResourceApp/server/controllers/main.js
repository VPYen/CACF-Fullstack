require("../models/models.js");
let upload = require("../fileHandler.js")
let mongoose = require("mongoose");
let bcrypt = require("bcrypt");

// Models
let User = mongoose.model("User");
let Announcement = mongoose.model("Announcement");
let Question = mongoose.model("Question");
let Response = mongoose.model("Response");
let Event = mongoose.model("Event");
let Media = mongoose.model("Media");
let MediaDir = mongoose.model("MediaDir");
let About = mongoose.model("About");


module.exports = {
    index: function(req, res) {
        console.log("Client request index");
        console.log("Client header: ", req.rawHeaders);
        res.json("Error 500 - Internal Server Error");
    },

// User Functions
    loginUser: function(req, res) {
        console.log("Client request loginUser");
        console.log("Client header: ", req.rawHeaders);
        User.findOne({username: req.body.username}, function(err, user){
            if (err){
                console.log("loginUser find error: ", err);
                res.json({error: "User login error."});
            }else if (user == null){
                console.log("loginUser null: ", user);
                console.log("User value: ", user)
                res.json({error: "Invalid login"});
            }else{
                console.log("User value: ", user);
                bcrypt.compare(req.body.password, user.password, function (err, check){
                    if (check){
                        console.log("Login Success: ", check);
                        res.json({success: "Login Successful", user: user});
                    }else{
                        console.log("Login Failed: ", err);
                        res.json({error: "Invalid Login"});
                    }
                });

            }
        });
    },

    newUser: function(req, res) {
        console.log("Client request newUser");
        console.log("Client header: ", req.rawHeaders);
        if (req.body.key !== "xaWSU2023"){
            console.log("newUser incorrect secret key");
            console.log("Req.Body Key: ", req.body.key);
            res.json({error: "Permission denied. Invalid key"})
        }else{
            User.findOne({username: req.body.username}, function(err, user){
                if(user){
                  console.log("newUser error: User exists\n", "Request Body:", req.body, "\nUser From DB: ", user);
                  res.json({error:"User exists"});
                }else if (err){
                    console.log("newUser error: ", err);
                    res.json({error:"Error occured while adding new user"});
                }
                else{
                    if (Object.keys(req.body).length > 0){
                        if (req.body.password.length < 8) {
                            res.json({message: "New User error", error: "Password must be at least 8 characters in length"});
                        }else{
                            bcrypt.hash(req.body.password, 10, function(err, hashedPass){
                                if(err) {
                                    console.log("newUser bcrypt error: ", err);
                                    res.json({error:"An Error Occurred While Creating an Account"});
                                }else {
                                    var user = new User();
                                    user.username = req.body.username;
                                    user.password = hashedPass;
                                    user.save(function(err) {
                                        if(err) {
                                            console.log("newUser error ", err);
                                            console.log("User: ",user);
                                            res.json({error: "Unable to create new user"});
                                            }else {
                                                console.log("newUser success");
                                                res.json({success: "Registration successful", user: user})
                                            }
                                    });
                                }
                            });
                        }
                    }else {
                        console.log("newUser error no request body provided ");
                        res.json({error: "An Error Occurred While Creating an Account"})
                    }
                }
            });
        }
    },

    checkToken: function(req, res) {
        console.log("Client header: ", req.rawHeaders);
        User.findOne({username: req.body.username}, function(err, user){
            console.log(user);
            if (err){
                console.log("checkToken find error: ", err);
                res.json({error: "Token error."});
            }else if (user == null){
                console.log("checkToken null: ", user);
                console.log("User value: ", user)
                res.json({error: "Invalid login"});
            }else{
                if (req.body.password === user.password){
                    console.log("checkToken success");
                    res.json({success: "Token validated successfully"});
                }else{
                    console.log("checkToken fail");
                    res.json({success: "Invalid token value, user is not authenticated"});
                }
            }
        });
    },

// Announcement Functions
    getOneAnnouncement: function(req, res) {
        console.log("Client request getOneAnnouncement");
        console.log("Client header: ", req.rawHeaders);
        Announcement.findOne({_id: req.params.announceID}, function(err, announcement){
            if(err){
                console.log("getOneAnnouncement error: ", err);
                res.json({error: "Find announcement error"});
            }else if(announcement == null){
                console.log("getOneAnnouncement null: ", announcement);
                res.json({error: "Unable to find announcement"});
            }else{
                console.log("getOneAnnouncement success");
                res.json({message: "Get announcement success", announcement: announcement})
            }
        });
    },

    getAllAnnouncements: function(req, res) {
        console.log("Client request getAllAnnouncements");
        console.log("Client header: ", req.rawHeaders);
        Announcement.find({}).sort({"updatedAt": -1}).exec(function(err, announcements){
            if(err){
                console.log("getAllAnnouncements error: ", err);
                res.json({error: "Find announcement error"});
            }else if(announcements == null){
                console.log("getAllAnnouncements null: ", announcements);
                res.json({error: "Unable to find announcements"});
            }else{
                console.log("getAllAnnouncements success");
                res.json({message: "Get all announcements success", announcements: announcements})
            }
        });
    },

    newAnnouncement: function(req, res) {
        console.log("Client request newAnnouncement");
        console.log("Client header: ", req.rawHeaders);
        let announcement = new Announcement();
        announcement.subject = req.body.subject;
        announcement.description = req.body.description;
        announcement.save(function(err){
            if (err){
                console.log("newAnnouncement error: ", err);
                console.log("Announcement value: ", announcement);
                res.json({error: "Unable to create announcement"});
            }else{
                console.log("newAnnouncement success");
                res.json({message: "New announcement success", announcement: announcement});
            }
        });
    },

    editAnnouncement: function(req, res) {
        console.log("Client request editAnnouncement");
        console.log("Client header: ", req.rawHeaders);
        Announcement.findById(req.params.announceID, function(err, announcement){
            if (err){
                console.log("editAnnouncement error: ", err);
                res.json({error: "Edit announcement error"});
            }else if (announcement == null){
                console.log("editAnnouncement null error: ", announcement);
                res.json({error: "Edit announcement error"});
            }else{
                announcement.subject = req.body.subject;
                announcement.description = req.body.description;
                announcement.save(function(err){
                    if (err){
                        console.log("editAnnouncement save error: ", err);
                        res.json({error: "Edit announcement error"});
                    }else{
                        console.log("editAnnouncement success");
                        res.json({message: "Edit announcement success"});
                    }
                });
            }
        });
    },

    deleteAnnouncement: function(req, res){
        console.log("Client request deleteAnnouncement");
        console.log("Client header: ", req.rawHeaders);
        Announcement.findByIdAndDelete(req.params.announceID, function(err){
            if (err){
                console.log("deleteAnnouncement error: ", err);
                res.json({error: "Error deleting announcement"});
            }else{
                console.log("deleteAnnouncement success");
                res.json({message: "Announcement deleted successfully"});
            }
        })
    },

// Event Functions
    getOneEvent: function(req, res) {
        console.log("Client request getOneEvent");
        console.log("Client header: ", req.rawHeaders);
        Event.findOne({_id: req.params.eventID}).populate("questions").populate("responses").exec(function(err, event){
            if (err){
                console.log("getOneEvent error: ", err);
                res.json({error: "Unable to get event"})
            }else if(event == null){
                console.log("getOneEvent error: ", err);
                res.json({error: "Unable to find event"})
            }
            else{
                console.log("getOneEvent success");
                res.json({message: "Get event success", event: event});
            }
        });
    },

    getAllEvents: function(req, res) {
        console.log("Client request getAllEvents");
        console.log("Client header: ", req.rawHeaders);
        Event.find({}).sort({"updatedAt":-1}).populate("questions").populate({path:"questions", populate: {path: "responses", model:"Response"}}).exec(function(err, events){
            if (err){
                console.log("getAllEvents find error: ", err);
                res.json({error: "Unable to get all events"});
            }else if(events == null){
                console.log("getAllEvents null error: ", events);
                res.json({error: "Unable to get all events"});
            }
            else{
                console.log("getAllEvents success");
                res.json({message: "Get all events success", events: events});
            }
        });
    },

    newEvent: function(req, res){
        console.log("Client request newEvent");
        console.log("Client header: ", req.rawHeaders);
        let event = new Event();
        event.title = req.body.title;
        event.description = req.body.description;
        event.save(function(err) {
            if (err){
                console.log("newEventTest error: ", err);
                res.json({error: "Error creating new event"});
            }else{
                console.log("newEventTest success");
                res.json({message: "Event created successfully"});
            }
        });
    },

    editEvent: function(req, res) {
        console.log("Client request editEvent");
        console.log("Client header: ", req.rawHeaders);
        Event.findById(req.params.eventID, function(err, event) {
            if (err){
                console.log("editEvent find error: ", err);
                res.json({error: "Error finding event"});
            }else if (event == null){
                console.log("editEvent null error: ", event);
                res.json({error: "Error finding event"});
            }else{
                event.title = req.body.title;
                event.description = req.body.description;
                event.save(function (err){
                    if (err){
                        console.log("editEvent save error: ", err);
                        res.json({error: "Error editing event"});
                    }else{
                        console.log("editEvent success");
                        res.json({message: "Event edited successfully"});
                    }
                });
            }
        });
    },

    deleteEvent: function(req, res){
        console.log("Client request deleteEvent");
        console.log("Client header: ", req.rawHeaders);
        Event.findByIdAndDelete(req.params.eventID, function(err){
            if (err){
                console.log("deleteEvent error: ", err);
                res.json({error: "Error deleting event"});
            }else{
                console.log("deleteEvent success");
                res.json({message: "Event deleted successfully"});
            }
        })
    },

// Question Functions
    getQuestion: function(req, res){
        console.log("Client request getQuestion");
        console.log("Client header: ", req.rawHeaders);
        Question.findById(req.params.questionID).populate("responses").exec(function(err, question){
            if (err){
                console.log("getQuestion find error: ", err);
                res.json({error: "Error finding question"});
            }else if (question == null){
                console.log("getQuestion null error: ", question);
                res.json({error: "Error finding question"}); 
            }else{
                console.log("getQuestion success");
                res.json({message: "Get question success", question: question});
            }
        });  
    },

    addQuestion: function(req, res) {
        console.log("Client request addQuestion");
        console.log("Client header: ", req.rawHeaders);
        Event.findById(req.params.eventID, function(err, event) {
            if (err){
                console.log("addEventQuestion find error: ", err);
                res.json({error: "Error finding event to add question"});
            }else if (event == null){
                console.log("addEventQuestion null error: ", event);
                res.json({error: "Error finding event to add question"});
            }else{
                let question = new Question({question: req.body.question});
                question.save(function(err){
                    if (err){
                        console.log("addEventQuestion save question error: ", err);
                        res.json({error: "Error adding question to event"});
                    }else{
                        console.log("addEventQuestion save question success");
                        event.questions.push(question);
                        event.save(function(err){
                            if (err){
                                console.log("addEventQuestion save event error: ", err);
                                res.json({error: "Error saving question to event"});
                            }else{
                                console.log("addEventQuestion save event success");
                                res.json({message: "Event question added successfully"});
                            }
                        });
                    }
                });

            }
        })
    },
    
    editQuestion: function(req, res) {
        console.log("Client request editQuestion");
        console.log("Client header: ", req.rawHeaders);
        Question.findById(req.params.questionID, function(err, question) {
            if (err){
                console.log("editQuestion find error: ", err);
                res.json({error: "Error finding question"});
            }else if (question == null){
                console.log("editQuestion null error: ", question);
                res.json({error: "Error finding question"});
            }else{
                question.question = req.body.question;
                question.save(function (err){
                    if (err){
                        console.log("editQuestion save error: ", err);
                        res.json({error: "Error editing question"});
                    }else{
                        console.log("editQuestion success");
                        res.json({message: "Question edited successfully"});
                    }
                });
            }
        });
    },

    deleteQuestion: function(req, res){
        console.log("Client request deleteQuestion");
        console.log("Client header: ", req.rawHeaders);
        Question.findByIdAndDelete(req.params.questionID, function(err){
            if (err){
                console.log("deleteQuestion error: ", err);
                res.json({error: "Error deleting question"});
            }else{
                console.log("deleteQuestion success");
                res.json({message: "Question deleted successfully"});
            }
        })
    },

// Response Function
    addResponse: function(req, res) {
        console.log("Client request addResponse");
        console.log("Client header: ", req.rawHeaders);
        Question.findById(req.params.questionID, function(err, question){
            if (err){
                console.log("addResponse find error: ", err);
                res.json({error: "Error finding question"});
            }else if (question == null){
                console.log("addResponse null error: ", question);
                res.json({error: "Error finding question"});
            }else{
                let response = new Response({
                    name: req.body.name, 
                    answer: req.body.answer
                });
                response.save(function(err){
                    if (err){
                        console.log("addResponse save response error: ", err);
                        res.json({error: "Error adding response to question"});
                    }else{
                        console.log("addResponse save response success");
                        question.responses.push(response);
                        question.save(function(err){
                            if (err){
                                console.log("addResponse save question error: ", err);
                                res.json({error: "Error saving response to question"});
                            }else{
                                console.log("addEventQuestion save question success");
                                res.json({success: "Response added successfully to question"});
                            }
                        });
                    }
                });
                
            }
        });
    },

// Media Functions
    getOneMediaDir: function(req, res) {
        console.log("Client header: ", req.rawHeaders);
        // MediaDir.findOne({_id: req.params.mediaDirID}, function(err, mediaDir){
        //     if (err){
        //         console.log("getOneMediaDir find error: ", err);
        //         res.json({error: "Unable to get media directory"})
        //     }else if (mediaDir == null){
        //         console.log("getOneMediaDir null error: ", mediaDir);
        //         res.json({error: "Unable to get media directory"})
        //     }
        //     else{
        //         console.log("getOneMediaDir success");
        //         res.json({message: "Get media directory success", mediaDir: mediaDir});
        //     }
        // });
    },

    getAllMediaDir: function(req, res) {
        console.log("Client header: ", req.rawHeaders);
        // MediaDir.find({}, function(err, mediaDirs){
        //     if (err){
        //         console.log("getAllMediaDir error: ", err);
        //         res.json({error: "Unable to get all media directories"});
        //     }else if(mediaDirs == null){
        //         console.log("getAllMediaDir null error: ", mediaDirs);
        //         res.json({error: "Unable to get all media directories"}); 
        //     }
        //     else{
        //         console.log("getAllMediaDir success");
        //         res.json({message: "Get all media directories success", mediaDirs: mediaDirs});
        //     }
        // });
    },

    newMediaDir: function(req, res) {
        console.log("Client header: ", req.rawHeaders);
        // let mediaDir = new MediaDir();
        // mediaDir.name = req.body.name;
        // mediaDir.save(function(err){
        //     if (err){
        //         console.log("newMediaDir error: ", err);
        //         res.json({error: "Error creating new media directory"});
        //     }else{
        //         console.log("newMediaDir success");
        //         res.json({message:"New media directory success"});
        //     }
        // })
    },

    editMediaDir: function(req, res) {
        console.log("Client header: ", req.rawHeaders);
        // MediaDir.findOneAndUpdate({_id: req.params.mediaDirID}, {name: req.body.name}, function(err){
        //     if (err){
        //         console.log("editMediaDir error: ", err);
        //         res.json({error: "Edit media directory error"});
        //     }else{
        //         console.log("editMediaDir success");
        //         res.json({message: "Edit media directory success"});
        //     }
        // })
    },

    addMedia: function(req, res){
        // console.log(req.file)
        console.log("Client header: ", req.rawHeaders);
        // MediaDir.findOne({_id: req.params.mediaDirID}, function(err, mediaDir){
        //     if (err) {
        //         console.log("addMedia find error: ", err);
        //         res.json({error: "Error adding new media"});
        //     }else if (mediaDir == null){
        //         console.log("addMedia find null: ", mediaDir);
        //         res.json({error: "Unable to find media directory"});
        //     }else{
        //         for (let i = 0; i < req.body.media.length; i++){
        //             mediaDir.directory.push(req.body.media[i]);
        //         }
        //         mediaDir.save(function(err){
        //             if(err) {
        //                 console.log("addMedia save error: ", err);
        //                 res.json({error: "Error adding new media"});
        //             }else{
        //                 console.log("addMedia success");
        //                 res.json({error: "Media added successfully"});
        //             }
        //         })
        //     }
        // })
    },

// About Functions
    getOneAbout: function(req, res) {
        console.log("Client header: ", req.rawHeaders);
        res.json({message:"pinged getOneAbouts"});
        // About.findOne({_id: req.params.aboutID}, function(err, about){
        //     if (err){
        //         console.log("getOneAbout error: ", err);
        //         res.json({error:"Unable to get about profile"});
        //     }else if(about == null){
        //         console.log("getOneAbout null error: ", about);
        //         res.json({error:"Unable to get about profile"});
        //     }
        //     else{
        //         console.log("getOneAbout success");
        //         res.json({message:"Get about profile success", about: about});
        //     }
        // })
    },

    getAllAbouts: function(req, res) {
        console.log("Client header: ", req.rawHeaders);
        res.json({message:"pinged getAllAbouts"});
        // About.find({}, function(err, abouts){
        //     if (err){
        //         console.log("getAllAbouts find error: ", err);
        //         res.json({error: "Unable to get all about profiles"});
        //     }else if(abouts == null){
        //         console.log("getAllAbouts null error: ", abouts);
        //         res.json({error: "Unable to get all about profiles"});
        //     }
        //     else{
        //         console.log("getAllAbouts success");
        //         res.json({message: "Get all about profiles success", abouts: abouts})
        //     }
        // });
    },

    newAbout: function(req, res) {
        console.log("Client header: ", req.rawHeaders);
        res.json({message:"pinged newAbout"});
        // let about = new About();
        // about.name = req.body.name;
        // about.description = req.body.description;
        // about.save(function(err){
        //     if (err){
        //         console.log("newAbout error: ", err);
        //         res.json({error: "Unable to create new about profile"});
        //     }else{
        //         console.log("newAbout success");
        //         res.json({message: "About profile creation success"});
        //     }
        // });
    },

    editAbout: function(req, res) {
        console.log("Client header: ", req.rawHeaders);
        res.json({message:"pinged editAbout"});
        // About.findOneAndUpdate({_id: req.params.aboutID}, {name: req.body.name, description: req.body.description}, function(err){
        //     if (err){
        //         console.log("editAbout error: ", err);
        //         res.json({error: "Unable to edit about profile"});
        //     }else{
        //         console.log("editAbout success");
        //         res.json({message: "About profile edit success"});
        //     }
        // });
    },

    editPicAbout: function(req, res) {
        console.log("Client header: ", req.rawHeaders);
        res.json({message:"pinged editPicAbout"});
        // About.findOne({_id: req.params.aboutID}, function(err, about){
        //     if (err){
        //         console.log("editPicAbout find error: ", err);
        //         res.json({error: "Unable to add picture to profile"});
        //     }else if (about == null){
        //         console.log("editPicAbout null error: ", about);
        //         res.json({error: "Unable to add picture to profile"});
        //     }else{
        //         about.picture = req.body.picture;
        //         about.save(function(err){
        //             if (err){
        //                 console.log("editPicAbout save error: ", err);
        //                 res.json({error: "Unable to add picture to profile"});
        //             }else{
        //                 console.log("editPicAbout success");
        //                 res.json({error: "Picture added successfuly to about profile"});
        //             }
        //         });
        //     }
        // });
    }

}