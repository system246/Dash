import React, { useState, useRef, useEffect } from 'react';
import { Button, Dropdown, Input, message, Space } from 'antd';
import { DownOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import useCategoryFetch from '../../hooks/CategoryHook';
import { useNavigate } from "react-router-dom";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import updateCategoryAPI from '../../hooks/updateCategory';

const channelItems = [
  { label: 'USSD', key: 'USSD', icon: <UserOutlined /> },
  { label: 'APP', key: 'APP', icon: <UserOutlined /> },
];

const channelopcode = [
  { label: 'HALOTELTZ', key: 'HALOTELTZ', icon: <UserOutlined /> },
  { label: 'HALOTOPZ 1', key: 'HALOTOPZ 1', icon: <UserOutlined /> },
  { label: 'HALOTOPZ 2', key: 'HALOTOPZ 2', icon: <UserOutlined /> },
];

const Category = () => {
  const [opcode, setOpcode] = useState('');
  const [channel, setChannel] = useState('');
  const navigate = useNavigate();
  const { categories, loading, fetchCategories } = useCategoryFetch();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    setCategoryList(categories);
  }, [categories]);

  const moveRow = (dragIndex, hoverIndex) => {
    setCategoryList((prevList) =>
      update(prevList, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevList[dragIndex]]
        ]
      })
    );
  };

  const onDeleteRow = (index) => {
    setCategoryList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const handleMenuClick = (e) => {
    setChannel(e.key);
  };

  const handleSubmit = async () => {
    if (!opcode || !channel) {
      message.warning('Please enter OPCODE, CHANNEL');
      return;
    }

    const result = await fetchCategories(opcode, channel);
    if (result.success) {
      message.success(result.message);
      localStorage.setItem('categoryInputs', JSON.stringify({ opcode, channel }));
    } else {
      message.error(result.message);
    }
  };

  const handleUpdate = async () => {
    if (!opcode || !channel) {
      message.warning('Missing OPCODE or CHANNEL for update');
      return;
    }

    const jsonPayload = {
      opCode: opcode,
      channel: channel,
      categoryList: categoryList.map((cat, index) => ({
        catId: index + 1, // new IDs based on order
        category: cat.category
      })),
    };

    console.log("JSON Payload to be sent:\n", JSON.stringify(jsonPayload, null, 2));

    try {
      const result = await updateCategoryAPI(jsonPayload);
      if (result.success) {
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      console.error('Update Error:', error);
      message.error('Failed to update category list');
    }
  };

  const DraggableRow = ({ item, index, moveRow, onDelete }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
      accept: 'row',
      hover: (draggedItem) => {
        if (draggedItem.index !== index) {
          moveRow(draggedItem.index, index);
          draggedItem.index = index;
        }
      }
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
      <tr ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="text-center">
        <td className="border px-4 py-2">{index + 1}</td>
        <td className="border px-4 py-2">
          <Button
            onClick={() =>
              navigate(`/valid/${encodeURIComponent(item.category)}`, {
                state: { opcode, channel },
              })
            }
            type="primary"
          >
            {item.category}
          </Button>
        </td>
        <td className="border px-4 py-2">
          <Button danger onClick={() => onDelete(index)}>
            Delete
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="absolute inset-0 overflow-hidden top-20 left-65 py-4">
        <div className="top flex gap-[780px] justify-between items-center py-2">
          <h1 className="text-2xl py-3 font-mono px-4 font-bold">Category</h1>
          <Button className='mr-6 items-center text-xl' onClick={() => navigate('/addC')} loading={loading}>
            <PlusOutlined /> Add Category
          </Button>
        </div>

        <Space wrap className='border-none shadow-2xl inset-shadow-zinc-950 px-4 mx-4 rounded-2xl py-2'>
          <Dropdown menu={{ items: channelopcode, onClick: (e) => setOpcode(e.key) }}>
            <Button>
              <Space>{opcode || 'Select OPCODE'} <DownOutlined /></Space>
            </Button>
          </Dropdown>

          <Dropdown menu={{ items: channelItems, onClick: handleMenuClick }}>
            <Button>
              <Space>{channel || 'Select CHANNEL'} <DownOutlined /></Space>
            </Button>
          </Dropdown>

          <Button onClick={handleSubmit} loading={loading}>Submit</Button>
        </Space>

        <div className="categories-list mx-4 mt-5 p-4 shadow rounded-lg bg-white">
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-bold'>Categories List</h2>
            <Button loading={loading} onClick={handleUpdate}>Update</Button>
          </div>

          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Cat ID</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {categoryList.map((item, index) => (
                <DraggableRow
                  key={index}
                  item={item}
                  index={index}
                  moveRow={moveRow}
                  onDelete={onDeleteRow}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DndProvider>
  );
};

export default Category;