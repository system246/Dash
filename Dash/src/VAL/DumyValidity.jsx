import React, { useState, useEffect, useRef } from 'react';
import { Button, Dropdown, Space, Modal, Select } from 'antd';
import { DownOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useValidityFetch from './ValidHook';
import updateValidityAPI from './UpdateValidityRow';
import update from 'immutability-helper';
import { toast } from 'react-toastify';
import useGetopcodeHook from '../Operater/OpcodeHook';
import useCategoryFetch from '../Category/CategoryHook';
 
const { Option } = Select;
 
const channelItems = [
  { label: 'USSD', key: 'USSD', icon: <UserOutlined /> },
  { label: 'APP', key: 'APP', icon: <UserOutlined /> },
];
 
const DumyValid = () => {
  const navigate = useNavigate();
  const { validities, loading, fetchValidity } = useValidityFetch();
 
  const [opcode, setOpcode] = useState('');
  const [channel, setChannel] = useState('');
  const [category, setCategory] = useState('');
  const [bundleList, setBundleList] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);
 
  //-------------------------------for opcode
  const {
    data: opcodes = [],
    loading: loadingOpcodes,
    error: errorOpcodes,
    fetchopData: fetchOpcodes,
  } = useGetopcodeHook();
 
  useEffect(() => {
    fetchOpcodes(); // fetch without any params for now
  }, []);
 
  //---------------------------------------for category
  const { categories = [], fetchCategories, loadingCategories, errorCategories } = useCategoryFetch();
  useEffect(() => {
    if (opcode && channel) {
      fetchCategories(opcode, channel);
    }
  }, [opcode, channel]);
 
  // Map string validities to objects with valId and validity
  // useEffect(() => {
  //   if (Array.isArray(validities)) {
  //     const mappedValidities = validities
  //       .filter((val) => val && val.trim() !== '')
  //       .map((validity, index) => ({
  //         valId: index + 1,
  //         validity: validity.trim(),
  //       }));
  //     setBundleList(mappedValidities);
  //   }
  // }, [validities]);
  useEffect(() => {
  if (Array.isArray(validities)) {
    setBundleList(validities);
  }
}, [validities]);
 
  const moveRow = (dragIndex, hoverIndex) => {
    if (dragIndex === hoverIndex) return;
    setBundleList((prevList) =>
      update(prevList, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevList[dragIndex]],
        ],
      })
    );
  };
 
  const handleSubmit = async () => {
    if (!opcode || !channel || !category) {
      toast.warning('Please select OPCODE, CHANNEL, and CATEGORY');
      return;
    }
 
    const loadingId = toast.loading('Fetching validities...');
    const result = await fetchValidity(opcode, channel, category);
    toast.dismiss(loadingId);
 
    if (result.success) {
      toast.success(`TxnID: ${result.txnId}`);
      // setBundleList handled by useEffect watching validities
      if (result.validities.length === 0) {
        toast.warning('No validity list present in DB');
      }
      localStorage.setItem('validityInputs', JSON.stringify({ opcode, channel, category }));
    } else {
      toast.error(result.message);
    }
  };
 
  const handleUpdate = async () => {
    if (!opcode || !channel || !category) {
      Modal.warning({
        title: 'Missing Info',
        content: 'Please select OPCODE, CHANNEL, and CATEGORY before updating.',
      });
      return;
    }
 
    const requestPayload = bundleList.map((item, index) => ({
      valId: index + 1, // override based on position
      opcode,
      channel,
      category,
      validity: item.validity,
    }));
 
    setUpdateLoading(true);
 
    try {
      const result = await updateValidityAPI(requestPayload);
      if (result.success) {
        Modal.success({
          title: 'Update Successful',
          content: result.message || 'Validity list updated successfully!',
        });
      } else {
        Modal.error({
          title: 'Update Failed',
          content: result.message || 'Failed to update validity list.',
        });
      }
    } catch (error) {
      console.error('Update Error:', error);
      Modal.error({
        title: 'Error',
        content: 'An unexpected error occurred during update.',
      });
    } finally {
      setUpdateLoading(false);
    }
  };
 
  const handleDelete = (index) => {
    const newList = [...bundleList];
    newList.splice(index, 1);
    setBundleList(newList);
  };
 
  const DraggableRow = ({ item, index, moveRow, onDelete }) => {
    const ref = useRef(null);
 
    const [, drop] = useDrop({
      accept: 'row',
      hover: (draggedItem) => {
        if (!ref.current || draggedItem.index === index) return;
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      },
    });
 
    const [{ isDragging }, drag] = useDrag({
      type: 'row',
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
 
    drag(drop(ref));
 
    return (
      <tr
        ref={ref}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        className="text-center cursor-move"
      >
        <td className="border px-4 py-2 text-center">{index + 1}</td>
        <td className="border px-4 py-2 text-center">
          <Button type="primary" size="small">
            {item.validity}
          </Button>
        </td>
        {/* <td className="border px-4 py-2 text-center">
          <Button danger size="small" onClick={() => onDelete(index)}>
            Delete
          </Button>
        </td> */}
      </tr>
    );
  };
 
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="absolute overflow-hidden top-14 px-5 inset-0 left-45 border border-gray-200 rounded-xl m-2 bg-gray-100 ">
        <div className="flex justify-between items-center py-2">
          <h1 className="py-2  text-2xl text-black">Validity</h1>
          <Button className="mr-6 items-center text-xl" onClick={() => navigate('/addvalidity')}>
            <PlusOutlined /> Add Validity
          </Button>
        </div>
 
        <Space wrap className="border-none rounded-2xl">
          {/* ------------------------------------------- for opcode */}
          <div className="flex items-center">
            <label className="w-20">OPCODE:</label>
            <Select
              value={opcode}
              onChange={(v) => setOpcode(v)}
              style={{ width: 180 }}
              placeholder="Select OPCODE"
            >
              {opcodes.length ? (
                opcodes.map((op) => (
                  <Select.Option key={op.id} value={op.opcode}>
                    {op.opcode}
                  </Select.Option>
                ))
              ) : (
                <Select.Option disabled>No OPCODEs available</Select.Option>
              )}
            </Select>
          </div>
 
          <div className="flex items-center space-x-2">
            <label className="w-20">Channel:</label>
            <Dropdown menu={{ items: channelItems, onClick: (e) => setChannel(e.key) }}>
              <Button>
                <Space>
                  {channel || 'Select CHANNEL'} <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
 
          {/* ------------------------------------------------for category */}
          <div className="flex items-center">
            {/* <label className="w-20">Category:</label> */}
            <div className="flex items-center">
  <label className="w-20">Category:</label>
  <Select
    value={category}
    onChange={(v) => setCategory(v)}
    style={{ width: 180 }}
    placeholder="Select Category"
    loading={loadingCategories}
  >
    <Option value="All">All</Option>
    {categories.length ? (
      categories.map((cat) => (
        <Option key={cat} value={cat}>
          {cat}
        </Option>
      ))
    ) : (
      <Option disabled>No categories available</Option>
    )}
  </Select>
</div>
 
          </div>
 
          <div className="flex items-center ">
            <label className="invisible">Submit</label>
            <Button type="primary" onClick={handleSubmit} loading={loading}>
              Submit
            </Button>
          </div>
        </Space>
 
        <div className="mt-5 py-4 ">
          <div className="flex justify-between items-center mb-4 ">
            <h2 className="text-xl font-bold mb-2">Validity List</h2>
            <Button loading={updateLoading} type="primary" onClick={handleUpdate}>
              Update
            </Button>
          </div>
 
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border-r px-4 py-2 text-center">Val ID</th>
                  <th className="border-r px-4 py-2 text-center">Validity</th>
                  {/* <th className=" px-4 py-2 text-center">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {bundleList.length > 0 ? (
                  bundleList.map((item, index) => (
                    <DraggableRow
                      key={item.validity + index}
                      item={item}
                      index={index}
                      moveRow={moveRow}
                      // onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-4">
                      No validities available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
 
export default DumyValid;