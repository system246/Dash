import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFile, FaFileAlt, FaBars, FaRegFileAlt } from "react-icons/fa";
import { MdPendingActions, MdSpaceDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: <MdPendingActions />, path: "/Dashboard" },
    { label: "Bundle", icon: <MdSpaceDashboard />, path: "/bundle", reload: true },
    { label: "Category", icon: <TbReportAnalytics />, path: "/category" },
    { label: "Validity", icon: <FaFileAlt />, path: "/validity" },
    { label: "OPCODE", icon: <FaFile />, path: "/opcodes" },
    { label: "Channel", icon: <FaRegFileAlt />, path: "/channel" }, // Added Channel menu item
  ];

  return (
    <>
      {/* Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-40 ">
        <button
          className="text-white bg-[#0f1e1e] p-2 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-14 left-0  w-45 bg-[#0f1e1e] transition-transform     duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static  pr-3`}
      >
        <div className="bar flex flex-col w-[170px]  h-[91.71vh] px-3 py-6 gap-2">
        {/* <div className="absolute inset-0 min-h-screen overflow-y-hidden overflow-x-hidden bg-[#0f1e1e]   px-5"> */}

          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={index}
                className={`flex items-center gap-2 font-sans cursor-pointer px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive ? "bg-[#324d4d] text-white" : "text-gray-100 hover:bg-[#324d4d]"
                } text-[14px] md:text-[16px]`}
                onClick={() => {
                  navigate(item.path);
                  if (item.reload) window.location.reload();
                  if (window.innerWidth < 768) setIsOpen(false); // Auto-close on mobile
                }}
              >
                <span className="text-[17px]">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overlay for small screen */}
      {isOpen && (
        <div
          className="fixed  inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;






// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaFile, FaFileAlt } from "react-icons/fa";
// import { MdPendingActions, MdSpaceDashboard } from "react-icons/md";
// import { TbReportAnalytics } from "react-icons/tb";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const menuItems = [
//     { label: "Dashboard", icon: <MdPendingActions />, path: "/Dashboard" },
//     { label: "Bundle", icon: <MdSpaceDashboard />, path: "/bundle", reload: true },
//     { label: "Category", icon: <TbReportAnalytics />, path: "/category" },
//     { label: "Validity", icon: <FaFileAlt />, path: "/validity" },
//     { label: "OPCODE", icon: <FaFile />, path: "/opcodes" },
//   ];

//   return (
//     <div className="pr-3 fixed bg-[#0f1e1e]">
//       <div className="bar flex flex-col w-[170px] h-[100vh] px-3 py-6 gap-2">
//         {menuItems.map((item, index) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <div
//               key={index}
//               className={`flex items-center gap-3 text-[16px] font-sans cursor-pointer px-3 py-2 rounded-md transition-colors duration-200 ${
//                 isActive ? "bg-[#324d4d] text-white" : "text-gray-100 hover:bg-[#324d4d]"
//               }`}
//               onClick={() => {
//                 navigate(item.path);
//                 if (item.reload) window.location.reload();
//               }}
//             >
//               <span className="text-[17px]">{item.icon}</span>
//               <span>{item.label}</span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;





// import { Empty } from "antd";
// import React from "react";
// import logo from "../assets/logo.png";

// import { MdPendingActions, MdSpaceDashboard } from "react-icons/md";
// import { TbReportAnalytics } from "react-icons/tb";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const Sidebar = () => {
//   const navigate = useNavigate(); // Initialize navigation function

//   return (
//     <div className="pr-3  fixed  bg-[#0f1e1e]">

//       <div className="bar flex flex-col  w-[170px] h-[100vh] px-3  ">
//         {/* <span className="text-white text-4xl py-3 font-bold ">axieva</span> */}

//         <div
//           className="Pending flex text-[16px] gap-3 text-gray-100  items-center font-sans   cursor-pointer border border-transparent rounded-sm hover:bg-[#324d4d]  pt-4"
//           onClick={() => navigate("/")} // Navigate to Pending
//         >
//           <MdPendingActions className="text-[17px]" /> Dashboard
//         </div>

//         <div
//           className="Dashboard flex text-[16px] text-gray-100 gap-3 items-center font-sans cursor-pointer py-4 "
//           onClick={() => {
//             navigate("/bundle"); // navigate first
//             window.location.reload(); // force reload
//           }}
//         >
//           <MdSpaceDashboard  className="text-[17px]"/> Bundle
//         </div>

//         <div
//           className="Reports flex text-[16px] text-gray-100 gap-3 items-center font-sans     cursor-pointer "
//           onClick={() => navigate("/Category")}
//         >
//           <TbReportAnalytics className="text-[17px]" /> Category
//         </div>

//         <div
//           className="Pending flex text-[16px] text-gray-100 gap-3  items-center font-sans cursor-pointer py-4"
//           onClick={() => navigate("Validity")} // Navigate to Pending
//         >
//           <MdPendingActions className="text-[17px]"/> Validity
//         </div>

//         <div
//           className="Pending flex text-[16px] gap-3 text-gray-100  items-center font-sans   cursor-pointer   "
//           onClick={() => navigate("/Opcodes")} // Navigate to Pending
//         >
//           <MdPendingActions className="text-[17px]"/> OPCODE
//         </div>
       
//       </div>
//     </div>
//   );
// };

// export default Sidebar;





// import { Empty } from "antd";
// import React from "react";
// import { MdPendingActions, MdSpaceDashboard } from "react-icons/md";
// import { TbReportAnalytics } from "react-icons/tb";
// import { useNavigate } from "react-router-dom";  // Import useNavigate

// const Sidebar = () => {
//   const navigate = useNavigate(); // Initialize navigation function

//   return (
//     <div className="pr-3  fixed">
//       <div className="bar flex flex-col w-[180px] h-[100vh] px-3    bg-gray-400   ">

//        <div
//         className="Dashboard flex text-[20px] gap-3 items-center font-semibold cursor-pointer py-2 my-1"
//         onClick={() => {
//           navigate("/");       // navigate first
//           window.location.reload();  // force reload
//         }}
//       >
//         <MdSpaceDashboard /> Bundle
//       </div>

//         <div className="Reports flex text-[20px] gap-3 items-center font-semibold     cursor-pointer   mb-1"
//         onClick={() => navigate('/Category')}>
//           <TbReportAnalytics /> Category
//         </div>

//           <div
//           className="Pending flex text-[20px] gap-3  items-center font-semibold cursor-pointer py-2   mb-1"
//          onClick={() =>navigate('Validity')}  // Navigate to Pending
//         >
//           <MdPendingActions /> Validity
//         </div>

//         {/* <div
//           className="Pending flex text-[20px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
//          onClick={() =>navigate('/Add_OPCODE')}  // Navigate to Pending
//         >
//           <MdPendingActions /> OPCODE
//         </div> */}
//          <div
//           className="Pending flex text-[18px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
//          onClick={() =>navigate('/Opcodes')}  // Navigate to Pending
//         >
//           <MdPendingActions /> OPCODE
//         </div>
//         {/* <div
//           className="Pending flex text-[20px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
//          onClick={() =>navigate('/Simp')}  >
//           <MdPendingActions /> Simp
//          </div>
//           <div
//           className="Pending flex text-[20px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
//          onClick={() =>navigate('/Demo')}  >
//           <MdPendingActions /> Demo
//          </div> */}

//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import { Empty } from "antd";
// import React from "react";
// import logo from "../assets/logo.png"

// import { MdPendingActions, MdSpaceDashboard } from "react-icons/md";
// import { TbReportAnalytics } from "react-icons/tb";
// import { useNavigate } from "react-router-dom";  // Import useNavigate

// const Sidebar = () => {
//   const navigate = useNavigate(); // Initialize navigation function

//   return (
//     <div className="pr-3  fixed  bg-[#0f1e1e]

// ">

//       <div className="logo">
//                     {/* <img src={logo} alt="" className='h-[30px]' /> */}

//       </div>

//       <div className="bar flex flex-col items-center w-[180px] h-[100vh] px-3      ">

//         <span className="text-white text-4xl py-3 font-bold ">axieva</span>

//        <div
//         className="Dashboard flex text-[20px] text-gray-100 gap-3 items-center font-semibold cursor-pointer py-2 my-1"
//         onClick={() => {
//           navigate("/");       // navigate first
//           window.location.reload();  // force reload
//         }}
//       >
//         <MdSpaceDashboard /> Bundle
//       </div>

//         <div className="Reports flex text-[20px] gap-3 items-center font-semibold     cursor-pointer   mb-1"
//         onClick={() => navigate('/Category')}>
//           <TbReportAnalytics /> Category
//         </div>

//           <div
//           className="Pending flex text-[20px] gap-3  items-center font-semibold cursor-pointer py-2   mb-1"
//          onClick={() =>navigate('Validity')}  // Navigate to Pending
//         >
//           <MdPendingActions /> Validity
//         </div>

//         {/* <div
//           className="Pending flex text-[20px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
//          onClick={() =>navigate('/Add_OPCODE')}  // Navigate to Pending
//         >
//           <MdPendingActions /> OPCODE
//         </div> */}
//          <div
//           className="Pending flex text-[18px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
//          onClick={() =>navigate('/Opcodes')}  // Navigate to Pending
//         >
//           <MdPendingActions /> OPCODE
//         </div>
//         {/* <div
//           className="Pending flex text-[20px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
//          onClick={() =>navigate('/Simp')}  >
//           <MdPendingActions /> Simp
//          </div>
//           <div
//           className="Pending flex text-[20px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
//          onClick={() =>navigate('/Demo')}  >
//           <MdPendingActions /> Demo
//          </div> */}

//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// // import { Empty } from "antd";
// // import React from "react";
// // import { MdPendingActions, MdSpaceDashboard } from "react-icons/md";
// // import { TbReportAnalytics } from "react-icons/tb";
// // import { useNavigate } from "react-router-dom";  // Import useNavigate

// // const Sidebar = () => {
// //   const navigate = useNavigate(); // Initialize navigation function

// //   return (
// //     <div className="pr-3  fixed">
// //       <div className="bar flex flex-col w-[180px] h-[100vh] px-3    bg-gray-400   ">

// //        <div
// //         className="Dashboard flex text-[20px] gap-3 items-center font-semibold cursor-pointer py-2 my-1"
// //         onClick={() => {
// //           navigate("/");       // navigate first
// //           window.location.reload();  // force reload
// //         }}
// //       >
// //         <MdSpaceDashboard /> Bundle
// //       </div>

// //         <div className="Reports flex text-[20px] gap-3 items-center font-semibold     cursor-pointer   mb-1"
// //         onClick={() => navigate('/Category')}>
// //           <TbReportAnalytics /> Category
// //         </div>

// //           <div
// //           className="Pending flex text-[20px] gap-3  items-center font-semibold cursor-pointer py-2   mb-1"
// //          onClick={() =>navigate('Validity')}  // Navigate to Pending
// //         >
// //           <MdPendingActions /> Validity
// //         </div>

// //         {/* <div
// //           className="Pending flex text-[20px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
// //          onClick={() =>navigate('/Add_OPCODE')}  // Navigate to Pending
// //         >
// //           <MdPendingActions /> OPCODE
// //         </div> */}
// //          <div
// //           className="Pending flex text-[18px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
// //          onClick={() =>navigate('/Opcodes')}  // Navigate to Pending
// //         >
// //           <MdPendingActions /> OPCODE
// //         </div>
// //         {/* <div
// //           className="Pending flex text-[20px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
// //          onClick={() =>navigate('/Simp')}  >
// //           <MdPendingActions /> Simp
// //          </div>
// //           <div
// //           className="Pending flex text-[20px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
// //          onClick={() =>navigate('/Demo')}  >
// //           <MdPendingActions /> Demo
// //          </div> */}

// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;
