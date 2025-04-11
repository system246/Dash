import axios from 'axios';

const useUpdateAxios = () => {
  const updateData = async (selectedItems) => {
    if (!selectedItems.length) return console.warn("⚠️ No items selected for update.");

    try {
      const response = await axios.post(
        "http://172.16.130.8:6060/collect/bundle/bundle-update",
        selectedItems.map(item => ({ ...item, flag: "ACTIVE" })), // Update flag directly
        { headers: { Authorization: "1234rt", "Content-Type": "application/json" } }
      );

      console.log("Update Successful:", response?.data?.BUNDLE?.content || "No content returned");
      return response?.data?.BUNDLE?.content;
    } catch (error) {
      console.error(" Update Error:", error.message);
      throw error;
    }
  };

  return { updateData };
};

export default useUpdateAxios;



// import axios from 'axios';

// // Custom Hook for Updating Data via POST
// const useUpdateAxios = () => {
//   const updateData = async (selectedItems) => {
//     if (selectedItems.length === 0) return;

//     const updatedItems = selectedItems.map(item => ({
//         ...item,
//         flag: "ACTIVE"  // Ensuring the flag gets updated
//       }));

//     try {
//       const response = await axios.post(
//         "http://172.16.130.8:6060/collect/bundle/bundle-update",
//         updatedItems, 
//         {
//           headers: {
//             "Authorization": "1234rt",
//             "Content-Type": "application/json"
//           }
//         //   withCredentials: true // Ensures cookies are sent if needed
//         }
//       );
//       console.log("Full API Response:", response.data);
//       console.log("Update Successful:", response?.data?.BUNDLE?.content);
//       return response?.data?.BUNDLE?.content;
//     } catch (error) {
//       console.error("Update Error:", error.message);
//       throw error;
//     }
//   };

//   return { updateData };
// };

// export default useUpdateAxios;
