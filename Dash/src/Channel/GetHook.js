import { useState } from 'react';
import axios from 'axios';
 
const BASE_URL = 'http://172.16.130.8:6060/collect/bundle/channel';
 
const useChannelHook = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const fetchchnlData = async (queryParams = {}) => {
    setLoading(true);
    setError(null);
 
    try {
      const response = await axios.get(`${BASE_URL}`, {
        params: queryParams,
      });
 
      if (Array.isArray(response.data)) {
        setData(response.data);
        return { success: true, message: 'Data fetched successfully.' };
      } else {
        throw new Error('Unexpected response format.');
      }
    } catch (err) {
      // More detailed error message
      const message =
        err.response?.data?.message || err.message || 'Failed to fetch data.';
      console.error('GET API Error:', message);
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };
 
  return { data, loading, error, fetchchnlData };
};
 
export default useChannelHook;