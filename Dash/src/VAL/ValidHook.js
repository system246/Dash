// import { useState } from 'react';
// import axios from 'axios';

// const useValidityFetch = () => {
//   const [validities, setValidities] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchValidity = async (opcode, channel, category) => {
//     setLoading(true);
//     setError(null);

//     const payload = { opCode: opcode, channel, category };

//     try {
//       const { data } = await axios.post(
//         'http://172.16.130.8:6060/collect/bundle/get-validity',
//         payload,
//         { headers: { 'Content-Type': 'application/json' } }
//       );

//       if (Array.isArray(data)) {
//         setValidities(data);
//         setLoading(false);
//         return {
//           success: true,
//           message: 'Validities fetched successfully',
//           txnId: Date.now(),
//           validities: data
//         };
//       } else {
//         setError('Unexpected response format');
//         setLoading(false);
//         return {
//           success: false,
//           message: 'Invalid response structure'
//         };
//       }
//     } catch (err) {
//       console.error('API Error:', err.message);
//       setError('Network or server error.');
//       setLoading(false);
//       return {
//         success: false,
//         message: 'API request failed'
//       };
//     }
//   };

//   return { validities, loading, error, fetchValidity };
// };

// export default useValidityFetch;
import { useState } from 'react';
import axios from 'axios';

const useValidityFetch = () => {
  const [validities, setValidities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchValidity = async (opcode, channel, category) => {
    setLoading(true);
    setError(null);

    const xmlPayload = `
      <REQUEST>
        <CATEGORY>${category}</CATEGORY>
        <OPCODE>${opcode}</OPCODE>
        <CHANNEL>${channel}</CHANNEL>
        <REFERENCE1>TXN3456IUY</REFERENCE1>
        <CUSTOMERMSISDN>256706218827</CUSTOMERMSISDN>
      </REQUEST>
    `;

    try {
      const response = await axios.post(
        'http://172.16.130.8:6060/collect/bundle/getBundleValidity',
        xmlPayload,
        {
          headers: {
            'Content-Type': 'application/xml',
          },
        }
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'application/xml');

      const status = xmlDoc.getElementsByTagName('STATUS')[0]?.textContent;
      const message = xmlDoc.getElementsByTagName('MESSAGE')[0]?.textContent || '';
      const txnId = xmlDoc.getElementsByTagName('TXNID')[0]?.textContent || '';

      if (status === 'true') {
        const validityNodes = xmlDoc.getElementsByTagName('VALIDITY');
        const validityList = Array.from(validityNodes)
          .map((node, index) => ({
            valId: index + 1,
            validity: node.textContent.trim(),
          }))
          .filter((item) => item.validity); // remove empty values

        setValidities(validityList);
        return {
          success: true,
          message,
          txnId,
          validities: validityList,
        };
      } else {
        setError(message || 'Failed to fetch validities');
        return {
          success: false,
          message: message || 'Failed to fetch validities',
        };
      }
    } catch (err) {
      console.error('API Error:', err);
      setError('Network or server error.');
      return {
        success: false,
        message: 'API request failed',
      };
    } finally {
      setLoading(false);
    }
  };

  return { validities, loading, error, fetchValidity };
};

export default useValidityFetch;



