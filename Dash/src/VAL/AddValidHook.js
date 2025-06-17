 import axios from 'axios';

const useValidHook = () => {
  const updateValidity = async (data) => {
    try {
      const response = await axios.post('http://172.16.130.8:6060/collect/bundle/val-add', data); 
      return response.data;
    } catch (error) {
      console.error('Failed to update validity:', error);
      throw error;
    }
  };

  return { updateValidity };
};

export default useValidHook;
