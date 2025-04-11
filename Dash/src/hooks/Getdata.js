import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Custom Hook for Axios GET requests with refetch
const useAxios = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(url, {
        headers: {
          "Authorization": "1234rt", // Replace with actual token if needed
          "Content-Type": "application/json"
        }
      });

      console.log("API Response:", response.data);
      setData(Array.isArray(response?.data?.BUNDLE?.content)
        ? response.data.BUNDLE.content
        : response.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData }; // <-- refetch returned
};

export default useAxios;





// import { useState, useEffect } from 'react';
// import axios from 'axios';

// // Custom Hook for Axios requests (GET and PUT)
// const useAxios = (url, method = 'GET', body = null) => {
//   const [data, setData] = useState([]); // Default to an empty array to prevent errors
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const headers = {
//     "Authorization": `1234rt`, // Replace with actual token if needed
//     "Content-Type": "application/json",
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = method === 'POST'
//           ? await axios.post(url, body, { headers }) // Apply headers to POST
//           : await axios.get(url, { headers }); // Apply headers to GET
          
//         console.log("API Response:", response.data);

//         setData(Array.isArray(response?.data?.BUNDLE?.content) ? response?.data?.BUNDLE?.content : response.data?.data || []); // Ensure data is always an array
//       } catch (err) {
//         setError(err.response?.data?.message || err.message || 'An error occurred'); // More detailed error handling
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url, method, JSON.stringify(body)]); // Use JSON.stringify(body) to prevent unnecessary re-fetching

//   // **Update Function**
//   const updateData = async (updateUrl, updatedItems) => {
//     try {
//       const response = await axios.put(updateUrl, updatedItems, { headers });
//       console.log("Update Response:", response.data);

//       // Update local state optimistically
//       setData(prevData =>
//         prevData.map(item =>
//           updatedItems.find(updatedItem => updatedItem.id === item.id)
//             ? { ...item, flag: "ACTIVE" }
//             : item
//         )
//       );

//       const selectedItems = data
//   .filter(item => selectedRowKeys.includes(item.id))
//   .map(item => ({
//     id: item.id,
//     bundleId: item.bundleId, // Explicitly ensuring it's included
//     flag: "ACTIVE"
//   }));

//       return { success: true, message: "Updated successfully!" };
//     } catch (err) {
//       return { success: false, message: err.response?.data?.message || err.message || "Update failed" };
//     }
//   };

//   return { data, loading, error, updateData };
// };

// export default useAxios;
