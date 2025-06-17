import { useState } from 'react';
import axios from 'axios';

const useBundleFetch = () => {
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBundles = async (opcode, channel, reference, category, validity) => {
    setLoading(true);
    setError(null);

    try {
      const xmlData = `
  <REQUEST>
    <VALIDITY>${validity}</VALIDITY>
    <CATEGORY>${category}</CATEGORY>
    <OPCODE>${opcode}</OPCODE>
    <CHANNEL>${channel}</CHANNEL>
  </REQUEST>
`;


      console.log("Sending XML payload:", xmlData);

      const response = await axios.post(
        'http://172.16.130.8:6060/collect/bundle/getAllBundle',
        xmlData,
        {
          headers: { 'Content-Type': 'application/xml' },
        }
      );

      const data = response.data;
      console.log("Raw XML response:", data);

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');

      const status = xmlDoc.getElementsByTagName('STATUS')[0]?.textContent || '';
      const message = xmlDoc.getElementsByTagName('MESSAGE')[0]?.textContent || '';
      const txnId = xmlDoc.getElementsByTagName('TXNID')[0]?.textContent || '';
      const errorCode = xmlDoc.getElementsByTagName('ERRORCODE')[0]?.textContent || '';
      const errorMsg = xmlDoc.getElementsByTagName('ERRORMSG')[0]?.textContent || '';

      // Handle error case more explicitly
      if (status.toLowerCase() !== 'true') {
        setBundles([]);
        setError(`Error Code: ${errorCode}, Message: ${errorMsg}`);
        return { success: false, message: `Error: ${message}` };
      }

      // Parse bundle data if status is true
      const bundleNodes = xmlDoc.getElementsByTagName('BUNDLE');

      const bundlesData = Array.from(bundleNodes).map((node, i) => ({
        key: i.toString(),
        ID: node.getElementsByTagName('ID')[0]?.textContent || '',
        OPCODE: node.getElementsByTagName('OPCODE')[0]?.textContent || '',
        CHANNEL: node.getElementsByTagName('CHANNEL')[0]?.textContent || '',
        // CHANNEL2: node.getElementsByTagName('CHANNEL2')[0]?.textContent || '',
        BUNDLEID: node.getElementsByTagName('BUNDLEID')[0]?.textContent || '',
        CATEGORY: node.getElementsByTagName('CATEGORY')[0]?.textContent || '',
        VALIDITY: node.getElementsByTagName('VALIDITY')[0]?.textContent || '',
        AMOUNT: node.getElementsByTagName('AMOUNT')[0]?.textContent || '',
        CURRENCY: node.getElementsByTagName('CURRENCY')[0]?.textContent || '',
        FLAG: node.getElementsByTagName('FLAG')[0]?.textContent || '',
        BUNDLEDESCRIPTION: node.getElementsByTagName('BUNDLEDESCRIPTION')[0]?.textContent || '',
        BUNDLEDETAILSDESCRIPTION: node.getElementsByTagName('BUNDLEDETAILSDESCRIPTION')[0]?.textContent || '',
      }));

      console.log("Parsed bundles:", bundlesData);

      setBundles(bundlesData);

      return { success: true, txnId, data: bundlesData };
    } catch (err) {
      console.error('FetchBundles error:', err);
      setError('Failed to fetch bundles.');
      setBundles([]);
      return { success: false, message: 'Request failed' };
    } finally {
      setLoading(false);
    }
  };

  return { bundles, loading, error, fetchBundles };
};

export default useBundleFetch;
