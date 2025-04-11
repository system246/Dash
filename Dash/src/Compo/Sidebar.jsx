import { Empty } from "antd";
import React from "react";
import { MdPendingActions, MdSpaceDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize navigation function

  return (
    <div className="pr-3  fixed">
      <div className="bar flex flex-col w-[250px] h-[100vh] shadow-2xl bg-gray-200 py-2 px-3 ">
        
        <div
          className="Dashboard flex text-2xl gap-3 items-center   hover:bg-blue-200 hover:text-blue-600 cursor-pointer py-2  my-3"
          onClick={() => navigate("/Dash")}  // Navigate to Dashboard
        >
          <MdSpaceDashboard /> Bundle
        </div>

        <div className="Reports flex text-2xl gap-3 items-center    hover:bg-blue-200 hover:text-blue-600 cursor-pointer py-2  mb-3"
        onClick={() => navigate('/Category')}>
          <TbReportAnalytics /> Category
        </div>

         <div
          className="Pending flex text-2xl gap-3  items-center  hover:bg-blue-200 hover:text-blue-600 cursor-pointer py-2   mb-3"
         onClick={() =>navigate('/valid/:categoryName')}  // Navigate to Pending
        >
          <MdPendingActions /> Validity
        </div>

        <div
          className="Pending flex text-2xl gap-3  items-center  hover:bg-blue-200 hover:text-blue-600 cursor-pointer py-2   mb-3"
         onClick={() =>navigate('/emp')}  // Navigate to Pending
        >
          <MdPendingActions /> Emp
        </div>
 
         

       

      </div>
    </div>
  );
};

export default Sidebar;
