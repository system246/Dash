import React, { useState } from "react";
import { Button, Input, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import addChannelAPI from "./Add_ChannelHook";
 
const AddChannel = () => {
  const [channel, setChannel] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
 
  const navigate = useNavigate();
 
const handleSubmit = async () => {
  if (!channel.trim()) {
    setMessage("Please enter a channel");
    setMessageType("error");
    setShowMessage(true);
    return;
  }

  const payload = { channel };
  setLoading(true);

  try {
    const result = await addChannelAPI(payload);
    setLoading(false);

    // 👇 Show full raw response JSON as message
    setMessage(JSON.stringify(result.data, null, 2));
    setMessageType(result.success ? "success" : "error");
    setShowMessage(true);
  } catch (error) {
    console.error("API Error:", error);
    setLoading(false);
    setMessage("An unexpected error occurred.");
    setMessageType("error");
    setShowMessage(true);
  }
};


 
  const handleModalClose = () => {
    setShowMessage(false);
    if (messageType === "success") {
      setChannel("");
    }
  };
 
  return (
    <div className="absolute inset-0 overflow-hidden top-12 left-50 py-4">
      <div className="top flex justify-between items-center py-5 px-6">
        <h1 className="text-2xl py-3 font-mono font-bold">Add Channel</h1>
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button className="text-xl" onClick={() => navigate("/Channel")}>
            ← Back to Channel
          </Button>
        </motion.div>
      </div>
 
      <Space
        wrap
        className="border-none shadow-2xl px-4 mx-4 rounded-2xl py-2 bg-white"
      >
        <div>
          <label style={{ fontWeight: "500" }}>Channel : </label>
          <Input
            placeholder="Add Channel"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            style={{ width: 180 }}
          />
        </div>
 
        <Button type="primary" loading={loading} onClick={handleSubmit}>
          <PlusOutlined /> Add Channel
        </Button>
      </Space>
 
      {showMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-5">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-96 text-center">
            <h2 className="text-lg font-semibold mb-4">
              {/* {messageType === "success" ? "Success" : ""} */}
            </h2>
            <p className="mb-6">{message}</p>
            <Button type="primary" onClick={handleModalClose}>
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default AddChannel;