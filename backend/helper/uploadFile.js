const AWS = require("aws-sdk");
const multer = require("multer");
const path = require("path");
const uploadS3 = async (req, res, next) => {
  if (req.file) {
    let s3bucket = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      Bucket: process.env.AWS_BUCKET_NAME,
    });

    s3bucket.createBucket(async () => {
      const fileExt = path.extname(req.file?.originalname);
      const fileName =
        req.file?.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName + fileExt,
        Body: req.file.buffer,
      };
      s3bucket.upload(params, async (err, data) => {
        if (err) {
          return res.status(400).json({ success: false, message: err.message });
        }
        req.filename = data.Location;
        next();
      });
    });
  } else {
    next();
  }
};

const storage = multer.memoryStorage();

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
    } else {
      cb(new Error("There was an unknown error!"));
    }
  },
});

module.exports = { uploadS3, upload };
