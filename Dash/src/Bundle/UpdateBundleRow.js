import axios from 'axios';

const useUpdateBundleRow = () => {
  const updateBundles = async (editedRows) => {
    if (!editedRows.length) return console.warn("⚠️ No rows to update");

    try {
      const response = await axios.post(
        "http://172.16.130.8:6060/collect/bundle/bundleUpdateList", // <-- Your endpoint
        editedRows,
        {
          headers: {
            Authorization: "1234rt",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Updated Bundles:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Update Error:", error.message);
      throw error;
    }
  };

  return { updateBundles };
};

export default useUpdateBundleRow;
