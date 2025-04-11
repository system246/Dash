import { useState } from 'react';
import axios from 'axios';

const useCategoryFetch = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async (opcode, channel) => {
    setLoading(true);
    setError(null);

    try {
      const jsonPayload = {     
        opCode: opcode,
        channel: channel,
        extId: '202i9tuioi06',
        msisdn: '202502090806',
      };

      const response = await axios.post(
        'http://172.16.130.8:6060/collect/bundle/getAllBundleCategory',
        jsonPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;
      console.log("data", data)
      if (Array.isArray(data)) {
         setCategories(data);

        return {
          success: true,
          message: 'Category fetched successfully.',
        };
      } else {
        setError('No category found');
        return {
          success: false,
          message: 'No category found',
        };
      }
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to fetch category.');
      return { success: false, message: 'Failed to fetch category.' };
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, fetchCategories };
};

export default useCategoryFetch;
