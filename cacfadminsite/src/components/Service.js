import axios from "axios";
const baseURL = "http://localhost:8000/api";

const Service = {
// Login
    async loginUser(body){
        try {
            let response = await axios.post(baseURL+"/user/login", body);
            console.log(response.data);
            return response.data;
        }catch (error){
            console.log(error);
            return error;
        }
    },

    async registerUser(body){
        try {
            let response = await axios.post(baseURL+"/user/new", body)
            console.log(response);
            return response.data;
        }catch (error){
            console.log(error);
            return error;
        }
    },

    async checkToken(body){
        try {
            let response = await axios.post(baseURL+"/user/check", body);
            console.log(response.data);
            return response.data;
        }catch (error){
            console.log(error);
            return error;
        }
    },

// Announcements
    async getAllAnnouncements(){
        try{
            let response = await axios.get(baseURL+"/announcements/all");
            return response.data;
        }catch (error){
            console.error(error);
            return error;
        }
    },

    async getAnnouncement(announcementID){
        try{
            let response = await axios.get(baseURL+`/announcement/${announcementID}`);
            return response.data;
        }catch (error){
            console.error(error);
            return error;
        }
    },
    
    postNewAnnouncement(body){
        axios.post(baseURL+"/announcements/new", {
            subject: body.subject,
            description: body.description
        })
        .then = ((response) => {
            return response;
        })
        .catch = ((error) => {
            console.log(error);
            return error;
        });
    },

    editAnnouncement(announcementID, body){
        axios.put(baseURL+`/announcements/edit/${announcementID}`, {
            subject: body.subject,
            description: body.description
        })
        .then = ((response) => {
            return response;
        })
        .catch = ((error) => {
            console.log(error);
            return error;
        });
    },

    deleteAnnouncement(announcementID){
        try{
            axios.delete(baseURL+`/announcements/del/${announcementID}`);
        }catch (error){
            console.error(error);
            return error;
        }
    },

// Events
    async getAllEvents(){
        try{
            let response = await axios.get(baseURL+"/events/all");
            return response.data;
        }catch (error){
            console.error(error);
            return error;
        }
    },

    async getEvent(eventID){
        try{
            let response = await axios.get(baseURL+`/event/${eventID}`);
            return response.data;
        }catch (error){
            console.error(error);
            return error;
        }
    },

    postNewEvent(body){
        axios.post(baseURL+"/events/new", {
            title: body.title,
            description: body.description
        })
        .then = ((response) => {
            return response;
        })
        .catch = ((error) => {
            console.log(error);
            return error;
        });
    },

    editEvent(eventID, body){
        axios.put(baseURL+`/events/edit/${eventID}`, {
            title: body.title,
            description: body.description
        })
        .then = ((response) => {
            return response;
        })
        .catch = ((error) => {
            console.log(error);
            return error;
        });
    },

    deleteEvent(eventID){
        try{
            axios.delete(baseURL+`/events/delete/${eventID}`);
        }catch (error){
            console.error(error);
            return error;
        }
    },

// Questions
    async getQuestion(questionID){
        try{
            let response = await axios.get(baseURL+`/events/question/${questionID}`);
            return response.data;
        }catch (error){
            console.error(error);
            return error;
        }
    },

    editQuestion(questionID, body){
        axios.put(baseURL+`/events/questions/edit/${questionID}`, {
            question: body.question
        })
        .then = ((response) => {
            return response;
        })
        .catch = ((error) => {
            console.log(error);
            return error;
        });
    },

    postNewQuestion(eventID, body){
        axios.put(baseURL+`/events/questions/new/${eventID}`, {
            question: body.question
        })
        .then = ((response) => {
            return response;
        })
        .catch = ((error) => {
            console.log(error);
            return error;
        })
    },

    deleteQuestion(questionID){
        try{
            axios.delete(baseURL+`/events/questions/delete/${questionID}`);
        }catch (error){
            console.error(error);
            return error;
        }
    }
}

export default Service;