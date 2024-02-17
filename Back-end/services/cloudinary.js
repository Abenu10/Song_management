const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dptx5wjus',
  api_key: '493652748732826',
  api_secret: 'EZ23kc0nJatGWQgY1Fb6u6g3lgE',
});
// TODO:
uploadToCloudinary = (path, folder) => {
  return cloudinary.v2.uploader
    .upload(path, {
      resource_type: 'auto',
      folder,
    })
    .then((data) => {
      return {
        secure_url: data.secure_url,
        public_id: data.public_id,
        format: data.format,
      };
    })
    .catch((error) => {
      console.log(error);
    });
};

// removeFromCloudinary = async (public_id) => {
//   try {
//     await cloudinary.v2.uploader.destroy(public_id);
//     console.log(`Deleted image from Cloudinary with public ID: ${public_id}`);
//   } catch (error) {
//     console.error(error);
//   }
// };

removeFromCloudinary = async (public_id) => {
  try {
    // const result =
    await cloudinary.v2.uploader.destroy(public_id, function (error, result) {
      console.log(result, error);
    });
    console.log(`Deleted image from Cloudinary with public ID: ${public_id}`);
  } catch (error) {
    console.error(error);
  }
};

// removeFromCloudinary = async (publicId) => {
//   try {
//     await cloudinary.uploader.destroy(publicId);
//     console.log(`Deleted file from Cloudinary with public ID: ${publicId}`);
//   } catch (error) {
//     console.error(error);
//   }
// };

// module.exports = {
//   uploadToCloudinary,

//   removeFromCloudinary,
// };

// uploadAudioToCloudinary = (path) => {
//   return cloudinary.v2.uploader.upload(path, {
//     resource_type: 'auto',
//     folder: 'post-songs',
//   });
// };

// uploadImageToCloudinary = (path) => {
//   return cloudinary.v2.uploader.upload(path, {
//     resource_type: 'auto',
//     folder: 'post-images',
//   });
// };

module.exports = {
  uploadToCloudinary, // Keep this if you still want a generic upload function
  removeFromCloudinary,
  // uploadAudioToCloudinary, // Uncommented and added to exports
  // uploadImageToCloudinary,
};
