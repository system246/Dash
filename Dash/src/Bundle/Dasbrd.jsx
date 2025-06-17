// ✅ Clean and fixed Dasbrd.jsx with proper row update, editing toggle, flag update, and filtering logic

// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   Input,
//   Button,
//   Form,
//   Select,
//   Modal,
//   message,
// } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { toast } from "react-toastify";
// import useAxios from "./Getdata";
// import useUpdtFlagchnl from "./update_flag_Chnl";
// import useGetopcodeHook from "../Operater/OpcodeHook";
// import AddBundleModal from "./Add_New_Row";
// import DashTop from "./DashTop/DashTop";
// import useBundleUpdate from "../Bundle/DashTop/UpdateDumyDash";
// import useChannelHook from "../Channel/GetHook";

// const { Option } = Select;

// const EditableCell = ({ editing, dataIndex, title, inputType, record, children, ...restProps }) => (
//   <td {...restProps}>
//     {editing ? (
//       dataIndex === "flag" ? (
//         <Form.Item name={dataIndex} style={{ margin: 0 }}>
//           <Select>
//             <Option value="ACTIVE">ACTIVE</Option>
//             <Option value="INACTIVE">INACTIVE</Option>
//             <Option value="PENDING">PENDING</Option>
//           </Select>
//         </Form.Item>
//       ) : (
//         <Form.Item name={dataIndex} style={{ margin: 0 }}>
//           <Input />
//         </Form.Item>
//       )
//     ) : (
//       children
//     )}
//   </td>
// );

// const Dasbrd = () => {
//   const { data, loading, error, refetch, setFilters } = useAxios();
//   const { updateData: updateFlags } = useUpdtFlagchnl();
//   const { data: opcodes = [], fetchopData: fetchOpcodes } = useGetopcodeHook();
//   const { updateBundles } = useBundleUpdate();
//   const { data: channel = [], fetchchnlData } = useChannelHook();

//   const [form] = Form.useForm();
//   const [tableData, setTableData] = useState([]);
//   const [editingKey, setEditingKey] = useState("");
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [selectedChannels, setSelectedChannels] = useState([]);
//   const [selectedOpcode, setSelectedOpcode] = useState("");
//   const [selectedFlag, setSelectedFlag] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [showFilteredTable, setShowFilteredTable] = useState(false);
//   const [flagLoading, setFlagLoading] = useState(false);
//   const [addBundleModalVisible, setAddBundleModalVisible] = useState(false);

//   useEffect(() => { fetchOpcodes(); fetchchnlData(); }, []);
//   useEffect(() => { if (Array.isArray(data)) setTableData(data); }, [data]);
//   useEffect(() => {
//     if (selectedOpcode || selectedFlag) {
//       const filtered = data.filter((item) => {
//         const matchOpcode = selectedOpcode ? item.opCode === selectedOpcode : true;
//         const matchFlag = selectedFlag ? item.flag === selectedFlag : true;
//         return matchOpcode && matchFlag;
//       });
//       setFilteredData(filtered);
//       setShowFilteredTable(true);
//     } else {
//       setShowFilteredTable(false);
//     }
//   }, [selectedOpcode, selectedFlag, data]);

//   const isEditing = (record) => record.id === editingKey;

//   const edit = (record) => {
//     form.setFieldsValue({ ...record });
//     setEditingKey(record.id);
//   };

//   const cancel = () => setEditingKey("");

//   const updateRow = async (id) => {
//     try {
//       const row = await form.validateFields();
//       const newData = [...(showFilteredTable ? filteredData : tableData)];
//       const index = newData.findIndex((item) => item.id === id);
//       if (index > -1) {
//         const updatedRow = { ...newData[index], ...row };
//         const result = await updateBundles([updatedRow]);
//         if (result.success) {
//           newData.splice(index, 1, updatedRow);
//           setTableData((prev) =>
//             prev.map((item) => (item.id === id ? updatedRow : item))
//           );
//           setFilteredData((prev) =>
//             prev.map((item) => (item.id === id ? updatedRow : item))
//           );
//           setEditingKey("");
//           toast.success("Row updated successfully");
//         } else {
//           toast.error(result.message || "Update failed");
//         }
//       }
//     } catch (err) {
//       toast.error("Validation failed");
//     }
//   };

//   const handleFlagUpdate = async () => {
//     if (!selectedRowKeys.length) return toast.warning("Select rows first");
//     const items = tableData.filter((i) => selectedRowKeys.includes(i.id)).map((i) => {
//       const isActivating = i.flag === "INACTIVE";
//       return {
//         bundleId: i.bundleId,
//         flag: isActivating ? "ACTIVE" : "INACTIVE",
//         channels: isActivating ? selectedChannels : [],
//         isActivating,
//       };
//     });

//     if (items.some((i) => i.isActivating && selectedChannels.length === 0)) {
//       return toast.warning("Select channels when activating");
//     }

//     try {
//       setFlagLoading(true);
//       await updateFlags(items.map(({ isActivating, ...rest }) => rest));
//       toast.success("Flags updated");
//       setSelectedRowKeys([]);
//       setSelectedChannels([]);
//       refetch();
//     } catch {
//       toast.error("Flag update failed");
//     } finally {
//       setTimeout(() => setFlagLoading(false), 2000);
//     }
//   };

//   const columns = [
//     { title: "ID", dataIndex: "id" },
//     { title: "Bundle ID", dataIndex: "bundleId" },
//     { title: "Bundle Name", dataIndex: "bundleName", editable: true },
//     { title: "Amount", dataIndex: "amount", editable: true },
//     { title: "Bundle Description", dataIndex: "bundleDescription", editable: true },
//     { title: "Bundle Detail Description", dataIndex: "bundleDetailsDescription", editable: true },
//     { title: "Currency", dataIndex: "currency", editable: true },
//     {
//       title: "Channel",
//       dataIndex: "channel",
//       render: (channel) => Array.isArray(channel) ? channel.join(", ") : channel,
//     },
//     { title: "Category", dataIndex: "category", editable: true },
//     { title: "Operator Code", dataIndex: "opCode" },
//     { title: "Validity", dataIndex: "validity", editable: true },
//     {
//       title: "Flag",
//       dataIndex: "flag",
//       render: (flag) => (
//         <span style={{ backgroundColor: flag === "ACTIVE" ? "#4CAF50" : flag === "INACTIVE" ? "#FF9800" : "#f44336", color: "#fff", padding: "4px 8px", borderRadius: "4px" }}>{flag}</span>
//       ),
//     },
//     {
//       title: "Actions",
//       dataIndex: "actions",
//       render: (_, record) => {
//         const editable = isEditing(record);
//         return editable ? (
//           <span>
//             <Button onClick={() => updateRow(record.id)} type="link">Update</Button>
//             <Button onClick={cancel} type="link" danger>Cancel</Button>
//           </span>
//         ) : (
//           <Button disabled={editingKey !== ""} onClick={() => edit(record)} type="link">Edit</Button>
//         );
//       },
//     },
//   ];

//   const mergedColumns = columns.map((col) => {
//     if (!col.editable) return col;
//     return {
//       ...col,
//       onCell: (record) => ({
//         record,
//         inputType: "text",
//         dataIndex: col.dataIndex,
//         title: col.title,
//         editing: isEditing(record),
//       }),
//     };
//   });

//   return (
//     <div className="p-4">
//       <DashTop />
//       <div className="my-4 space-y-3">
//         <div className="flex flex-wrap gap-4">
//           <Select
//             value={selectedOpcode}
//             onChange={(v) => { setSelectedOpcode(v); setSelectedFlag(""); }}
//             style={{ width: 180 }}
//             placeholder="Select OPCODE"
//             allowClear
//           >
//             {opcodes.map((op) => (
//               <Option key={op.id} value={op.opcode}>{op.opcode}</Option>
//             ))}
//           </Select>

//           {selectedOpcode && (
//             <Select
//               value={selectedFlag}
//               onChange={(v) => setSelectedFlag(v)}
//               placeholder="Select Flag"
//               style={{ width: 140 }}
//               allowClear
//             >
//               <Option value="ACTIVE">ACTIVE</Option>
//               <Option value="INACTIVE">INACTIVE</Option>
//             </Select>
//           )}

//           {selectedRowKeys.length > 0 && (
//             <Select
//               mode="multiple"
//               value={selectedChannels}
//               onChange={setSelectedChannels}
//               placeholder="Select Channels"
//               style={{ minWidth: 200 }}
//             >
//               {channel.map((c) => (
//                 <Option key={c.id} value={c.channel}>{c.channel}</Option>
//               ))}
//             </Select>
//           )}

//           <Button type="primary" onClick={handleFlagUpdate} loading={flagLoading}>Update Flag</Button>
//           <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddBundleModalVisible(true)}>Add Bundle</Button>
//         </div>

//         <Form form={form} component={false}>
//           <Table
//             components={{ body: { cell: EditableCell } }}
//             bordered
//             loading={loading}
//             dataSource={showFilteredTable ? filteredData : tableData}
//             columns={mergedColumns}
//             rowClassName="editable-row"
//             rowKey="id"
//             rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
//             pagination={{ pageSize: 80 }}
//             scroll={{ x: "max-content" }}
//           />
//         </Form>
//       </div>

//       <AddBundleModal
//         visible={addBundleModalVisible}
//         onClose={() => setAddBundleModalVisible(false)}
//         onSuccess={refetch}
//       />
//     </div>
//   );
// };

// export default Dasbrd;
// Dasbrd.jsx
// Dasbrd.jsx
// import React, { useState, useEffect } from "react";
// import { Table, Button, Select, message } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { toast } from "react-toastify";

// // Hooks
// import useAxios from "./Getdata";
// import useUpdtFlagchnl from "./update_flag_Chnl";
// import useGetopcodeHook from "../Operater/OpcodeHook";
// import useChannelHook from "../Channel/GetHook";

// // Components
// import AddBundleModal from "./Add_New_Row";
// import EditBundleModal from "./EditBundleModal";
// import DashTop from "./DashTop/DashTop";

// const { Option } = Select;

// const Dasbrd = () => {
//   const { data, loading, error, refetch, setFilters } = useAxios();
//   const { updateData: updateFlags } = useUpdtFlagchnl();
//   const { data: opcodes = [], fetchopData: fetchOpcodes } = useGetopcodeHook();
//   const { data: channel = [], fetchchnlData } = useChannelHook();

//   const [tableData, setTableData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [showFilteredTable, setShowFilteredTable] = useState(false);
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [selectedChannels, setSelectedChannels] = useState([]);
//   const [flagLoading, setFlagLoading] = useState(false);
//   const [addBundleModalVisible, setAddBundleModalVisible] = useState(false);
//   const [selectedOpcode, setSelectedOpcode] = useState("");
//   const [selectedFlag, setSelectedFlag] = useState("");
//   const [editVisible, setEditVisible] = useState(false);
//   const [selectedBundle, setSelectedBundle] = useState(null);

//   // Initial fetch
//   useEffect(() => {
//     fetchchnlData();
//     fetchOpcodes();
//     refetch();
//   }, []);

//   // Trigger API refetch when filters change
//   useEffect(() => {
//     const filters = {};
//     if (selectedOpcode) filters.opcode = selectedOpcode;
//     if (selectedFlag) filters.flag = selectedFlag;
//     setFilters(filters);

//     if (selectedOpcode || selectedFlag) {
//       refetch();
//     }
//   }, [selectedOpcode, selectedFlag]);

//   // When data arrives, apply filter (client-side display)
//   useEffect(() => {
//     if (Array.isArray(data)) {
//       setTableData(data);

//       if (selectedOpcode || selectedFlag) {
//         const filtered = data.filter((item) => {
//           const matchOpcode = selectedOpcode ? item.opCode === selectedOpcode : true;
//           const matchFlag = selectedFlag ? item.flag === selectedFlag : true;
//           return matchOpcode && matchFlag;
//         });
//         setFilteredData(filtered);
//         setShowFilteredTable(true);
//       } else {
//         setShowFilteredTable(false);
//       }
//     }
//   }, [data, selectedOpcode, selectedFlag]);

//   // Flag update handler
//   const handleFlagUpdate = async () => {
//     if (!selectedRowKeys.length) {
//       toast.warning("Please select at least one row.");
//       return;
//     }

//     const selectedItems = tableData
//       .filter((item) => selectedRowKeys.includes(item.id))
//       .map((item) => {
//         const isActivating = item.flag === "INACTIVE";
//         return {
//           bundleId: item.bundleId,
//           flag: isActivating ? "ACTIVE" : "INACTIVE",
//           channels: isActivating ? selectedChannels : item.channel,
//           isActivating,
//         };
//       });

//     if (selectedItems.some((item) => item.isActivating && !selectedChannels.length)) {
//       toast.warning("Please select channel(s) when activating.");
//       return;
//     }

//     try {
//       setFlagLoading(true);
//       const payload = selectedItems.map(({ isActivating, ...rest }) => rest);
//       await updateFlags(payload);
//       toast.success("Flags updated successfully!");
//       setSelectedRowKeys([]);
//       setSelectedChannels([]);
//       refetch();
//     } catch (error) {
//       toast.error("Flag update failed.");
//     } finally {
//       setFlagLoading(false);
//     }
//   };

//   const openEditModal = (record) => {
//     setSelectedBundle(record);
//     setEditVisible(true);
//   };

//   const fetchDataAgain = () => {
//     refetch();
//     setEditVisible(false);
//   };

//   const columns = [
//     { title: "ID", dataIndex: "id" },
//     { title: "Bundle ID", dataIndex: "bundleId" },
//     { title: "Bundle Name", dataIndex: "bundleName" },
//     { title: "Amount", dataIndex: "amount" },
//     { title: "Bundle Description", dataIndex: "bundleDescription" },
//     { title: "Bundle Detail Description", dataIndex: "bundleDetailsDescription" },
//     { title: "Currency", dataIndex: "currency" },
//     {
//       title: "Channel",
//       dataIndex: "channel",
//       render: (channel) => (Array.isArray(channel) ? channel.join(", ") : channel || "N/A"),
//     },
//     { title: "Category", dataIndex: "category" },
//     { title: "Operator Code", dataIndex: "opCode" },
//     { title: "Validity", dataIndex: "validity" },
//     {
//       title: "Flag",
//       dataIndex: "flag",
//       render: (flag) => (
//         <span
//           style={{
//             backgroundColor:
//               flag === "ACTIVE"
//                 ? "#4CAF50"
//                 : flag === "INACTIVE"
//                 ? "#FF9800"
//                 : "#f44336",
//             color: "#fff",
//             padding: "4px 8px",
//             borderRadius: "4px",
//           }}
//         >
//           {flag || "N/A"}
//         </span>
//       ),
//     },
//     {
//       title: "Actions",
//       fixed: "right",
//       render: (_, record) => <Button onClick={() => openEditModal(record)}>Edit</Button>,
//     },
//   ];

//   if (error) {
//     return <p className="text-red-500 px-6 py-3">Error: {error.message || "Failed to load data."}</p>;
//   }

//   return (
//     <div className="absolute top-14 px-5 m-2 inset-0 md:left-[180px] border border-gray-200 rounded-lg shadow-md overflow-x-hidden overflow-y-auto">
//       <DashTop />
//       <hr className="my-2 border-t border-gray-300 opacity-40" />

//       {/* Filters and Actions */}
//       <div className="sticky top-0 z-30 bg-white pt-4 pb-2 space-y-3">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div className="flex flex-wrap gap-2">
//             <div className="flex items-center gap-2">
//               <h1 className="text-md text-[#0f1e1e]">Select Opcode :</h1>
//               <Select
//                 value={selectedOpcode}
//                 onChange={(v) => {
//                   setSelectedOpcode(v);
//                   setSelectedFlag("");
//                 }}
//                 style={{ width: 140 }}
//                 placeholder="Select OPCODE"
//                 allowClear
//               >
//                 {opcodes.map((op) => (
//                   <Option key={op.id} value={op.opcode}>{op.opcode}</Option>
//                 ))}
//               </Select>
//             </div>

//             {selectedOpcode && (
//               <div className="flex items-center gap-2">
//                 <h1 className="text-md text-[#0f1e1e]">Select Flag :</h1>
//                 <Select
//                   style={{ width: 120 }}
//                   placeholder="Select Flag"
//                   value={selectedFlag}
//                   onChange={setSelectedFlag}
//                   allowClear
//                 >
//                   <Option value="ACTIVE">ACTIVE</Option>
//                   <Option value="INACTIVE">INACTIVE</Option>
//                 </Select>
//               </div>
//             )}

//             {selectedRowKeys.length > 0 && (
//               <div className="flex items-center gap-3">
//                 <label className="text-black font-md">Select Channels:</label>
//                 <Select
//                   mode="multiple"
//                   allowClear
//                   placeholder="Choose channels"
//                   style={{ width: 180 }}
//                   value={selectedChannels}
//                   onChange={setSelectedChannels}
//                 >
//                   <Option value="All">All</Option>
//                   {channel.map((item) => (
//                     <Option key={item.id} value={item.channel}>{item.channel}</Option>
//                   ))}
//                 </Select>
//               </div>
//             )}
//           </div>

//           <div className="flex items-center gap-3">
//             <Button
//               type="primary"
//               loading={flagLoading}
//               onClick={handleFlagUpdate}
//               className="bg-blue-500 text-white hover:bg-blue-600"
//             >
//               Update
//             </Button>
//             <Button
//               icon={<PlusOutlined />}
//               type="primary"
//               onClick={() => setAddBundleModalVisible(true)}
//               className="bg-green-500 text-white hover:bg-green-600"
//             >
//               Add Bundle
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <h1 className="text-lg underline font-semibold text-black mt-4 mb-2">
//         {selectedOpcode ? `${selectedOpcode} Bundle` : "All Bundle"}
//       </h1>

//       <Table
//         bordered
//         loading={loading}
//         dataSource={showFilteredTable ? filteredData : tableData}
//         columns={columns}
//         rowKey="id"
//         rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
//         pagination={{ pageSize: 80 }}
//         scroll={{ x: "max-content" }}
//       />

//       {/* Modals */}
//       <EditBundleModal
//         visible={editVisible}
//         onClose={() => setEditVisible(false)}
//         onSuccess={fetchDataAgain}
//         initialData={selectedBundle}
//       />

//       <AddBundleModal
//         visible={addBundleModalVisible}
//         onClose={() => setAddBundleModalVisible(false)}
//         onSuccess={refetch}
//       />
//     </div>
//   );
// };

// export default Dasbrd;


import React, { useState, useEffect } from "react";
import { Table, Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

// Hooks
import useAxios from "./Getdata";
import useUpdtFlagchnl from "./update_flag_Chnl";
import useGetopcodeHook from "../Operater/OpcodeHook";
import useChannelHook from "../Channel/GetHook";

// Components
import AddBundleModal from "./Add_New_Row";
import EditBundleModal from "./EditBundleModal";
import DashTop from "./DashTop/DashTop";

const { Option } = Select;

const Dasbrd = () => {
  const { data, loading, error, refetch, setFilters } = useAxios();
  const { updateData: updateFlags } = useUpdtFlagchnl();
  const { data: opcodes = [], fetchopData } = useGetopcodeHook();
  const { data: channels = [], fetchchnlData } = useChannelHook();

  const [tableData, setTableData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [flagLoading, setFlagLoading] = useState(false);
  const [addBundleModalVisible, setAddBundleModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedOpcode, setSelectedOpcode] = useState("");
  const [selectedFlag, setSelectedFlag] = useState("");
  const [selectedBundle, setSelectedBundle] = useState(null);

  // Initial fetch
  useEffect(() => {
    fetchchnlData();
    fetchopData();
    refetch();
  }, []);

  // Update table data when API responds
  useEffect(() => {
    if (Array.isArray(data)) setTableData(data);
  }, [data]);

  // Update filters and refetch data from API
  useEffect(() => {
    const filters = {};
    if (selectedOpcode) filters.opcode = selectedOpcode;
    if (selectedFlag) filters.flag = selectedFlag;

    setFilters(filters);
    refetch();
  }, [selectedOpcode, selectedFlag]);

  // Handle flag update
  const handleFlagUpdate = async () => {
    if (!selectedRowKeys.length) {
      toast.warning("Please select at least one row.");
      return;
    }

    const selectedItems = tableData
      .filter((item) => selectedRowKeys.includes(item.id))
      .map((item) => {
        const isActivating = item.flag === "INACTIVE";
        return {
          bundleId: item.bundleId,
          flag: isActivating ? "ACTIVE" : "INACTIVE",
          channels: isActivating ? selectedChannels : item.channel,
          isActivating,
        };
      });

    if (selectedItems.some((item) => item.isActivating && !selectedChannels.length)) {
      toast.warning("Please select channel(s) when activating.");
      return;
    }

    try {
      setFlagLoading(true);
      const payload = selectedItems.map(({ isActivating, ...rest }) => rest);
      await updateFlags(payload);
      toast.success("Flags updated successfully!");
      setSelectedRowKeys([]);
      setSelectedChannels([]);
      refetch();
    } catch (error) {
      toast.error("Flag update failed.");
    } finally {
      setFlagLoading(false);
    }
  };

  // Handle edit modal open
  const openEditModal = (record) => {
    setSelectedBundle(record);
    setEditVisible(true);
  };

  const fetchDataAgain = () => {
    refetch();
    setEditVisible(false);
  };

  // Table columns
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Bundle ID", dataIndex: "bundleId" },
    { title: "Bundle Name", dataIndex: "bundleName" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Bundle Description", dataIndex: "bundleDescription" },
    { title: "Bundle Detail Description", dataIndex: "bundleDetailsDescription" },
    { title: "Currency", dataIndex: "currency" },
    {
      title: "Channel",
      dataIndex: "channel",
      render: (channel) => (Array.isArray(channel) ? channel.join(", ") : channel || "N/A"),
    },
    { title: "Category", dataIndex: "category" },
    { title: "Operator Code", dataIndex: "opCode" },
    { title: "Validity", dataIndex: "validity" },
    {
      title: "Flag",
      dataIndex: "flag",
      render: (flag) => (
        <span
          style={{
            backgroundColor:
              flag === "ACTIVE"
                ? "#4CAF50"
                : flag === "INACTIVE"
                ? "#FF9800"
                : "#f44336",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          {flag || "N/A"}
        </span>
      ),
    },
    {
      title: "Actions",
      fixed: "right",
      render: (_, record) => (
        <Button onClick={() => openEditModal(record)}>Edit</Button>
      ),
    },
  ];

  // Render
  if (error) {
    return (
      <p className="text-red-500 px-6 py-3">
        Error: {error.message || "Failed to load data."}
      </p>
    );
  }

  return (
    <div className="absolute top-14 px-5 m-2 inset-0 md:left-[180px] border border-gray-200 rounded-lg shadow-md overflow-x-hidden overflow-y-auto">
      <DashTop />
      <hr className="my-2 border-t border-gray-300 opacity-40" />

      {/* Filters and Actions */}
      <div className="sticky top-0 z-30 bg-white pt-4 pb-2 space-y-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-md text-[#0f1e1e]">Select Opcode :</h1>
              <Select
                value={selectedOpcode}
                onChange={(v) => {
                  setSelectedOpcode(v);
                  setSelectedFlag("");
                }}
                style={{ width: 140 }}
                placeholder="Select OPCODE"
                allowClear
              >
                {opcodes.map((op) => (
                  <Option key={op.id} value={op.opcode}>
                    {op.opcode}
                  </Option>
                ))}
              </Select>
            </div>

            {selectedOpcode && (
              <div className="flex items-center gap-2">
                <h1 className="text-md text-[#0f1e1e]">Select Flag :</h1>
                <Select
                  style={{ width: 120 }}
                  placeholder="Select Flag"
                  value={selectedFlag}
                  onChange={setSelectedFlag}
                  allowClear
                >
                  <Option value="ACTIVE">ACTIVE</Option>
                  <Option value="INACTIVE">INACTIVE</Option>
                </Select>
              </div>
            )}

            {selectedRowKeys.length > 0 && (
              <div className="flex items-center gap-3">
                <label className="text-black font-md">Select Channels:</label>
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Choose channels"
                  style={{ width: 180 }}
                  value={selectedChannels}
                  onChange={setSelectedChannels}
                >
                  <Option value="All">All</Option>
                  {channels.map((item) => (
                    <Option key={item.id} value={item.channel}>
                      {item.channel}
                    </Option>
                  ))}
                </Select>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="primary"
              loading={flagLoading}
              onClick={handleFlagUpdate}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Update
            </Button>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => setAddBundleModalVisible(true)}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              Add Bundle
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <h1 className="text-lg underline font-semibold text-black mt-4 mb-2">
        {selectedOpcode ? `${selectedOpcode} Bundle` : "All Bundle"}
      </h1>

      <Table
        bordered
        loading={loading}
        dataSource={tableData}
        columns={columns}
        rowKey="id"
        rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
        pagination={{ pageSize: 80 }}
        scroll={{ x: "max-content" }}
      />

      {/* Modals */}
      <EditBundleModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        onSuccess={fetchDataAgain}
        initialData={selectedBundle}
      />

      <AddBundleModal
        visible={addBundleModalVisible}
        onClose={() => setAddBundleModalVisible(false)}
        onSuccess={refetch}
      />
    </div>
  );
};

export default Dasbrd;
