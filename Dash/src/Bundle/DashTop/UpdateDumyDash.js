import { useState } from 'react';
import axios from 'axios';

const useBundleUpdate = () => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const updateBundles = async (bundles) => {
    setUpdating(true);
    setError(null);

    try {
const cleanedBundles = bundles.map(({ key, ...rest }) => ({
  ...rest,
  channel: Array.isArray(rest.channel) ? rest.channel : [rest.channel], // <-- Ensure channel is always an array
}));
      console.log("Sending updated bundle JSON:", cleanedBundles);

      const response = await axios.post(
        "http://172.16.130.8:6060/collect/bundle/bundleUpdateList",
        cleanedBundles,
        {
          headers: {
            Authorization: "1234rt", // Or use Bearer if needed
            'Content-Type': 'application/json',
          },
        }
      );

      const status = String(response.data?.status).toLowerCase();

      if (status === 'true') {
        return { success: true, message: response.data.message || 'Update successful' };
      } else {
        return { success: false, message: response.data?.message || 'Update failed' };
      }
    } catch (err) {
      console.error('UpdateBundles error:', err);
      setError('Update failed.');
      return { success: false, message: 'Update request failed' };
    } finally {
      setUpdating(false);
    }
  };

  const resetError = () => setError(null);

  return { updateBundles, updating, error, resetError };
};

export default useBundleUpdate;
