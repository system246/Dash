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
      message: message || 'Category added',
    };
  } catch (error) {
    console.error('Add Category Error:', error);
    return { success: false, message: 'Add request failed' };
  }
};

export default addCategoryAPI;
