import React, { useState, useRef, useEffect } from 'react';
import { Button, Select, Space, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import useCategoryFetch from './CategoryHook';
import updateCategoryAPI from './updateCategory';
import useGetopcodeHook from '../Operater/OpcodeHook';
import useChannelHook from '../Channel/GetHook';

const { Option } = Select; // ✅ FIXED: Ensure Option is extracted from Select

const Category = () => {
  const [opcode, setOpcode] = useState('');
  const [channel, setChannel] = useState('');
  const navigate = useNavigate();

  const { categories, loading, fetchCategories } = useCategoryFetch();
  const [categoryList, setCategoryList] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);

  const {
    data: opcodes = [],
    loading: loadingOpcodes,
    fetchopData: fetchOpcodes,
  } = useGetopcodeHook();

  const {
    data: channelList = [],
    fetchchnlData,
  } = useChannelHook();

  useEffect(() => {
    fetchchnlData();
    fetchOpcodes();
  }, []);

  useEffect(() => {
    if (Array.isArray(categories)) {
      const structured = categories.map((cat, idx) => ({
        catId: idx + 1,
        category: cat,
      }));
      setCategoryList(structured);
    }
  }, [categories]);

  const moveRow = (dragIndex, hoverIndex) => {
    if (dragIndex === hoverIndex) return;
    setCategoryList(prevList =>
      update(prevList, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevList[dragIndex]],
        ],
      })
    );
  };

  const handleSubmit = async () => {
    if (!opcode || !channel) {
      toast.warning('Please enter OPCODE and CHANNEL');
      return;
    }

    const loadingId = toast.loading('Fetching categories...');
    const result = await fetchCategories(opcode, channel);
    toast.dismiss(loadingId);

    if (result.success) {
      toast.success(result.message);
      localStorage.setItem('categoryInputs', JSON.stringify({ opcode, channel }));
    } else {
      toast.error(result.message);
    }
  };

  const handleUpdate = async () => {
    if (!opcode || !channel) {
      Modal.warning({
        title: 'Missing Info',
        content: 'Please select OPCODE and CHANNEL before updating.',
      });
      return;
    }

    const requestPayload = categoryList.map((cat) => ({
      catId: cat.catId,
      channel,
      category: cat.category,
      opcode,
    }));

    setUpdateLoading(true);

    try {
      const result = await updateCategoryAPI(requestPayload);
      if (result.success) {
        toast.success(result.message || 'Category updated successfully!');
      } else {
        toast.error(result.message || 'Failed to update category.');
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

  const DraggableRow = ({ item, index, moveRow }) => {
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
        <td className="border px-4 py-2">{index + 1}</td>
        <td className="border px-4 py-2">
          <Button type="primary" size="small">{item.category}</Button>
        </td>
      </tr>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="absolute overflow-hidden top-14 border border-gray-200 rounded-xl m-2 bg-white px-5 inset-0 left-45">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-2xl text-[#0f1e1e] py-2">Category</h1>
          <Button
            className="mr-6 text-xl"
            onClick={() => navigate('/addCategory')}
            loading={loading}
          >
            <PlusOutlined /> Add Category
          </Button>
        </div>

        <Space wrap className="border-none mb-4">
          <div className="flex items-center">
            <label className="w-20">OPCODE:</label>
            <Select
              value={opcode}
              onChange={(v) => setOpcode(v)}
              style={{ width: 180 }}
              placeholder="Select OPCODE"
              loading={loadingOpcodes}
            >
              {opcodes.length ? (
                opcodes.map((op) => (
                  <Option key={op.id} value={op.opcode}>
                    {op.opcode}
                  </Option>
                ))
              ) : (
                <Option disabled>No OPCODEs available</Option>
              )}
            </Select>
          </div>

          <div className="flex items-center">
            <label className="w-20">Channel:</label>
            <Select
              showSearch
              value={channel}
              onChange={(v) => setChannel(v)} // ✅ FIXED: changed to direct setter
              placeholder="Select or type CHANNEL"
              style={{ width: 200 }}
              allowClear
            >
              {channelList.map((item) => (
                <Option key={item.id} value={item.channel}>
                  {item.channel}
                </Option>
              ))}
            </Select>
          </div>

          <div className="flex items-center">
            <label className="invisible">Submit</label>
            <Button type="primary" onClick={handleSubmit} loading={loading}>
              Submit
            </Button>
          </div>
        </Space>

        <div className="mt-5">
          <div className="flex justify-between items-center mb-4 pr-2">
            <h2 className="text-xl font-bold">Categories List</h2>
            <Button loading={updateLoading} type="primary" onClick={handleUpdate}>
              Update
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2 text-center">Cat ID</th>
                  <th className="border px-4 py-2 text-center">Category</th>
                </tr>
              </thead>
              <tbody>
                {categoryList.length > 0 ? (
                  categoryList.map((item, index) => (
                    <DraggableRow
                      key={`${item.category}-${index}`} // ✅ key is now unique
                      item={item}
                      index={index}
                      moveRow={moveRow}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center py-4">No categories available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
      </div>
    </DndProvider>
  );
};

export default Category;
