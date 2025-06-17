// // Dashtable.js
// import React, { useState } from 'react';
// import { Select, Button, Space } from 'antd';
// import DashTop from './DashTop';

// const { Option } = Select;

// const Dashtable = () => {
//   const [opcode, setOpcode] = useState('');
//   const [channel, setChannel] = useState('');
//   const [category, setCategory] = useState('');
//   const [validity, setValidity] = useState('');
//   const [filters, setFilters] = useState(null);

//   const handleApplyFilters = () => {
//     if (opcode && channel && category && validity) {
//       setFilters({ opcode, channel, category, validity });
//     } else {
//       alert("Please select all filters");
//     }
//   };

//   return (
//     <div className="p-4 space-y-4">
//       <Space wrap size="middle">
//         <Select
//           placeholder="Select OpCode"
//           value={opcode}
//           onChange={setOpcode}
//           style={{ width: 150 }}
//         >
//           <Option value="HALOTELTZ">HALOTELTZ</Option>
//           <Option value="VODACOM">VODACOM</Option>
//         </Select>

//         <Select
//           placeholder="Select Channel"
//           value={channel}
//           onChange={setChannel}
//           style={{ width: 150 }}
//         >
//           <Option value="USSD">USSD</Option>
//           <Option value="SMS">SMS</Option>
//         </Select>

//         <Select
//           placeholder="Select Category"
//           value={category}
//           onChange={setCategory}
//           style={{ width: 150 }}
//         >
//           <Option value="DATA">DATA</Option>
//           <Option value="SMS">SMS</Option>
//           <Option value="VOICE">VOICE</Option>
//         </Select>

//         <Select
//           placeholder="Select Validity"
//           value={validity}
//           onChange={setValidity}
//           style={{ width: 150 }}
//         >
//           <Option value="1DAY">1DAY</Option>
//           <Option value="7DAY">7DAY</Option>
//           <Option value="30DAY">30DAY</Option>
//         </Select>

//         <Button type="primary" onClick={handleApplyFilters}>
//           Show Bundles
//         </Button>
//       </Space>

//       {/* Conditional render DashTop */}
//       {filters && <DashTop filters={filters} />}
//     </div>
//   );
// };

// export default Dashtable;


// // import { Select } from 'antd';
// // import { useEffect, useState } from 'react';
// // import useCategoryFetch from '../../Category/CategoryHook'; // adjust as needed
// // import useBundleFetch from '../../VAL/ValidHook'; // update path if needed
// // import handleShowTable from './DashTable';  // Adjust path as needed

// // const { Option } = Select;

// // const SelectFilter = () => {
// //   const [filters, setFilters] = useState({
// //     opcode: '',
// //     channel: '',
// //     category: '',
// //     validity: '',
// //   });

// //   const { categories, fetchCategories } = useCategoryFetch();
// //   const { bundles, fetchBundles } = useBundleFetch();

// //   const handleFilterChange = (key, value) => {
// //     setFilters((prev) => ({
// //       ...prev,
// //       [key]: value,
// //     }));
// //   };

// //   // Fetch categories when opcode & channel are selected
// //   useEffect(() => {
// //     if (filters.opcode && filters.channel) {
// //       fetchCategories(filters.opcode, filters.channel);
// //     }
// //   }, [filters.opcode, filters.channel]);

// //   // Fetch bundles when opcode, channel & category are selected
// //   useEffect(() => {
// //     if (filters.opcode && filters.channel && filters.category) {
// //       fetchBundles(filters.opcode, filters.channel, filters.category);
// //     }
// //   }, [filters.opcode, filters.channel, filters.category]);

// //   return (
// //     <div className="pl-48 pt-2 flex flex-col gap-4">
// //       {/* Select Filter UI */}
// //       <div className="flex items-center gap-2">
// //         <label className="w-24">OPCODE:</label>
// //         <Select
// //           value={filters.opcode}
// //           onChange={(v) => handleFilterChange('opcode', v)}
// //           style={{ width: 180 }}
// //         >
// //           <Option value="ALL">ALL</Option>
// //           <Option value="LYCAUG">LYCAUG</Option>
// //           <Option value="MTNUG">MTNUG</Option>
// //         </Select>
// //       </div>

// //       <div className="flex items-center gap-2">
// //         <label className="w-24">Channel:</label>
// //         <Select
// //           value={filters.channel}
// //           onChange={(v) => handleFilterChange('channel', v)}
// //           style={{ width: 180 }}
// //         >
// //           <Option value="USSD">USSD</Option>
// //           <Option value="APP">APP</Option>
// //           <Option value="SMS">SMS</Option>
// //         </Select>
// //       </div>

// //       <div className="flex items-center gap-2">
// //         <label className="w-24">Category:</label>
// //         <Select
// //           value={filters.category}
// //           onChange={(v) => handleFilterChange('category', v)}
// //           style={{ width: 180 }}
// //         >
// //           {categories.map((cat) => (
// //             <Option key={cat.catId} value={cat.category}>
// //               {cat.category}
// //             </Option>
// //           ))}
// //         </Select>
// //       </div>

// //       <div className="flex items-center gap-2">
// //         <label className="w-24">Validity:</label>
// //         <Select
// //           value={filters.validity}
// //           onChange={(v) => handleFilterChange('validity', v)}
// //           style={{ width: 180 }}
// //         >
// //           {bundles.map((item, index) => (
// //             <Option key={index} value={item.validity}>
// //               {item.validity}
// //             </Option>
// //           ))}
// //         </Select>
// //       </div>

// //       {/* Pass filters data and function as props to OtherComponent */}
// //       <OtherComponent filters={filters} />
// //     </div>
// //   );
// // };

// // export default SelectFilter;
