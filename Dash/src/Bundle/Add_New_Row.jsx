// src/components/AddBundleModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, notification } from "antd";
import { toast } from "react-toastify";
import AddBundlehook from "./AddData";       // ← API POST hook
import useGetopcodeHook from "../Operater/OpcodeHook";
import useChannelHook from "../Channel/GetHook"; // ✅ Add this line

const { Option } = Select;

const initialBundleState = {
  bundleName: "",
  bundleId: "",
  amount: "",
  bundleDescription: "",
  bundleDetailsDescription: "",
  currency: "",
  category: "",
  opCode: "",
  channel: [], // ✅ Added
  validity: "",
};

export default function AddBundleModal({ visible, onClose, onSuccess }) {
  const [form] = Form.useForm();
  const [newBundleData, setNewBundleData] = useState(initialBundleState);

  // ✅ OPCODE hook
  const {
    data: opcodes = [],
    loading: loadingOpcodes,
    fetchopData: fetchOpcodes,
  } = useGetopcodeHook();

  // ✅ Channel hook
  const {
    data: channel = [],
    loading: loadingChannels,
    fetchchnlData,
  } = useChannelHook();

  // ✅ Fetch OPCODE and Channel data
  useEffect(() => {
    fetchOpcodes();
    fetchchnlData();
  }, []);

  const { addBundle } = AddBundlehook();

  const handleAddBundle = async () => {
    try {
      const payload = {
        ...newBundleData,
        channel: Array.isArray(newBundleData.channel)
          ? newBundleData.channel
          : [newBundleData.channel],
      };

      await addBundle(payload);
      toast.success("Bundle added successfully");
      notification.success({ message: "Success", description: "The bundle has been added." });

      form.resetFields();
      setNewBundleData(initialBundleState);
      onSuccess?.();   // e.g. refetch table in parent
      onClose();       // close modal
    } catch (e) {
      toast.error("Failed to add bundle");
      notification.error({ message: "Error", description: "There was an issue adding the bundle." });
    }
  };

  return (
    <Modal
      title="Add Bundle"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleAddBundle}
        initialValues={initialBundleState}
        onValuesChange={(_, all) => setNewBundleData(all)}
      >
        {/* ► Operator Code */}

        <Form.Item  label="Operator Code" name="opCode" rules={[{ required: true, message: "Select operator code!" }]} >
          <Select
            loading={loadingOpcodes}
            placeholder="Select operator code"
            allowClear
          >
            {opcodes.map((op) => (
              <Option key={op.id} value={op.opcode}>
                {op.opcode}
              </Option>
            ))}
          </Select>
        </Form.Item>

                 <Form.Item
                  label="Bundle ID"
                  name="bundleId"
                  rules={[{ required: true, message: "Please enter the bundle ID!" }]}
                >
                  <Input/>
                </Form.Item>

        {/* ► Channel (multiple) */}
        <Form.Item
          label="Channel"
          name="channel"
          rules={[{ required: true, message: "Select channel(s)!" }]}
        >
          <Select
            mode="multiple"
            placeholder="Select channel(s)"
            loading={loadingChannels}
          >
            {channel.map((chnl) => (
              <Option key={chnl.id} value={chnl.channel}>
                {chnl.channel}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* ► Bundle Name */}
        <Form.Item
          label="Bundle Name"
          name="bundleName"
          rules={[{ required: true, message: "Please enter the bundle name!" }]}
        >
          <Input />
        </Form.Item>

        {/* ► Amount */}
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please enter the amount!" }]}
        >
          <Input />
        </Form.Item>

        {/* ► Bundle Description */}
        <Form.Item
          label="Bundle Description"
          name="bundleDescription"
          rules={[
            { required: true, message: "Please enter the bundle description!" },
          ]}
        >
          <Input />
        </Form.Item>

        {/* ► Bundle Details Description */}
        <Form.Item
          label="Bundle Details Description"
          name="bundleDetailsDescription"
        >
          <Input />
        </Form.Item>

        {/* ► Currency */}
        <Form.Item
          label="Currency"
          name="currency"
          rules={[{ required: true, message: "Select currency!" }]}
        >
          <Select placeholder="Select currency">
            <Option value="UGX">UGX</Option>
            <Option value="TZS">TZS</Option>
          </Select>
        </Form.Item>

        {/* ► Category */}
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Enter category!" }]}
        >
          <Input placeholder="Enter category" />
        </Form.Item>

        {/* ► Validity */}
        <Form.Item
          label="Validity"
          name="validity"
          rules={[{ required: true, message: "Enter validity!" }]}
        >
          <Input placeholder="Enter validity" />
        </Form.Item>

        {/* ► Submit */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
