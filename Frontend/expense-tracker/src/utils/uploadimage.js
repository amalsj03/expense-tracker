import { API_PATHS } from "./apipath";
import axiosInstance from "./axiosinstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Image upload response:', response.data); // Check uploaded image details
    return response.data;
  } catch (error) {
    console.error('Error uploading the image', error);
    throw error;
  }
};

export default uploadImage;
