import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET // Click 'View Credentials' below to copy your API secret
    });

    const UploadToCloudinary = async (localfilePath) => {
        try {
            if(!localfilePath) return null;

            const response = await cloudinary.uploader.upload(localfilePath,{
                resource_type: "auto"
            })
            console.log(`Documaent is shred successfully ${response.url}`)
            fs.unlinkSync(localfilePath)
            return response;
        } catch (error) {
            console.log(error)
            fs.unlinkSync(localfilePath);
            return null;
        }
    }

    export  {UploadToCloudinary};