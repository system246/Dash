import axios from "axios";
 
const addOpcodeAPI = async ({ id, opcode }) => {
  try {
    const payload = {
      id: id.toString(),        // ensure id is sent as a string
      opcode: opcode.trim(),    // remove extra spaces if any
    };
 
    const response = await axios.post(
      "http://172.16.130.8:6060/collect/bundle/opcode-add",
      payload
    );
 
    if (response.status === 200 || response.status === 201) {
      return { success: true, message: "Opcode added successfully" };
    } else {
      return { success: false, message: response.data?.message || "Failed to add opcode" };
    }
  } catch (error) {
    console.error("Add Opcode API Error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Server error while adding opcode",
    };
  }
};
 
export default addOpcodeAPI;