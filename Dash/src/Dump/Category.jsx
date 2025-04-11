// import { Button, Dropdown, Input, message, Space } from 'antd';
// import { DownOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
// import useCategoryFetch from '../../hooks/CategoryHook'; 
// import { useNavigate } from "react-router-dom";
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import update from 'immutability-helper';

// const Category = () => {
//   const [opcode, setOpcode] = useState('');
//   const [channel, setChannel] = useState('');
//   const [reference, setReference] = useState('');
//   const navigate = useNavigate();

//   const { categories, loading, fetchCategories } = useCategoryFetch();
//   const [categoryList, setCategoryList] = useState([]);

//   useEffect(() => {
//     setCategoryList(categories);
//   }, [categories]);

//   const handleSubmit = async () => {
//     if (!opcode || !channel || !reference) {
//       message.warning('Please enter OPCODE, CHANNEL, and REFERENCE');
//       return;
//     }

//     console.log('Submitting with:', { opcode, channel, reference });
//     const result = await fetchCategories(opcode, channel, reference);
//     console.log('Fetch Result:', result);

//     if (result.success) {
//       message.success(result.message);
//       localStorage.setItem('categoryInputs', JSON.stringify({ opcode, channel, reference }));
//     } else {
//       message.error(result.message);
//     }
//   };

//   const channelopcode = [
//     { label: 'HALOTELTZ', key: 'HALOTELTZ', icon: <UserOutlined /> },
//     { label: 'HALOTOPZ 1', key: 'HALOTOPZ 1', icon: <UserOutlined /> },
//     { label: 'HALOTOPZ 2', key: 'HALOTOPZ 2', icon: <UserOutlined /> },
//   ];

//   const channelItems = [
//     { label: 'USSD', key: 'USSD', icon: <UserOutlined /> },
//     { label: 'APP', key: 'APP', icon: <UserOutlined /> },
//   ];

//   const moveRow = (dragIndex, hoverIndex) => {
//     setCategoryList((prevList) =>
//       update(prevList, {
//         $splice: [
//           [dragIndex, 1],
//           [hoverIndex, 0, prevList[dragIndex]]
//         ]
//       })
//     );
//   };

//   const DraggableRow = ({ item, index, moveRow }) => {
//     const ref = useRef(null);
//     const [, drop] = useDrop({
//       accept: 'row',
//       hover: (draggedItem) => {
//         if (draggedItem.index !== index) {
//           moveRow(draggedItem.index, index);
//           draggedItem.index = index;
//         }
//       }
//     });
//     const [{ isDragging }, drag] = useDrag({
//       type: 'row',
//       item: { index },
//       collect: (monitor) => ({
//         isDragging: monitor.isDragging(),
//       }),
//     });
//     drag(drop(ref));

//     return (
//       <tr ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="text-center">
//         <td className="border px-4 py-2">{index + 1}</td>
//         <td className="border px-4 py-2">
//           <Button onClick={() => navigate(`/valid/${encodeURIComponent(item.category)}`, { state: { opcode, channel, reference } })} type="primary">
//             {item.category}
//           </Button>
//         </td>
//       </tr>
//     );
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="absolute inset-0 overflow-hidden top-20 left-65 py-4">
//         <div className="top flex gap-[780px] justify-between items-center py-2">
//           <h1 className="text-2xl py-3 font-mono px-3 font-bold underline">Category</h1>
//           <Button className='mr-6 items-center text-xl' onClick={() => navigate('/blog')} loading={loading}>
//             <PlusOutlined /> Add Category
//           </Button>
//         </div>

//         <Space wrap className='border-none shadow-2xl inset-shadow-zinc-950 px-4 mx-4 rounded-2xl py-2'>
//           <Dropdown menu={{ items: channelopcode, onClick: (e) => setOpcode(e.key) }}>
//             <Button>
//               <Space>{opcode || 'Select OPCODE'} <DownOutlined /></Space>
//             </Button>
//           </Dropdown>

//           <Dropdown menu={{ items: channelItems, onClick: (e) => setChannel(e.key) }}>
//             <Button>
//               <Space>{channel || 'Select CHANNEL'} <DownOutlined /></Space>
//             </Button>
//           </Dropdown>

//           <Input 
//             placeholder="Enter REFERENCE" 
//             value={reference} 
//             onChange={(e) => setReference(e.target.value)} 
//             style={{ width: 200 }}
//           />

//           <Button onClick={handleSubmit} loading={loading}>Submit</Button>
//         </Space>

//         <div className="categories-list mx-4 mt-5 p-4 shadow rounded-lg bg-white">
//           <div className='flex justify-between items-center mb-4'>
//             <h2 className='text-xl font-bold'>Categories List</h2>
//             <Button loading={loading}>Update</Button>
//           </div>

//           <table className="min-w-full border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border px-4 py-2">Serial No</th>
//                 <th className="border px-4 py-2">Category</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categoryList.map((item, index) => (
//                 <DraggableRow key={index} item={item} index={index} moveRow={moveRow} />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </DndProvider>
//   );
// };

// export default Category;





// import React, { useState } from 'react';
// import { Button, Dropdown, Input, message, Space, Table } from 'antd';
// import { DownOutlined, UserOutlined,PlusOutlined } from '@ant-design/icons';
// import useCategoryFetch from '../../hooks/CategoryHook'; 
// import { useNavigate } from "react-router-dom";

// const Category = () => {
//   const [opcode, setOpcode] = useState('');
//   const [channel, setChannel] = useState('');
//   const [reference, setReference] = useState('');
//    const navigate = useNavigate();

//   const { categories, loading, fetchCategories } = useCategoryFetch();

//   const handleMenuClick = (e) => {
//     setChannel(e.key);
//   };

//   // const handleSubmit = async () => {

//   //   if (result.success) {
//   //     message.success(result.message);
    
//   //     // Save to localStorage for later use
//   //     localStorage.setItem('categoryInputs', JSON.stringify({ opcode, channel, reference }));
//   //   } else {
//   //     message.error(result.message);
//   //   }

//   //   console.log('Submitting with:', { opcode, channel, reference });

//   //   const result = await fetchCategories(opcode, channel, reference);

//   //   console.log('Fetch Result:', result);  // DEBUG LOG

//   //   if (result.success) {
//   //     message.success(result.message);
//   //   } else {
//   //     message.error(result.message);
//   //   }
//   // };
//   const handleSubmit = async () => {
//     if (!opcode || !channel || !reference) {
//       message.warning('Please enter OPCODE, CHANNEL, and REFERENCE');
//       alert("plzz put data");
//       return;
//     }
  
//     console.log('Submitting with:', { opcode, channel, reference });
  
//     const result = await fetchCategories(opcode, channel, reference);  // Correct usage
  
//     console.log('Fetch Result:', result);  // DEBUG LOG
  
//     if (result.success) {
//       message.success(result.message);
  
//       // Save to localStorage
//       localStorage.setItem('categoryInputs', JSON.stringify({ opcode, channel, reference }));
//     } else {
//       message.error(result.message);
//     }
//   };
  


//   const channelItems = [
//     { label: 'USSD', key: 'USSD', icon: <UserOutlined /> },
//     { label: 'APP', key: 'APP', icon: <UserOutlined /> },

//   ];
//   const channelopcode = [
//     { label: 'HALOTELTZ', key: 'HALOTELTZ', icon: <UserOutlined /> },
//     { label: 'HALOTOPZ 1', key: 'HALOTOPZ 1', icon: <UserOutlined /> },
//     { label: 'HALOTOPZ 2', key: 'HALOTOPZ 2', icon: <UserOutlined /> },


//   ];

//   const columns = [
//     { title: 'Serial No', dataIndex: 'serial', key: 'serial' },
//     { 
//       title: 'Category', 
//       dataIndex: 'category', 
//       key: 'category',
//       render: (text) => <Button onClick={() => navigate(`/valid/${encodeURIComponent(text)}`, { state: { opcode, channel, reference } })} type="primary">{text}</Button>
//     },
//   ];

//   return (
//     <div className="absolute inset-0 overflow-hidden top-20 left-65 py-4">
//       <div className="top flex gap-[780px] justify-between items-center py-2">
//         <h1 className="text-2xl py-3 font-mono px-3 font-bold underline">Category</h1>
//         <Button className='mr-6 items-center text-xl' variant="solid" color="primary" onClick={() =>navigate('/blog')} loading={loading}><PlusOutlined />Add Category</Button>


//       </div>

//       <Space wrap className='border-none shadow-2xl inset-shadow-zinc-950 px-4 mx-4 rounded-2xl py-2'>
         
//         {/* <Input 
//           placeholder="Enter OPCODE" 
//           value={opcode} 
//           onChange={(e) => setOpcode(e.target.value)} 
//           style={{ width: 200 }}
//         /> */}

//         <Dropdown menu={{ items: channelopcode, onClick: (e) => setOpcode(e.key) }}>
//           <Button>
//             <Space>{opcode || 'Select OPCODE'} <DownOutlined /></Space>
//           </Button>
//         </Dropdown>


//         {/* CHANNEL Dropdown */}
//         <Dropdown menu={{ items: channelItems, onClick: handleMenuClick }}>
//           <Button>
//             <Space>{channel || 'Select CHANNEL'} <DownOutlined /></Space>
//           </Button>
//         </Dropdown>

//         {/* REFERENCE Text Input */}
//         <Input 
//           placeholder="Enter REFERENCE1" 
//           value={reference} 
//           onChange={(e) => setReference(e.target.value)} 
//           style={{ width: 200 }}
//         />

//         <Button onClick={handleSubmit} loading={loading}>Submit</Button>
//       </Space>

//       <div className="categories-list mx-4" style={{ marginTop: '20px' }}>

//           <div className='flex justify-between shadow py-2 items-center'>
//           <h2 className='text-xl font-bold'>Categories List</h2>
//           <Button className='right-[538px]' loading={loading}>Update</Button>

//           </div>

//           <Table 
//           columns={columns} 
//           dataSource={categories} 
//           pagination={false} 
//           rowKey={(record, index) => index} 
//         />
//       </div>
//     </div>
//   );
// };

// export default Category;

///________________validity????????????

// import { useEffect } from 'react';
//     import { useLocation, useParams } from 'react-router-dom';
//     import { Table, Spin, message,Button } from 'antd';
//     import useBundleFetch from '../../hooks/ValidHook';
//     import { useNavigate } from "react-router-dom";
 

// const Valid = () => {
       
//   const location = useLocation();
//   const { categoryName } = useParams();
//   const navigate = useNavigate();

//   // Get from state first, fallback to localStorage
//   const stateData = location.state || {};
//   let { opcode, channel, reference } = stateData;
  
//   if (!opcode || !channel || !reference) {
//     const storedInputs = JSON.parse(localStorage.getItem('categoryInputs'));
//     if (storedInputs) {
//       opcode = storedInputs.opcode;
//       channel = storedInputs.channel;
//       reference = storedInputs.reference;
//     }
//   }
    
//       const { bundles, loading, error, fetchBundles } = useBundleFetch();
    
//       useEffect(() => {
//         if (!opcode || !channel || !reference || !categoryName) {
//           message.error('Missing data. Please return and fill all fields.');
//           return;
//         }
    
//         const getData = async () => {
//           const result = await fetchBundles(opcode, channel, reference, categoryName);
//           if (!result.success) {
//             message.error(result.message);
//           } else {
//             message.success(`TxnID: ${result.txnId}`);
//           }
//         };
    
//         getData();
//       }, [opcode, channel, reference, categoryName]);
    
//       const columns = [
//         { title: 'Serial No', dataIndex: 'serial', key: 'serial' },
//         { title: 'Validity', dataIndex: 'validity', key: 'validity',
//           render: (text, record) => (
//             <Button type="primary"
//             onClick={() =>
//               navigate(`/allbndl/${categoryName}`, { state: { opcode, channel, reference, validity: record.validity } })
//             }>
//               {text}
//             </Button>
//           ),
//          },
//       ];
    
//       return (
//         <div className="  absolute inset-0 overflow-hidden top-20 left-65 py-4 px-2">

//           <h1 className='text-sm py-2 text-gray-400 underline'>Category/Validity</h1>

//           <h1 className="text-2xl font-bold underline mb-4">Bundle Details for {categoryName}</h1>
    
//           <div className="mb-4 text-md rounded font-mono flex border border-gray-200 p-2 justify-between">
//             <p className='shadow p-2'><strong>OPCODE:</strong> {opcode}</p>
//             <p  className='shadow p-2'><strong>CHANNEL:</strong> {channel}</p>
//             <p  className='shadow p-2'><strong>REFERENCE:</strong> {reference}</p>
//             <p  className='shadow p-2'><strong>CATEGORY:</strong> {categoryName}</p>
//           </div>

//           <h1 className="text-2xl font-bold underline mb-4">Validity for {categoryName}</h1>

//           {/* <Draggable>
//           <h1> Idhar chala</h1>
//           </Draggable> */}
    
//           {loading ? (
//             <Spin tip="Loading bundles..." />
//           ) : (
//             <Table 
//               columns={columns} 
//               dataSource={bundles} 
//               scroll={{ x: "max-content" }}
//               pagination={false} 
//               rowKey={(record) => record.key} 
//             />
//           )}
    
//           {error && <p className="text-red-500 mt-4">{error}</p>}
//         </div>
    
    
//   )
// }

// export default Valid;
