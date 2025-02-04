const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        // console.log('result', result);
        resolve({
          url: result.url,
          id: result.public_id,
        });
      },
      {
        public_id: `${Date.now()}`,
        resource_type: 'auto',
        folder: folder,
      }
    );
  });
};

module.exports = { uploads };
