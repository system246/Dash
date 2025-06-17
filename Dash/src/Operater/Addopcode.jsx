import React, { useState } from "react";
import { Button, Input, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import addOpcodeAPI from "./AddopcodeHook";
 
const AddOpcode = () => {
  const [opcode, setOpcode] = useState("");
  const [id, setId] = useState("");
 
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
 
  const navigate = useNavigate();
 
  const handleSubmit = async () => {
    if (!opcode || !id) {
      setMessage("Please fill all the fields");
      setMessageType("error");
      setShowMessage(true);
      return;
    }
 
    const payload = {
      id,
      opcode,
    };
 
    setLoading(true);
    try {
      const result = await addOpcodeAPI(payload);
      setLoading(false);
 
      if (result.success) {
        setMessage("Opcode added successfully");
        setMessageType("success");
        setShowMessage(true);
      } else {
        setMessage(result.message || "Failed to add opcode");
        setMessageType("error");
        setShowMessage(true);
      }
    } catch (error) {
      console.error("API Error:", error);
      setLoading(false);
      setMessage("An error occurred while adding the opcode.");
      setMessageType("error");
      setShowMessage(true);
    }
  };
 
  const handleModalClose = () => {
    setShowMessage(false);
    if (messageType === "success") {
      setOpcode("");
      setId("");
    }
  };
 
  return (
    <div className="absolute inset-0 overflow-hidden top-12 left-50 py-4">
      <div className="top flex justify-between items-center py-5 px-6">
        <h1 className="text-2xl py-3 font-mono font-bold">Add Opcode</h1>
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button className="text-xl" onClick={() => navigate("/Opcodes")}>
            ← Back to Opcode
          </Button>
        </motion.div>
      </div>
 
     <Space
  wrap
  className="border-none shadow-2xl px-4 mx-4 rounded-2xl py-2 bg-white"
>
  <div>
    <label style={{ fontWeight: "500" }}>Opcode : </label>
    <Input
      placeholder="Enter Opcode"
      value={opcode}
      onChange={(e) => setOpcode(e.target.value)}
      style={{ width: 180 }}
    />
  </div>

  <div>
    <label style={{ fontWeight: "500" }}>Opcode ID : </label>
    <Input
      placeholder="Enter Opcode ID"
      value={id}
      onChange={(e) => setId(e.target.value)}
      style={{ width: 150 }}
    />
  </div>

  <Button type="primary" loading={loading} onClick={handleSubmit}>
    <PlusOutlined /> Add Opcode
  </Button>
</Space>

 
      {showMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-5">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-96 text-center">
            <h2 className="text-lg font-semibold mb-4">
              {messageType === "success" ? "Success" : "Error"}
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
 
export default AddOpcode;