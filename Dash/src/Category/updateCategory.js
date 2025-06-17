import axios from 'axios';

const updateCategoryAPI = async (categoryList) => {
  try {
    const response = await axios.post(
      // 'http://172.16.130.8:6060/collect/bundle/bundle-update',
      'http://172.16.130.8:6060/collect/bundle/update-categories',
      categoryList,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { success, message } = response.data;
    return {
      success,
      message: message || 'Update completed',
    };

  } catch (error) {
    console.error('Update API Error:', error);
    return {
      success: false,
      message: 'Update request failed',
    };
  }
};

export default updateCategoryAPI;
