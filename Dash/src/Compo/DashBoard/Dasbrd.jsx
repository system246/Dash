import React, { useState } from 'react';
import { Table, message, Spin, Button, Modal, Form, Input } from "antd";
import useAxios from '../../hooks/Getdata';
import useUpdateAxios from '../../hooks/UpdatebyPost';
import useDeleteAxios from '../../hooks/Delete';
import { RiDeleteBin6Line } from "react-icons/ri";

const headers = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Bundle ID", dataIndex: "bundleId", key: "bundleId" },
  { title: "Bundle Name", dataIndex: "bundleName", key: "bundleName", render: (name) => name || "N/A" },
  { title: "Amount", dataIndex: "amount", key: "amount", render: (amount) => (amount !== null ? amount : "N/A") },
  { title: "Bundle Description", dataIndex: "bundleDescription", key: "bundleDescription", render: (date) => date || "Not avalable" },
  { title: "Bundle Details Description", dataIndex: "bundleDetailsDescription", key: "bundleDetailsDescription", render: (desc) => desc || "N/A" },
  { title: "Init Date", dataIndex: "initDate", key: "initDate", render: (date) => date || "N/A" },
  { title: "Modified Date", dataIndex: "modifiedDate", key: "modifiedDate", render: (date) => date || "N/A" },
  { title: "Category", dataIndex: "category", key: "category" },
  { title: "Operator Code", dataIndex: "opCode", key: "opCode" },
  { title: "Currency", dataIndex: "currency", key: "currency", render: (currency) => currency || "N/A" },
  { title: "Validity", dataIndex: "validity", key: "validity" },
  {
    title: "Flag",
    dataIndex: "flag",
    key: "flag",
    render: (flag) => (
      <span style={{
        backgroundColor: flag === "ACTIVE" ? "#4CAF50" : flag === "INACTIVE" ? "#FF9800" : "#f44336",
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        display: "inline-block",
      }}>
        {flag || "N/A"}
      </span>
    ),
  },
];

const API_URL = "http://172.16.130.8:6060/collect/bundle/txn?size=10&page=0";

const Dasbrd = () => {
  const { data, loading, error, refetch } = useAxios(API_URL, 'GET');
  const { updateData } = useUpdateAxios();
  const { deleteData } = useDeleteAxios();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  const formattedData = Array.isArray(data) ? data : [];

  const handleUpdate = async () => {
    if (selectedRowKeys.length === 0) return;
    const selectedItems = formattedData
      .filter(item => selectedRowKeys.includes(item.id) || selectedRowKeys.includes(item.bundleId))
      .map(item => ({ ...item, flag: "ACTIVE" }));
    try {
      setUpdateLoading(true);
      await updateData(selectedItems);
      message.success("Records updated successfully!");
      setSelectedRowKeys([]);
      await refetch();
    } catch {
      message.error("Failed to update records.");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    const selectedItems = formattedData.filter(item => selectedRowKeys.includes(item.id));
    try {
      await deleteData(selectedItems);
      message.success("Records deleted successfully!");
      setSelectedRowKeys([]);
      window.location.reload();
    } catch {
      message.error("Failed to delete records.");
    }
  };

  const showEditModal = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const updatedValues = await form.validateFields();
      const updatedData = { ...editingRecord, ...updatedValues };
      await updateData([updatedData]);
      message.success("Record updated successfully!");
      setIsModalVisible(false);
      setEditingRecord(null);
      await refetch();
    } catch (error) {
      message.error("Failed to update record.");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
  };

  const enhancedHeaders = [...headers, {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Button onClick={() => showEditModal(record)} type="link">
        Edit
      </Button>
    ),
  }];

  if (error) return <p style={{ color: 'red' }}>Error: {error?.message || "Something went wrong"}</p>;

  return (
    <div className='absolute bg-gray-200 top-25 mx-3 inset-0 left-70 py-4 overflow-x-hidden overflow-y-auto shadow-2xl'>
      <div className="top flex justify-between px-4 mb-4">
        <h1 className='text-2xl font-bold underline'>All Bundle</h1>
        <div className='flex items-center gap-3'>
          <Button
            type="primary"
            loading={updateLoading}
            onClick={handleUpdate}
            className={`bg-red-500 py-1 px-4 rounded cursor-pointer hover:bg-red-600 ${updateLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={updateLoading}
          >
            {updateLoading ? 'Updating...' : 'Update'}
          </Button>
          <RiDeleteBin6Line onClick={handleDelete} className='text-3xl cursor-pointer hover:text-red-500' />
        </div>
      </div>

      {updateLoading ? (
        <Spin tip="Updating records..." size="large">
          <div className="min-h-[200px]" />
        </Spin>
      ) : (
        <Table
          className='mb-8'
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          dataSource={formattedData}
          columns={enhancedHeaders}
          loading={loading}
          scroll={{ x: "max-content" }}
          rowKey={(record) => record.id || record.bundleId}
        />
      )}

      <Modal
        title="Edit Bundle"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="bundleName" label="Bundle Name">
            <Input />
          </Form.Item>
          <Form.Item name="amount" label="Amount">
            <Input />
          </Form.Item>
          <Form.Item name="bundleDescription" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="currency" label="Currency">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dasbrd;
