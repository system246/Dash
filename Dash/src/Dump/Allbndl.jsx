

// // // import React, { useState } from "react";
// // // import { Table } from "antd";

// // // const headers = [
// // //   {
// // //     title: "Date",
// // //     dataIndex: "Date",
// // //     key: "Date",
// // //   },
// // //   {
// // //     title: "Bundle ID",
// // //     dataIndex: "bundleId",
// // //     key: "bundleId",
// // //   },
// // //   {
// // //     title: "Amount",
// // //     dataIndex: "amount",
// // //     key: "amount",
// // //     render: (amount) => (amount !== null ? amount : "N/A"),
// // //   },
// // //   {
// // //     title: "Bundle Description",
// // //     dataIndex: "bundleDescription",
// // //     key: "bundleDescription",
// // //   },
// // //   {
// // //     title: "Category",
// // //     dataIndex: "category",
// // //     key: "category",
// // //   },
// // //   {
// // //     title: "Operator Code",
// // //     dataIndex: "operatorCode",
// // //     key: "operatorCode",
// // //   },
// // //   {
// // //     title: "Validity",
// // //     dataIndex: "validity",
// // //     key: "validity",
// // //   },
// // //   {
// // //     title: "Flag",
// // //     dataIndex: "flag",
// // //     key: "flag",
// // //   },
// // // ];

// // // const dataa = [
// // //   {
// // //     key: "1",
// // //     Date: "11 Jan 2021",
// // //     bundleId: "BND1741674292672",
// // //     amount: 23,
// // //     bundleDescription: "Basic Plan",
// // //     category: "Internet",
// // //     operatorCode: "1234",
// // //     validity: "30 Days",
// // //     flag: "Active",
// // //   },
// // //   {
// // //     key: "2",
// // //     Date: "12 Jan 2021",
// // //     bundleId: "BND1741674358982",
// // //     amount: null,
// // //     bundleDescription: "Standard Package",
// // //     category: "Internet",
// // //     operatorCode: "4567",
// // //     validity: "7 Days",
// // //     flag: "Inactive",
// // //   },
// // // ];

// // // const Dasbrd = () => {
// // //   const [selectedRowKeys, setSelectedRowKeys] = useState([]);

// // //   const rowSelection = {
// // //     selectedRowKeys,
// // //     onChange: (selectedKeys) => {
// // //       setSelectedRowKeys(selectedKeys);
// // //     },
// // //   };

// // //   return (
// // //     <div className="p-4">
// // //       <div className="flex justify-between items-center mb-4">
// // //         <h1 className="text-2xl font-bold underline">Dashboard</h1>
// // //         <button className="px-3 py-1 rounded-md bg-red-400 hover:bg-red-500 text-white cursor-pointer">
// // //           Update
// // //         </button>
// // //       </div>
// // //       <Table
// // //         rowSelection={rowSelection}
// // //         dataSource={dataa}
// // //         columns={headers}
// // //         pagination={{ pageSize: 5 }}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default Dasbrd;
