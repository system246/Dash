 
import { useState } from 'react';
import axios from 'axios';
 
const useCategoryFetch = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const fetchCategories = async (opcode, channel) => {
    setLoading(true);
    setError(null);
 
    try {
      const xmlPayload = `
        <REQUEST>
          <CUSTOMERMSISDN>+256706218827</CUSTOMERMSISDN>
          <CHANNEL>${channel}</CHANNEL>
          <REFERENCE1>256202502806</REFERENCE1>
          <OPCODE>${opcode}</OPCODE>
        </REQUEST>
      `;
 
      const response = await axios.post(
        'http://172.16.130.8:6060/collect/bundle/getBundleCategory',
        xmlPayload,
        {
          headers: {
            'Content-Type': 'application/xml',
          },
        }
      );
 
      // Parse XML string response
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'application/xml');
 
      const status = xmlDoc.getElementsByTagName('STATUS')[0]?.textContent;
      const message = xmlDoc.getElementsByTagName('MESSAGE')[0]?.textContent;
 
      if (status === 'true') {
        const categoryNodes = xmlDoc.getElementsByTagName('CATEGORY');
        const categoryList = Array.from(categoryNodes).map((node) => node.textContent.trim());
        setCategories(categoryList);
 
        return {
          success: true,
          message: 'Categories fetched successfully',
        };
      } else {
        setError(message || 'Unknown error');
        return {
          success: false,
          message: message || 'Failed to fetch categories',
        };
      }
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to fetch category.');
      return { success: false, message: 'Failed to fetch category.' };
    } finally {
      setLoading(false);
    }
  };
 
  return { categories, loading, error, fetchCategories };
};
 
export default useCategoryFetch;