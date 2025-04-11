 import { useCallback } from 'react';
import axios from 'axios';

const useUpdateAxios = () => {
  const updateData = useCallback(async (payload) => {
    try {
      const response = await axios.post(
        'http://172.16.130.8:6060/collect/bundle/update',  
        payload,
        {
          headers: {
            'Authorization': '1234rt',  
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Update response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Update failed:", error);
      throw error;
    }
  }, []);

  return { updateData };
};

export default useUpdateAxios;
