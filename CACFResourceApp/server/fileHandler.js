let path = require("path");
let multer = require("multer");

// File Size Limit in MB
FSIZELIMIT = 500

const FILETYPES = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/")
    },
    filename: function(req, file, cb){
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

let upload = multer ({
    storage: storage,
    fileFilter: function(req, file, callback){
        if(FILETYPES.includes(file.mimetype)){
            callback(null, true);
        }else{
            console.log("Invalid file type. File type must be .png, .jpg, .jpeg, or .gif");
            callback(null, false);
        }
    },
    limits: {
        fileSize: FSIZELIMIT * 1024 * 1024
    }
});

module.exports = upload;