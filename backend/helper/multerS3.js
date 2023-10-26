const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer');
const multerS3 = require('multer-s3');


const s3 = new S3Client({ region: process.env.AWS_BUCKET_REGION })

const s3upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname)
        },
    }),
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

module.exports = s3upload;