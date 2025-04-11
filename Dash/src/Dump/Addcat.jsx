import React, { useState } from 'react';
import { Button, Input, Space, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [opcode, setOpcode] = useState('');
  const [reference, setReference] = useState('');
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState(null);
  const [editedRecord, setEditedRecord] = useState({});
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (opcode && reference) {
      const newEntry = { key: Date.now(), opcode, reference,};
      setData([...data, newEntry]);
      setOpcode('');
      setReference('');
    }
  };

  const handleDelete = (keyToDelete) => {
    const newData = data.filter((item) => item.key !== keyToDelete);
    setData(newData);
  };

  const handleEdit = (record) => {
    setEditingKey(record.key);
    setEditedRecord({ ...record });
  };

  const handleSave = () => {
    const newData = data.map((item) =>
      item.key === editingKey ? { ...editedRecord } : item
    );
    setData(newData);
    setEditingKey(null);
    setEditedRecord({});
  };

  const handleCancel = () => {
    setEditingKey(null);
    setEditedRecord({});
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedData = Array.from(data);
    const [movedItem] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, movedItem);

    setData(reorderedData);
  };

  return (
    <div className="absolute inset-0 overflow-hidden top-20 left-65 py-4">
      <h1 className="text-2xl font-bold underline">Add new Category</h1>

      {/* Adding box !!...... */}
      <Space wrap className="  border-none  shadow-2xl px-4 mx-4 rounded-2xl py-2 bg-white">
        <Input
          placeholder="Enter OPCODE"
          value={opcode}
          onChange={(e) => setOpcode(e.target.value)}
          style={{ width: 200 }}
        />
        <Input
          placeholder="Enter Channel"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          style={{ width: 200 }}
        />
        <Button onClick={handleSubmit}>ADD</Button>
      </Space>

      <div className="mt-6 px-4 rounded-2xl mx-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="blog-table">
            {(provided) => (
              <table
                className="min-w-full table-auto border border-gray-300 shadow-lg rounded-md"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2">S.No.</th>
                    <th className="border px-4 py-2">OPCODE</th>
                    <th className="border px-4 py-2">Channel</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((record, index) => {
                    const isEditing = editingKey === record.key;
                    return (
                      <Draggable key={record.key} draggableId={record.key.toString()} index={index}>
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="text-center bg-white hover:bg-gray-50 transition-all" >
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">
                              {isEditing ? (
                                <Input  value={editedRecord.opcode}
                                  onChange={(e) =>
                                    setEditedRecord({ ...editedRecord, opcode: e.target.value })
                                  }
                                />
                              ) : (
                                record.opcode
                              )}
                            </td>
                            <td className="border px-4 py-2">
                              {isEditing ? (
                                <Input value={editedRecord.reference} onChange={(e) =>
                                    setEditedRecord({ ...editedRecord, reference: e.target.value })
                                  } />
                              ) : (
                                record.reference
                              )}
                            </td>
                            <td className="border px-4 py-2">
                              {isEditing ? (
                                <Space>
                                  <Button  type="primary"  icon={<SaveOutlined />}  onClick={handleSave} />
                                  <Button  type="default"  danger  icon={<CloseOutlined />}  onClick={handleCancel}/>  </Space>
                              ) : (
                                <Space>
                                  <Button  type="link"  icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                                  <Popconfirm title="Are you sure to delete this entry?" onConfirm={() => handleDelete(record.key)} okText="Yes" cancelText="No" >
                                    <Button type="text" danger icon={<DeleteOutlined />} />
                                  </Popconfirm>
                                </Space>
                              )}
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan="4" className="border px-4 py-2 text-center text-gray-500">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Blog;
