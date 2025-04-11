import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Table, Spin, message } from 'antd';
import useBundleFetch from '../../hooks/AllBndlHook';

const AllBndle = () => {
  const location = useLocation();
  const { categoryName } = useParams();

  const stateData = location.state || {};
  let { opcode, channel, reference, validity } = stateData;

  // Debug logs to help track missing data
  console.log('Received stateData:', stateData);

  if (!opcode || !channel || !reference || !validity) {
    const storedInputs = JSON.parse(localStorage.getItem('categoryInputs'));
    if (storedInputs) {
      opcode = opcode || storedInputs.opcode;
      channel = channel || storedInputs.channel;
      reference = reference || storedInputs.reference;
      validity = validity || storedInputs.validity; // only if you saved it earlier
    }
  }

  console.log('Final data:', { opcode, channel, reference, categoryName, validity });

  const { bundles, loading, error, fetchBundles } = useBundleFetch();

  useEffect(() => {
    if (!opcode || !channel || !reference || !categoryName || !validity) {
      message.error('Missing data. Please return and fill all fields.');
      return;
    }

    const getData = async () => {
      try {
        const result = await fetchBundles(opcode, channel, reference, categoryName, validity);
        console.log('Fetch result:', result);

        if (!result || !result.success) {
          message.error(result?.message || 'Fetch failed.');
        } else {
          message.success(`TxnID: ${result.txnId}`);
        }
      } catch (err) {
        console.error('FetchBundles error:', err);
        message.error('Unexpected error occurred while fetching bundles.');
      }
    };

    getData();
  }, [opcode, channel, reference, categoryName, validity]);

  const columns = [
    {
      title: 'S.No',
      key: 'serial',
      render: (text, record, index) => index + 1,
    },
    {title: 'ID',dataIndex: 'ID',key: 'id',},
    {title: 'Bundle ID', dataIndex: 'BUNDLEID',key: 'bundleid',},
    {title: 'Category',dataIndex: 'CATEGORY',key: 'category',},
    {title: 'Validity',dataIndex: 'VALIDITY',key: 'validity',},
    {title: 'Amount',dataIndex: 'AMOUNT',key: 'amount',
      render: (text, record) => `${record.CURRENCY} ${text}`,},
    {title: 'Bundle Description',dataIndex: 'BUNDLEDESCRIPTION',key: 'bundledescription',},
    {title: 'Currency',dataIndex: 'CURRENCY',key: 'currency',},
    {title: 'Details Description',dataIndex: 'BUNDLEDETAILSDESCRIPTION',key: 'bundledetailsdescription',},
     ];

  return (
    <div className="absolute inset-0 overflow-hidden top-20 left-65 py-4 px-2">
      <h1 className="text-sm py-2 text-gray-400 underline">Category/Validity/Bundle</h1>

      {/* Safely render heading */}
      <h1 className="text-2xl font-bold underline mb-4">
        All Bundles for {categoryName} {validity ? `- ${validity}` : ''}
      </h1>

      {loading ? (
        <Spin tip="Loading bundles..." />
      ) : (
        <Table
          columns={columns}
          dataSource={bundles}
          scroll={{ x: "max-content" }}
          pagination={false}
          rowKey={(record) => record.key}
        />
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default AllBndle;
