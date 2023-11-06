const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const { CLOUDNERY_API_NAME, CLOUDNERY_API_KEY, CLOUDNERY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDNERY_API_NAME,
  api_key: CLOUDNERY_API_KEY,
  api_secret: CLOUDNERY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "StoreAvatars",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [
      {
        width: 200,
        height: 200,
      },
    ],
  },
  folder: "photo",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
