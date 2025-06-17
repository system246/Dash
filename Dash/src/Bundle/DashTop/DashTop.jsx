import React, { useState, useEffect, useRef } from "react";
import { Select, Button, Input, Spin } from "antd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useBundleFetch from "./GetDumy";
import useBundleUpdate from "./UpdateDumyDash";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import useCategoryFetch from "../../Category/CategoryHook";
import useValidityFetch from "../../VAL/ValidHook";
import useGetopcodeHook from "../../Operater/OpcodeHook";
import useChannelHook from "../../Channel/GetHook";
import { FaCircleXmark } from "react-icons/fa6";

const { Option } = Select;
const type = "row";

// const DraggableRow = ({
//   record,
//   index,
//   moveRow,
//   isEditing,
//   onEdit,
//   onChange,
// }) => {
//   const ref = useRef(null);

//   const [, drop] = useDrop({
//     accept: type,
//     hover(item) {
//       if (item.index !== index) {
//         moveRow(item.index, index);
//         item.index = index;
//       }
//     },
//   });

//   const [, drag] = useDrag({
//     type,
//     item: { index },
//   });

//   drag(drop(ref));

//   return (
//     <tr ref={ref} className="border-b hover:bg-gray-100 transition">
//       <td className="p-3">{index + 1}</td>
//       <td className="p-3">{record.ID}</td>
//       <td className="p-3">{record.BUNDLEID}</td>
//       <td className="p-3">{record.OPCODE}</td>
//       <td className="p-3">{record.CHANNEL}</td>
//       <td className="p-3">
//       {isEditing ? (
//         <Input
//           size="small"
//           value={record.CATEGORY}
//           onChange={(e) => onChange("CATEGORY", e.target.value, index)}
//         />
//          ) : (
//           record.CATEGORY
//         )}
//       </td>
//       <td className="p-3">
//         {isEditing ? (
//           <Input
//             size="small"
//             value={record.VALIDITY}
//             onChange={(e) => onChange("VALIDITY", e.target.value, index)}
//           />
//         ) : (
//           record.VALIDITY
//         )}
//       </td>
//       <td className="p-3">
//         {isEditing ? (
//           <Input
//             size="small"
//             value={record.AMOUNT}
//             onChange={(e) => onChange("AMOUNT", e.target.value, index)}
//           />
//         ) : (
//           <span className="font-semibold">{record.AMOUNT}</span>
//         )}
//       </td>
//       <td className="p-3 text-center">{isEditing ? (
//         <Input
//           size="small"
//           value={record.BUNDLEDESCRIPTION}
//           onChange={(e) => onChange("BUNDLEDESCRIPTION", e.target.value, index)}
//         />
//       ) : (
//         record.BUNDLEDESCRIPTION
//       )}</td>
//       <td className="p-3 text-center">{isEditing ? (
//         <Input
//           size="small"
//           value={record.BUNDLEDETAILSDESCRIPTION}
//           onChange={(e) =>
//             onChange("BUNDLEDETAILSDESCRIPTION", e.target.value, index)
//           }
//         />
//       ) : (
//         record.BUNDLEDETAILSDESCRIPTION
//       )}</td>
//       <td className="p-3">{record.CURRENCY}</td>
//       <td className="p-3">
//         {isEditing ? (
//           <Select
//             size="small"
//             value={record.FLAG}
//             onChange={(value) => onChange("FLAG", value, index)}
//             style={{ width: 100 }}
//           >
//             <Option value="ACTIVE">ACTIVE</Option>
//             <Option value="INACTIVE">INACTIVE</Option>
//           </Select>
//         ) : (
//           <span
//             className={`font-semibold ${
//               record.FLAG === "ACTIVE" ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {record.FLAG}
//           </span>
//         )}
//       </td>
//       <td className="p-3">
//         <Button size="small" type="link" onClick={() => onEdit(record.ID)}>
//           Edit
//         </Button>
//       </td>
//     </tr>
//   );
// };

const DraggableRow = ({
  record,
  index,
  moveRow,
  isEditing,
  onEdit,
  onChange,
  onUpdate={onUpdate}

}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: type,
    hover(item) {
      if (item.index !== index) {
        moveRow(item.index, index);
        item.index = index;
      }
    },
  });

  const [, drag] = useDrag({
    type,
    item: { index },
  });

  drag(drop(ref));

  return (
    <tr ref={ref} className="border-b hover:bg-gray-100 transition">
      <td className="p-3">{index + 1}</td>
      <td className="p-3">{record.ID}</td>
      <td className="p-3">{record.BUNDLEID}</td>
      <td className="p-3">{record.OPCODE}</td>
      <td className="p-3">{record.CHANNEL}</td>

      <td className="p-3">
        {isEditing ? (
          <Input
            size="small"
            value={record.CATEGORY}
            onChange={(e) => onChange("CATEGORY", e.target.value, index)}
          />
        ) : (
          record.CATEGORY
        )}
      </td>

      <td className="p-3">
        {isEditing ? (
          <Input
            size="small"
            value={record.VALIDITY}
            onChange={(e) => onChange("VALIDITY", e.target.value, index)}
          />
        ) : (
          record.VALIDITY
        )}
      </td>

      <td className="p-3">
        {isEditing ? (
          <Input
            size="small"
            value={record.AMOUNT}
            onChange={(e) => onChange("AMOUNT", e.target.value, index)}
          />
        ) : (
          <span className="font-semibold">{record.AMOUNT}</span>
        )}
      </td>

      <td className="p-3">
        {isEditing ? (
          <Input
            size="small"
            value={record.BUNDLEDESCRIPTION}
            onChange={(e) => onChange("BUNDLEDESCRIPTION", e.target.value, index)}
          />
        ) : (
          record.BUNDLEDESCRIPTION
        )}
      </td>

      <td className="p-3">
        {isEditing ? (
          <Input
            size="small"
            value={record.BUNDLEDETAILSDESCRIPTION}
            onChange={(e) =>
              onChange("BUNDLEDETAILSDESCRIPTION", e.target.value, index)
            }
          />
        ) : (
          record.BUNDLEDETAILSDESCRIPTION
        )}
      </td>

      <td className="p-3">{record.CURRENCY}</td>

      <td className="p-3">
        {isEditing ? (
          <Select
            size="small"
            value={record.FLAG}
            onChange={(value) => onChange("FLAG", value, index)}
            style={{ width: 100 }}
          >
            <Option value="ACTIVE">ACTIVE</Option>
            <Option value="INACTIVE">INACTIVE</Option>
          </Select>
        ) : (
          <span
            className={`font-semibold ${
              record.FLAG === "ACTIVE" ? "text-green-600" : "text-red-600"
            }`}
          >
            {record.FLAG}
          </span>
        )}
      </td>

    <td className="p-3">
  {isEditing ? (
    <Button
      size="small"
      type="primary"
      onClick={() => onUpdate(index)}
      style={{ backgroundColor: "#1677ff" }}
    >
      Update
    </Button>
  ) : (
    <Button size="small" type="link" onClick={() => onEdit(record.ID)}>
      Edit
    </Button>
  )}
</td>

    </tr>
  );
};


const DashTop = ({ onBundleChange }) => {
  const [filters, setFilters] = useState({
    opcode: "",
    channel: "",
    category: "",
    validity: "",
  });
  const [rowData, setRowData] = useState([]);
  const [rowIDs, setRowIDs] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [showTable, setShowTable] = useState(false);

  const { categories = [], fetchCategories } = useCategoryFetch();
  const { validities = [], fetchValidity } = useValidityFetch();
  const {
    data: opcodes = [],
    fetchopData: fetchOpcodes,
  } = useGetopcodeHook();
  const { data: channel = [], fetchchnlData } = useChannelHook();
  const { loading, fetchBundles } = useBundleFetch();
  const { updateBundles, updating } = useBundleUpdate();

  const reference = "202502090806";

  useEffect(() => {
    fetchchnlData();
    fetchOpcodes();
  }, []);

  useEffect(() => {
    if (filters.opcode && filters.channel) {
      fetchCategories(filters.opcode, filters.channel);
    }
  }, [filters.opcode, filters.channel]);

  useEffect(() => {
    if (filters.opcode && filters.channel && filters.category) {
      fetchValidity(filters.opcode, filters.channel, filters.category);
    }
  }, [filters.opcode, filters.channel, filters.category]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleShowTable = async () => {
    let { opcode, channel, category, validity } = filters;

    opcode = opcode || "All";
    channel = channel || "All";
    category = category || "All";
    validity = validity || "All";

    try {
      setRowData([]);
      setRowIDs([]);
      setShowTable(false);

      const result = await fetchBundles(opcode, channel, reference, category, validity);

      if (result?.success) {
        const bundles = result.data;
        if (bundles.length === 0) {
          toast.error("No bundles found.");
          return;
        }

        const ids = bundles.map((item) => item.ID);
        const rows = bundles.map(({ ID, ...rest }) => rest);

        setRowIDs(ids);
        setRowData(rows);
        setShowTable(true);
        onBundleChange?.(false);
        toast.success(`Fetched ${bundles.length} bundles`);
      } else {
        toast.error(result?.toast || "Fetch failed.");
      }
    } catch {
      toast.error("Unexpected error while fetching bundles.");
    }
  };

  const hide = () => {
    setShowTable(false);
    setRowData([]);
    setRowIDs([]);
  };

//   const onUpdate = async (index) => {
//   const updatedRow = data[index];
//   try {
//     const res = await updateBundle([updatedRow]);
//     toast.success("Row updated successfully");
//     setEditingKey(""); // Exit edit mode
//   } catch (error) {
//     toast.error("Update failed");
//   }
// };
// const { updateBundles } = useBundleUpdate(); // your custom hook


const onUpdate = async (index) => {
  const updatedRow = rowData[index];
  const payload = [{
    id: rowIDs[index],
    bundleId: updatedRow.BUNDLEID,
    bundleName: updatedRow.BUNDLEDESCRIPTION,
    amount: updatedRow.AMOUNT,
    bundleDescription: updatedRow.BUNDLEDESCRIPTION,
    bundleDetailsDescription: updatedRow.BUNDLEDETAILSDESCRIPTION,
    category: updatedRow.CATEGORY,
    currency: updatedRow.CURRENCY,
    validity: updatedRow.VALIDITY,
    channel: updatedRow.CHANNEL,
    flag: updatedRow.FLAG,
    opCode: updatedRow.OPCODE,
  }];

  try {
    await updateBundles(payload);
    toast.success("Row updated successfully");
    setEditingKey(""); // Exit edit mode
  } catch (error) {
    toast.error("Update failed");
  }
};



  const moveRow = (from, to) => {
    const updated = [...rowData];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setRowData(updated);
  };

  const onEdit = (id) => setEditingKey(id);

  const onChange = (field, value, index) => {
    const updatedData = [...rowData];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value,
    };
    setRowData(updatedData);
  };

  const handleUpdate = async () => {
    const payload = rowData.map((item, index) => ({
      id: rowIDs[index],
      bundleId: item.BUNDLEID,
      bundleName: item.BUNDLEDESCRIPTION,
      amount: item.AMOUNT,
      bundleDescription: item.BUNDLEDESCRIPTION,
      bundleDetailsDescription: item.BUNDLEDETAILSDESCRIPTION,
      category: item.CATEGORY,
      currency: item.CURRENCY,
      validity: item.VALIDITY,
      channel: item.CHANNEL,
      flag: item.FLAG,
      opCode: item.OPCODE,
    }));

    try {
      await updateBundles(payload);
      toast.success("Bundle updated successfully");
      setEditingKey("");
    } catch {
      toast.error("Failed to update bundles");
    }
  };

  return (
    <div className="space-y-10 py-4">
      <div>
        <h1 className="text-2xl text-[#0f1e1e]">Select Filters</h1>
        <div className="flex justify-between flex-wrap gap-4 mb-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 py-2">
            {[
              { label: "OPCODE", key: "opcode", options: opcodes.map((op) => op.opcode) },
              { label: "Channel", key: "channel", options: channel.map((c) => c.channel) },
              { label: "Category", key: "category", options: categories },
              { label: "Validity", key: "validity", options: validities.map((v) => v.validity) },
            ].map(({ label, key, options }) => (
              <div key={key} className="flex flex-col items-start">
                <label className="mb-1 text-sm">{label}:</label>
                <Select
                  value={filters[key]}
                  onChange={(v) => handleFilterChange(key, v)}
                  style={{ width: 140 }}
                  placeholder={`Select ${label}`}
                >
                  <Option value="All">All</Option>
                  {options.length ? (
                    options.map((val) => (
                      <Option key={val} value={val}>
                        {val}
                      </Option>
                    ))
                  ) : (
                    <Option disabled>No {label.toLowerCase()} available</Option>
                  )}
                </Select>
              </div>
            ))}
          </div>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button type="primary" onClick={handleShowTable}>
              Show Table
            </Button>
          </motion.div>
        </div>
      </div>

      {showTable && (
        <div className="bg-white py-4 rounded shadow-lg">
          <div className="flex justify-between items-center mb-4 px-5">
            <h2 className="text-lg font-bold">Bundles for Selected Filters</h2>
            <motion.div className="flex items-center gap-3" whileTap={{ scale: 0.95 }}>
              <Button type="primary" onClick={handleUpdate} loading={updating}>
                Update
              </Button>
              <FaCircleXmark
                className="text-red-400 h-[25px] w-[25px] hover:text-red-500 cursor-pointer"
                onClick={hide}
              />
            </motion.div>
          </div>

          {loading ? (
            <Spin tip="Loading bundles..." />
          ) : rowData.length > 0 ? (
            <DndProvider backend={HTML5Backend}>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm whitespace-nowrap">
                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                    <tr>
                      <th className="p-3">S.No</th>
                      <th className="p-3">ID</th>
                      <th className="p-3">Bundle ID</th>
                      <th className="p-3">OpCode</th>
                      <th className="p-3">Channel</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Validity</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Bundle Description</th>
                      <th className="p-3">Details Description</th>
                      <th className="p-3">Currency</th>
                      <th className="p-3">Flag</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rowData.map((record, index) => (
                      <DraggableRow
                        key={rowIDs[index]}
                        record={{ ...record, ID: rowIDs[index] }}
                        index={index}
                        moveRow={moveRow}
                        isEditing={editingKey === rowIDs[index]}
                        onEdit={onEdit}
                        onChange={onChange}
                          onUpdate={onUpdate}

                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </DndProvider>
          ) : (
            <p className="text-red-500 text-center mt-4">NO DATA FOUND</p>
          )}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default DashTop;
