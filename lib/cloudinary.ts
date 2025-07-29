import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Helper function to upload image
export const uploadImage = async (file: string | Buffer, folder: string = 'aicorner') => {
  try {
    let fileToUpload: string;

    if (Buffer.isBuffer(file)) {
      // Convert buffer to base64 data URL
      fileToUpload = `data:image/jpeg;base64,${file.toString('base64')}`;
    } else {
      fileToUpload = file;
    }

    const result = await cloudinary.uploader.upload(fileToUpload, {
      folder,
      resource_type: 'auto',
      quality: 'auto',
      fetch_format: 'auto',
    });
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

// Helper function to upload video
export const uploadVideo = async (file: string | Buffer, folder: string = 'aicorner/videos') => {
  try {
    let fileToUpload: string;

    if (Buffer.isBuffer(file)) {
      // Convert buffer to base64 data URL
      fileToUpload = `data:video/mp4;base64,${file.toString('base64')}`;
    } else {
      fileToUpload = file;
    }

    const result = await cloudinary.uploader.upload(fileToUpload, {
      folder,
      resource_type: 'video',
      quality: 'auto',
    });
    return result;
  } catch (error) {
    console.error('Error uploading video to Cloudinary:', error);
    throw error;
  }
};

// Helper function to delete asset
export const deleteAsset = async (publicId: string, resourceType: 'image' | 'video' = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

// Helper function to get optimized image URL
export const getOptimizedImageUrl = (publicId: string, width?: number, height?: number) => {
  return cloudinary.url(publicId, {
    width,
    height,
    crop: 'fill',
    quality: 'auto',
    fetch_format: 'auto',
  });
};
