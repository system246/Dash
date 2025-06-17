import React, { useState } from 'react';
import { Button, Input, Space, Select, message, Modal, Spin } from 'antd';
import useValidHook from './AddValidHook';
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddDumyValidty = () => {
  const [id, setId] = useState('');
  const [valid, setValid] = useState('');
  const [channel, setChannel] = useState(undefined);
  const [opcode, setOpcode] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false); // For Modal
  const [loading, setLoading] = useState(false); // For Loader
  const navigate = useNavigate();

  const { updateValidity } = useValidHook();

  const handleSubmit = async () => {
    if (!id || !valid || !channel || !opcode || !category) {
      message.warning('Please fill all the fields');
      return;
    }

    const payload = {
      id: id,
      opCode: opcode,
      channel: channel,
      category: category,
      validity: valid,
    };

    // Show loading spinner before submitting the data
    setLoading(true);

    try {
      // Simulate a delay with setTimeout (1 second)
      setTimeout(async () => {
        await updateValidity(payload);

        // Hide the loader after the delay
        setLoading(false);

        // Show Modal on success
        setIsModalVisible(true);

        // Clear fields after success
        setId('');
        setValid('');
        setChannel(undefined);
        setOpcode(undefined);
        setCategory(undefined);
      }, 1000);
    } catch (error) {
      // Hide the loader in case of an error
      setLoading(false);
      message.error('❌ Failed to add validity');
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate('/Dumyvalid'); // Navigate after closing the modal
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="absolute inset-0 overflow-hidden top-10 left-45 py-4">
      <div className="flex items-center justify-between px-5">
        <h1 className="text-2xl font-bold  py-2 mt-6">Add Validity</h1>
        <Button onClick={() => navigate('/Validity')}>Back to Validity</Button>
      </div>
      <Space
  wrap
  className="border-none  shadow-2xl px-4 mx-4 rounded-2xl py-4 bg-white"
>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">ID :</label>
    <Input
      placeholder="Enter ID"
      value={id}
      onChange={(e) => setId(e.target.value)}
      style={{ width: 160 }}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Channel :</label>
    <Select
      placeholder="Select Channel"
      value={channel}
      onChange={setChannel}
      style={{ width: 160 }}
    >
      <Option value="USSD">USSD</Option>
      <Option value="SMS">APP</Option>
    </Select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">OpCode :</label>
    <Select
      placeholder="Select Opcode"
      value={opcode}
      onChange={setOpcode}
      style={{ width: 160 }}
    >
       <Option value="LYCAUG">LYCAUG</Option>
      <Option value="MTNUG">MTNUG</Option>
    </Select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Category :</label>
    <Select
      placeholder="Select Category"
      value={category}
      onChange={setCategory}
      style={{ width: 160 }}
    >
      <Option value="DATA">DATA</Option>
      <Option value="SMS">SMS</Option>
      <Option value="INTERNET">INTERNET</Option>
      <Option value="VOICE">VOICE</Option>
    </Select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Validity :</label>
    <Select
      placeholder="Select Validity"
      value={valid}
      onChange={setValid}
      style={{ width: 160 }}
    >
      <Option value="DAY">DAY</Option>
      <Option value="WEEK">WEEKLY</Option>
      <Option value="MONTH">MONTHLY</Option>
      <Option value="Daily">DAILY</Option>
      {/* <Option value="30 Days">30 Days</Option> */}
    </Select>
  </div>

  <div className="flex items-end">
    <Button type="primary" onClick={handleSubmit} disabled={loading}>
      {loading ? <Spin size="small" /> : 'Add'}
    </Button>
  </div>
   </Space>


      {/* Modal Pop-up for Success */}
      <Modal
        title="Success"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <p>✅ Validity added successfully!</p>
      </Modal>
    </div>
  );
};

export default AddDumyValidty;
