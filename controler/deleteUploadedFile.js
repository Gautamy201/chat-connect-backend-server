const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const deleteUploadedFile = (req, res) => {
  const imgURl = req.query.imgUrl;
  let imgName = imgURl.split("/").splice(-1).join().split(".")[0];

  cloudinary.uploader.destroy(imgName, (error, result) => {
    console.log(error, result);
    res.status(200).json({
      result,
    });
  });
};

module.exports = deleteUploadedFile;
