import React, { useState } from 'react';
import { Button, Input, Dropdown, message, Card, Form, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import addCategoryAPI from '../../hooks/addCategory';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const channelItems = [
  { label: 'USSD', key: 'USSD' },
  { label: 'APP', key: 'APP' },
];

const opcodeItems = [
  { label: 'HALOTELTZ', key: 'HALOTELTZ' },
  { label: 'HALOTOPZ 1', key: 'HALOTOPZ 1' },
  { label: 'HALOTOPZ 2', key: 'HALOTOPZ 2' },
];

const AddCategory = () => {
  const [opcode, setOpcode] = useState('');
  const [channel, setChannel] = useState('');
  const [category, setCategory] = useState('');
  const [catId, setCatId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (!opcode || !channel || !category || !catId) {
      message.warning('Please fill all fields.');
      return;
    }

    setLoading(true);
    const res = await addCategoryAPI({
      id: catId,
      opCode: opcode,
      channel,
      category,
    });
    setLoading(false);

    if (res.success) {
      message.success(res.message || 'Category added successfully!');
      setTimeout(() => {
        navigate('/category');
      }, 1000);
    } else {
      message.error(res.message || 'Failed to add category.');
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden top-20 left-65 py-4 px-8">
      
      <Card
        title={<Title level={3}>Add New Category</Title>}
        bordered={false}
        style={{ width: '100%', maxWidth: 1000 }}
      >
        
        <Form layout="vertical">
          <div className="flex flex-wrap gap-4">
            <Form.Item label="OPCODE" required style={{ flex: '1 1 20%' }}>
              <Dropdown
                menu={{ items: opcodeItems, onClick: e => setOpcode(e.key) }}
                trigger={['click']}
              >
                <Button block>{opcode || 'Select OPCODE'} <DownOutlined /></Button>
              </Dropdown>
            </Form.Item>

            <Form.Item label="CHANNEL" required style={{ flex: '1 1 20%' }}>
              <Dropdown
                menu={{ items: channelItems, onClick: e => setChannel(e.key) }}
                trigger={['click']}
              >
                <Button block>{channel || 'Select CHANNEL'} <DownOutlined /></Button>
              </Dropdown>
            </Form.Item>

            <Form.Item label="Cat ID" required style={{ flex: '1 1 20%' }}>
              <Input
                placeholder="Enter Cat ID"
                value={catId}
                onChange={e => setCatId(e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Category" required style={{ flex: '1 1 20%' }}>
              <Input
                placeholder="Enter Category Name"
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
            </Form.Item>

            <Form.Item style={{ alignSelf: 'end' }}>
              <Button
                type="primary"
                onClick={handleAdd}
                loading={loading}
              >
                Add Category
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AddCategory;
