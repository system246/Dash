// src/components/EditBundleModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, notification } from "antd";
import { toast } from "react-toastify";
 import useUpdateBundleRow from "./UpdateBundleRow"
import useGetopcodeHook from "../Operater/OpcodeHook";
import useChannelHook from "../Channel/GetHook";

const { Option } = Select;

export default function EditBundleModal({ visible, onClose, onSuccess, initialData }) {
  const [form] = Form.useForm();
  const [editData, setEditData] = useState(initialData);

  const { updateBundles } = useUpdateBundleRow();
  const { data: opcodes = [], fetchopData } = useGetopcodeHook();
  const { data: channel = [], fetchchnlData } = useChannelHook();

  useEffect(() => {
    fetchchnlData();
    fetchopData();
  }, []);

  useEffect(() => {
    if (visible && initialData) {
      setEditData(initialData);
      form.setFieldsValue({
        ...initialData,
       channel: initialData.channel
  ? Array.isArray(initialData.channel)
    ? initialData.channel
    : [initialData.channel]
  : [],

      });
    }
  }, [visible, initialData]);

const handleUpdate = async () => {
  const values = form.getFieldsValue();
  const dataToSend = {
    ...values,
    channel: Array.isArray(values.channel) ? values.channel : [values.channel],
  };

  try {
    await updateBundles([dataToSend]);
    toast.success("Bundle updated successfully");
    notification.success({ message: "Success", description: "Bundle updated successfully." });

    onSuccess?.();
    onClose();
  } catch (error) {
    toast.error("Failed to update bundle");
    notification.error({ message: "Error", description: "There was a problem updating the bundle." });
  }
};


  const handleCancel = () => {
    form.setFieldsValue(initialData);
    setEditData(initialData);
    onClose();
  };

  return (
    <Modal
      title="Edit Bundle"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleUpdate}
        onValuesChange={(_, allValues) => setEditData(allValues)}
      >
        <Form.Item label="ID" name="id" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>

         <Form.Item
          label="Bundle ID"
          name="bundleId"
          rules={[{ required: true, message: "Please enter the bundle ID!" }]}
        >
          <Input />
        </Form.Item>

          <Form.Item
          label="Operator Code"
          name="opCode"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select operator code" disabled>
            {opcodes.map((op) => (
              <Option key={op.id} value={op.opcode}>
                {op.opcode}
              </Option>
            ))}
          </Select>
        </Form.Item>


        <Form.Item
          label="Channel"
          name="channel"
          rules={[{ required: true, message: "Select channel!" }]}
        >
       <Select mode="multiple" placeholder="Select channel(s)">
                {Array.isArray(channel) &&
                    channel.map((chnl) => (
                    <Option key={chnl.id} value={chnl.channel}>
                        {chnl.channel}
                    </Option>
                    ))}
                </Select>


        </Form.Item>

        <Form.Item
          label="Bundle Name"
          name="bundleName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Bundle Description"
          name="bundleDescription"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Bundle Details Description"
          name="bundleDetailsDescription"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Currency"
          name="currency"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select currency">
            <Option value="UGX">UGX</Option>
            <Option value="TZS">TZS</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

      

        <Form.Item
          label="Validity"
          name="validity"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Flag"
          name="flag"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select status">
            <Option value="ACTIVE">Active</Option>
            <Option value="INACTIVE">Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update
          </Button>
          <Button onClick={handleCancel} style={{ marginTop: 10 }} block>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
