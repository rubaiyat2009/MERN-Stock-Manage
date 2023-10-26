const multer = require('multer');
const path = require('path');
// File upload folder
const UPLOADS_FOLDER = "./uploads/";

// define the storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName =
            file.originalname
                .replace(fileExt, "")
                .toLowerCase()
                .split(" ")
                .join("-") +
            "-" + Date.now();

        cb(null, fileName + fileExt);
    },
});


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000, // 1MB
    },
    fileFilter: (req, file, cb) => {


        if (file.fieldname === "image") {
            if (
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg"
            ) {
                cb(null, true);
            } else {
                cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
            }
        } else if (file.fieldname === "doc") {
            if (file.mimetype === "application/pdf") {
                cb(null, true);
            } else {
                cb(new Error("Only .pdf format allowed!"));
            }
        } else if (file.fieldname === "attachment") {
            if (
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg" ||
                file.mimetype === "application/pdf"
            ) {
                cb(null, true);
            } else {
                cb(new Error("Only .jpg, .png , .jpeg or .pdf format allowed!"));
            }
        }
        else {
            cb(new Error("There was an unknown error!"));
        }
    },
});

module.exports = upload;