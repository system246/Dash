import axios from 'axios';

const useUpdtFlagchnl = () => {
  const updateData = async (selectedItems) => {
    if (!selectedItems.length) return console.warn("⚠️ No items selected for update.");

    try {
      const response = await axios.post(
        "http://172.16.130.8:6060/collect/bundle/add-channels",
        selectedItems, // Use the selectedItems directly which already contain the toggled flags
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

export default useUpdtFlagchnl;
