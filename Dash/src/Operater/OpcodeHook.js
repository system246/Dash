import { useState } from 'react';
import axios from 'axios';

// Define base URL once at the top
const BASE_URL = 'http://172.16.130.8:6060/collect/bundle';

const useGetopcodeHook = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchopData = async (queryParams = {}) => {
    setLoading(true);
    setError(null);

    try {
      const { data: result } = await axios.get(`${BASE_URL}/get-opcode`, {
        params: queryParams,
        headers: { 'Content-Type': 'application/json' },
      });

      if (Array.isArray(result)) {
        setData(result);
        return { success: true, message: 'Data fetched successfully.' };
      } else {
        throw new Error('Unexpected response format.');
      }
    } catch (err) {
      console.error('GET API Error:', err);
      setError(err.message || 'Failed to fetch data.');
      return { success: false, message: err.message || 'Fetch failed.' };
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchopData };
};

export default useGetopcodeHook;
