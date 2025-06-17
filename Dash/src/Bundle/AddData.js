// AddBundlehook.js
import axios from "axios";

const API_URL = "http://172.16.130.8:6060/collect/bundle/add-bundle";  

const useAddBundle = () => {
  const addBundle = async (bundleData) => {
    try {
      const response = await axios.post(API_URL, bundleData);
      console.log( response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { addBundle };
};

export default useAddBundle;
