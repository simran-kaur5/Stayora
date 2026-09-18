const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ //use these credentials to store data
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

const storage = new CloudinaryStorage({  //this is storage to store
  cloudinary: cloudinary,
  params: {
    folder: 'Stayora_DEV',
    allowed_formats: ["jpg", "jpeg", "png"]
  },
});

module.exports = {
    cloudinary,
    storage
}