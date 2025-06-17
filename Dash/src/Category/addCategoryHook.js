// /hooks/addCategoryAPI.js
import axios from 'axios';

const addCategoryAPI = async (jsonPayload) => {
  try {
    const response = await axios.post(
      'http://172.16.130.8:6060/collect/bundle/add-cat',
      jsonPayload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { success, message } = response.data;

    return {
      success: success === true,
      message: message || 'Category added successfully',
    };
  } catch (error) {
    console.error('Add Category Error:', error);

    // More detailed error handling
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      'Add request failed';

    return { success: false, message: errorMsg };
  }
};

export default addCategoryAPI;
