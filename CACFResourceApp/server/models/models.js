let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema ({
    username: {type: String, 
                required:[true, "Username must be provided"]},
    password: {type: String, 
                required:[true, "Password must be provided"]},
    access: {type: Number, 
             default: 3}

}, {timestamps: true});

let AnnounceSchema = new mongoose.Schema ({
    subject: {type: String, 
              required:[true, "Subject must be provided."]},
    description: {type: String, 
                  required: [true, "Description must be provided"]}

}, {timestamps: true}, {capped: {size: 1000}});

let ResponseSchema = new mongoose.Schema ({
    name: {type: String, 
            required: [true, "Name must be provided."]},
    answer: {type: String, 
             required: [true, "Answer must be provided"]}
    
}, {timestamps: true});

let QuestionSchema = new mongoose.Schema ({
    question: {type: String, 
                required: [true, "Question must be provided"]},
    responses: [{type: mongoose.Schema.Types.ObjectId, ref:"Response"}]
}, {timestamps: true});

let EventSchema = new mongoose.Schema ({
    title: {type: String, 
            required:[true, "Title must be provided."]},
    description: {type: String, 
                  required: [true, "Description must be provided"]},
    questions:[{type: mongoose.Schema.Types.ObjectId, ref: "Question"}]
}, {timestamps: true}, {capped: {size: 1000}});

let MediaSchema = new mongoose.Schema ({
    media: {data: Buffer, 
            contentType: String}
}, {timestamps: true});

let MediaDirSchema = new mongoose.Schema ({
    name:  {type: String, required:[true, "Name must be provided."]},
    directory: [MediaSchema]

}, {timestamp: true}, {capped: {size: 100}});

let AboutSchema = new mongoose.Schema ({
    name: {type: String, 
            required:[true, "Name must be provided."]},
    description: {type: String},
    picture: {data: Buffer, 
              contentType: String}

}, {timestamps: true}, {capped: {size: 100}});


mongoose.model("User", UserSchema);
mongoose.model("Announcement", AnnounceSchema);
mongoose.model("Question", QuestionSchema);
mongoose.model("Response", ResponseSchema);
mongoose.model("Event", EventSchema);
mongoose.model("Media", MediaSchema);
mongoose.model("MediaDir", MediaDirSchema);
mongoose.model("About", AboutSchema);