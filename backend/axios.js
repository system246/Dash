const axios = require('axios');
require('dotenv').config();

const fetchBundles = async () => {

  const PORT = process.env.PORT || 3000;

  try {
    const response = await axios.get(`${PORT}`); // API URL
    console.log('Bundles:', response.data);
  } catch (error) {
    console.error('Error fetching bundles:', error.message);
  }
};

fetchBundles();
