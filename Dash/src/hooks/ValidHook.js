import { useState } from 'react';
import axios from 'axios';

const useBundleFetch = () => {
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBundles = async (opcode, channel, category) => {
    setLoading(true);
    setError(null);

    const jsonPayload = {
      opcode,
      channel,
      category,
    };

    try {
      const { data } = await axios.post(
        'http://172.16.130.8:6060/collect/bundle/getBundleValidity', // replace if new URL
        jsonPayload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Example expected response:
      // {
      //   status: "true",
      //   message: "SUCCESS",
      //   txnId: "202029889086",
      //   bundle: ["Daily", "Monthly", "Weekly"]
      // }

      if (data.status.toLowerCase() === 'true') {
        const validities = data.bundle.map((validity, i) => ({
          key: i.toString(),
          serial: i + 1,
          validity
        }));
        setBundles(validities);

        setLoading(false);
        return {
          success: true,
          message: data.message,
          txnId: data.txnId,
          bundles: validities
        };
      } else {
        setError('Failed to fetch data.');
        setLoading(false);
        return {
          success: false,
          message: data.message || 'Invalid response from server.'
        };
      }

    } catch (err) {
      console.error('API Error:', err.message);
      setError('Network or server error.');
      setLoading(false);
      return {
        success: false,
        message: 'API request failed'
      };
    }
  };

  return { bundles, loading, error, fetchBundles };
};

export default useBundleFetch;
