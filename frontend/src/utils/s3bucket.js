import {S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const BucketName = import.meta.env.VITE_S3_BUCKET;
const Region = import.meta.env.VITE_REGION;
const accessKey = import.meta.env.VITE_ACCESSID
const secretKey = import.meta.env.VITE_SECRET_ID

const s3Bucket = new S3Client({
    region: Region,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
    }
})

export const uploadToS3 = async(file) =>{
    const fileBuffer = await file.arrayBuffer();
    const params = {
    Bucket: BucketName,
    Key: `uploads/${Date.now()}-${file.name}`, 
    Body: fileBuffer, 
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Bucket.send(command);
    return `https://${BucketName}.s3.${Region}.amazonaws.com/${params.Key}`;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    return null;
  }
}