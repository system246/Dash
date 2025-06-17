import React from 'react';
import useBundleStats from './BundleState_hook'; // adjust path as needed
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { AiFillFileText } from "react-icons/ai";

const Home_Page = () => {
  const { stats, loading, error } = useBundleStats();

  return (
    <div className="absolute top-14 inset-0  md:ml-[170px] w-[calc(100%-170px)] px-4 py-3 overflow-x-hidden">
      <div className="border border-gray-200 rounded-lg bg-white p-4">
        <h1 className="text-2xl text-[#0f1e1e] py-3">DashBoard</h1>

        {loading ? (
          <p>Loading stats...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Total Bundle */}
            <div className="flex border border-gray-200 rounded-[10px] shadow-lg">
              <div className="flex items-center justify-center bg-zinc-200 px-6 rounded-l-[10px]">
                <AiFillFileText className="bg-zinc-900 text-white rounded-full p-1 h-[30px] w-[30px]" />
              </div>
              <div className="flex items-center justify-center px-3">
                <h1 className="text-sm font-semibold text-gray-600 ">
                  Total Bundle <br />
                  <span className='text-lg font-bold text-gray-800'>{stats.total}</span>
                </h1>
              </div>
            </div>

            {/* Active Bundle */}
            <div className="flex border border-gray-200 rounded-[10px] shadow-lg">
              <div className="flex items-center justify-center bg-zinc-200 px-6 rounded-l-[10px]">
                <FaCircleCheck className="text-white bg-green-500 rounded-full p-1 h-[30px] w-[30px]" />
              </div>
              <div className="flex items-center justify-center px-3">
                <h1 className="text-sm font-semibold text-gray-600">
                  Active Bundle <br />
                  <span className="text-lg font-bold text-gray-800">{stats.active}</span>
                </h1>
              </div>
            </div>

            {/* Inactive Bundle */}
            <div className="flex border border-gray-200 rounded-[10px] shadow-lg">
              <div className="flex items-center justify-center bg-zinc-200 px-6 rounded-l-[10px]">
                <FaCircleXmark className="text-white bg-red-500 rounded-full p-1 h-[30px] w-[30px]" />
              </div>
              <div className="flex items-center justify-center px-3">
                <h1 className="text-sm font-semibold text-gray-600">
                  Inactive Bundle <br />
                  <span className='text-lg font-bold text-gray-800'>{stats.inactive}</span>
                </h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home_Page;





// import React from 'react';
// import useBundleStats from './BundleState_hook'; // adjust path as needed
// import { FaCircleCheck,FaCircleXmark  } from "react-icons/fa6";
// import { AiFillFileText } from "react-icons/ai";



// const Home_Page = () => {
//   const { stats, loading, error } = useBundleStats();

//   return (
//     <div className="relative left-45 px-4  my-3 border border-gray-200 rounded-lg bg-white shadow-md m-2 pb-[10vh]">
//       <h1 className="text-2xl text-gray-500 py-3">DashBoard</h1>

//       {loading ? (
//         <p>Loading stats...</p>
//       ) : error ? (
//         <p className="text-red-600">Error: {error}</p>
//       ) : (
//         <div className="box_cont grid-cols-3 grid border  rounded-[16px] border-transparent gap-4">
//           {/* Total Bundle */}
//           <div className="box flex border border-gray-200  text-center rounded-[10px] shadow-lg">
//             <div className="logo flex items-center justify-center bg-zinc-200 px-6 rounded-l-[10px]">
//               <AiFillFileText className="bg-zinc-900 text-white rounded-full p-1 h-[30px] w-[30px]" />
//             </div>
//             <div className="txt flex items-center justify-center px-3">
//               <h1 className="text-xl text-start font-mono">
//                 Total Bundle <br />
//                 <span>{stats.total}</span>
//               </h1>
//             </div>
//           </div>

//           {/* Active Bundle */}

//           <div className="box flex border  border-gray-200 text-center rounded-[10px] shadow-lg">
//             <div className="logo flex items-center justify-center bg-zinc-200 px-6 rounded-l-[10px]">
//               < FaCircleCheck className="text-white rounded-full p-1 bg-green-500 h-[30px] w-[30px]" />
//             </div>
//             <div className="txt  text-center px-3">
//               <h1 className="text-xl text-start font-mono">
//                 Active Bundle <br />
//                 <span>{stats.active}</span>
//               </h1>
//             </div>
//           </div>

//           {/* Inactive Bundle */}
//           <div className="box flex border border-gray-200  text-center rounded-[10px] shadow-lg">
//             <div className="logo flex items-center justify-center bg-zinc-200 px-6 rounded-l-[10px]">
//               <FaCircleXmark  className="text-white bg-red-500 rounded-full p-1 h-[30px] w-[30px]" />
//             </div>
//             <div className="txt flex items-center justify-center px-3">
//               <h1 className="text-xl text-start font-mono">
//                 InActive Bundle <br />
//                 <span>{stats.inactive}</span>
//               </h1>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home_Page;
