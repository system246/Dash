import { useState, useEffect } from 'react';  // <-- Add this line
import axios from 'axios';

const useBundleFetch = () => {
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBundles = async (opcode, channel, reference, category, validity) => {
    setLoading(true);
    setError(null);

    const xmlPayload = `
      <REQUEST>
        <VALIDITY>${validity}</VALIDITY>
        <OPCODE>${opcode}</OPCODE>
        <CATEGORY>${category}</CATEGORY>
        <CHANNEL>${channel}</CHANNEL>
        <REFERENCE1>${reference}</REFERENCE1>
        <CUSTOMERMSISDN>${reference}</CUSTOMERMSISDN>
      </REQUEST>
    `.trim();

    try {
      const { data } = await axios.post(
        'http://172.16.130.8:6060/collect/bundle/getAllBundle',
        xmlPayload,
        { headers: { 'Content-Type': 'application/xml' } }
      );

      return new Promise((resolve) => {
        setTimeout(() => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, 'application/xml');
          const status = xmlDoc.getElementsByTagName('STATUS')[0]?.textContent || '';

          if (status.toLowerCase() === 'true') {
            const bundlesData = Array.from(xmlDoc.getElementsByTagName('BUNDLE')).map((node, i) => ({
              key: i.toString(),
              ID: node.getElementsByTagName('ID')[0]?.textContent,
              BUNDLEID: node.getElementsByTagName('BUNDLEID')[0]?.textContent,
              CATEGORY: node.getElementsByTagName('CATEGORY')[0]?.textContent,
              VALIDITY: node.getElementsByTagName('VALIDITY')[0]?.textContent,
              AMOUNT: node.getElementsByTagName('AMOUNT')[0]?.textContent,
              CURRENCY: node.getElementsByTagName('CURRENCY')[0]?.textContent,
              BUNDLEDESCRIPTION: node.getElementsByTagName('BUNDLEDESCRIPTION')[0]?.textContent,
              BUNDLEDETAILSDESCRIPTION: node.getElementsByTagName('BUNDLEDETAILSDESCRIPTION')[0]?.textContent,
            }));

            setBundles(bundlesData);

            const txnId = xmlDoc.getElementsByTagName('TXNID')[0]?.textContent || 'N/A';

            resolve({ success: true, txnId });
          } else {
            setError('Failed to fetch bundles.');
            resolve({ success: false, message: 'Failed to fetch bundles.' });
          }

          setLoading(false);
        }, 1000);
      });

    } catch (err) {
      console.error('API Error:', err.message);
      setError('Network or server error.');
      setLoading(false);
      return { success: false, message: 'Network or server error.' };
    }
  };

  return { bundles, loading, error, fetchBundles };
};

export default useBundleFetch;
