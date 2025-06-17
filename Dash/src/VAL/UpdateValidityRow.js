// hooks/UpdateValidityRow.js
const updateValidityAPI = async (payload) => {
    try {
      const response = await fetch('http://172.16.130.8:6060/collect/bundle/val-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      return {
        success: response.ok,
        message: data.message || 'Updated successfully',
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  };
  
  export default updateValidityAPI;
  