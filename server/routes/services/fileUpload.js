const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    
    try{
        // console.log(localFilePath);
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            folder: "instagram/Posts",
        });

        if(response){
            console.log(`url of cloudinary: ${response.url}`);
            fs.unlinkSync(localFilePath);
            return response;
        }
    }
    catch(error){
        fs.unlinkSync(localFilePath);
        return `upload file: ${error.message}`;
    }
}

module.exports = uploadOnCloudinary;