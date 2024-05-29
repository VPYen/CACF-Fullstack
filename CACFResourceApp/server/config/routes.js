const main = require("../controllers/main.js");
let baseURL = "/api";

module.exports = function(app){
// Home
    app.get(baseURL + "/", function(req, res) {
        main.index(req, res);
    });

// Users
    // Login
    app.post(baseURL + "/user/login", function(req, res) {
        main.loginUser(req, res);
    });

    // Register
    app.post(baseURL + "/user/new", function(req, res){
        main.newUser(req, res);
    });

    // Check Token
    app.post(baseURL + "/user/check", function(req, res) {
        main.checkToken(req, res);
    });

// Announcements
    // One Announcement
    app.get(baseURL + "/announcement/:announceID", function(req, res) {
        main.getOneAnnouncement(req, res);
    });

    // All Announcements
    app.get(baseURL + "/announcements/all", function(req, res) {
        main.getAllAnnouncements(req, res);
    });

    // New Announcement
    app.post(baseURL + "/announcements/new", function(req, res) {
        main.newAnnouncement(req, res);
    });

    // Edit Announcement
    app.put(baseURL + "/announcements/edit/:announceID", function(req, res) {
        main.editAnnouncement(req, res);
    });

    // Delete Announcement
    app.delete(baseURL + "/announcements/del/:announceID", function(req, res){
        main.deleteAnnouncement(req, res);
    });

// Events
    // One Event
    app.get(baseURL + "/event/:eventID", function(req, res) {
        main.getOneEvent(req, res);
    });

    // All Events
    app.get(baseURL + "/events/all", function(req, res) {
        main.getAllEvents(req, res);
    });

    // New Event
    app.post(baseURL + "/events/new", function(req, res) {
        main.newEvent(req, res);
    });

    // Edit Event
    app.put(baseURL + "/events/edit/:eventID", function(req, res) {
        main.editEvent(req, res);
    });

    // Delete Event
    app.delete(baseURL + "/events/delete/:eventID", function(req, res) {
        main.deleteEvent(req, res);
    });

// Question

    // One Question
    app.get(baseURL + "/events/question/:questionID", function(req, res){
        main.getQuestion(req, res);
    });
   
    // Add Question to Event
    app.put(baseURL + "/events/questions/new/:eventID", function(req, res){
        main.addQuestion(req, res);
    });
    
    // Edit Question
    app.put(baseURL + "/events/questions/edit/:questionID", function(req, res){
        main.editQuestion(req, res);
    })

    // Delete Question from Event
    app.delete(baseURL + "/events/questions/delete/:questionID", function(req, res){
        main.deleteQuestion(req, res);
    })

// Response
    // Add Response to Question
    app.put(baseURL + "/events/response/new/:questionID", function(req, res){
        main.addResponse(req, res);
    });

// Media
    // One Media Directory
    app.get(baseURL + "/media/:mediaDirID", function(req, res) {
        main.getOneMediaDir(req, res);
    });

    // All Media Directories
    app.get(baseURL + "/medias/all", function(req, res) {
        main.getAllMediaDir(req, res);
    });

    // New Media
    app.post(baseURL + "/medias/new", function(req, res) {
        main.newMediaDir(req, res);
    });

    // Edit Media Directory
    app.put(baseURL + "/medias/edit/:mediaDirID", function(req, res) {
        main.editMediaDir(req, res);
    });

    // Add Media
    app.put(baseURL + "/medias/add/:mediaDirID", function(req, res){
        main.addMedia(req, res);
    })

// About
    // One About
    app.get(baseURL + "/about/:aboutID", function(req, res) {
        main.getOneAbout(req, res);
    });

    // All About
    app.get(baseURL + "/abouts/all", function(req, res) {
        main.getAllAbouts(req, res);
    });

    // New About
    app.post(baseURL + "/abouts/new", function(req, res) {
        main.newAbout(req, res);
    });

    // Edit About
    app.put(baseURL + "/abouts/edit/:aboutID", function(req, res) {
        main.editAbout(req, res);
    });

}