const deleteUploadImage = (coudniry, imgUrl) => {
  let imgName = imgUrl.split("/").splice(-1).join().split(".")[0];

  coudniry.uploader.destroy(imgName, (error, result) => {
    console.log(error, result);
  });
};

module.exports = deleteUploadImage;
