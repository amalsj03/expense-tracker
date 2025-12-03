const multer = require("multer");


//confiure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder where files will be saved
  },
  filename: (req, file, cb) => {
    // Create unique file name: timestamp + originalname
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

//file transfer
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']; // allowed MIME types
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // accept the file
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG and PNG are allowed.'), false); // reject the file
  }
};

const upload = multer({storage,fileFilter});

module.exports = upload;



 