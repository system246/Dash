
// import { useState } from 'react';
// import axios from 'axios';

// const useCategoryFetch = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchCategories = async (opcode, channel, reference) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const xmlPayload = `
//         <REQUEST>
//           <OPCODE>${opcode}</OPCODE>
//           <CHANNEL>${channel}</CHANNEL>
//           <REFERENCE1>${reference}</REFERENCE1>
//           <CUSTOMERMSISDN>${reference}</CUSTOMERMSISDN>
//         </REQUEST>
//       `;

//       const response = await axios.post(
//         'http://172.16.130.8:6065/collect/bundle/getAllBundleCategory', 
//         xmlPayload,
//         {
//           headers: {
//             'Content-Type': 'application/xml',
//           },
//         }
//       );

//       const parser = new DOMParser();
//       const xmlDoc = parser.parseFromString(response.data, 'application/xml');

//       const status = xmlDoc.getElementsByTagName('STATUS')[0]?.textContent;
//       const messageText = xmlDoc.getElementsByTagName('MESSAGE')[0]?.textContent;

//       const bundleNodes = xmlDoc.getElementsByTagName('CATEGORY');
//       const bundle = Array.from(bundleNodes).map((node) => node.textContent);

//       if (status === 'true') {
//         const formattedCategories = bundle.map((cat, index) => ({
//           key: index.toString(),
//           serial: index + 1,
//           category: cat,
//         }));
//         setCategories(formattedCategories);
//         return { success: true, message: messageText || 'Categories fetched successfully.' };
//       } else {
//         setError(messageText || 'Unknown error occurred');
//         return { success: false, message: messageText || 'Unknown error occurred' };
//       }

//     } catch (err) {
//       console.error('API Error:', err);
//       setError('Failed to fetch categories.');
//       return { success: false, message: 'Failed to fetch categories.' };
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { categories, loading, error, fetchCategories };
// };

// export default useCategoryFetch;
