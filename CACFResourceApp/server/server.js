let express = require("express");
let app = express();
let cors = require("cors");
let path = require("path");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let multer = require("multer");

const PORT = process.env.PORT || 8000

let corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(express.static(__dirname + "/src"));


mongoose.connect("mongodb://localhost/xaDB", {useNewUrlParser: true});

require("./config/routes.js")(app)

// app.all("*", (req,res,next) => {
//   res.sendFile(path.resolve("./../src/index.html"))
// });

app.listen(PORT, function() {
    console.log("XA API server: Listening on port", PORT);
});
  