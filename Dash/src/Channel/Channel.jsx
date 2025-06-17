import React, { useEffect, useState } from 'react';
import useGetHook from './GetHook';
import { useNavigate } from 'react-router-dom';
 
const ChannelTable = () => {
  const { data, loading, error, fetchchnlData } = useGetHook();
  const navigate = useNavigate();
 
  useEffect(() => {
    fetchchnlData();
  }, []);
 
  return (
    <div className="absolute left-45 top-14 inset-0 px-5 border border-gray-200 rounded-xl m-2 bg-gray-100">
      <div className="flex flex-col">
 
        {/* Header Section */}
        <div className="flex justify-between items-center text-black pr-6 py-1 rounded-t-lg">
          <h1 className="text-2xl text-[#0f1e1e]">Channel</h1>
          <button
            onClick={() => navigate('/AddChannel')}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Add Channel
          </button>
        </div>
 
        {/* Table Section */}
        <div className="mt-4 overflow-auto">
          {loading ? (
            <div className="text-center py-6 text-lg font-semibold">Loading...</div>
          ) : error ? (
            <div className="text-red-600 font-semibold">Error: {error}</div>
          ) : (
            <table className="min-w-full bg-white border border-gray-300 rounded">
              <thead className="bg-gray-200 text-gray-800">
                <tr>
                  <th className="py-2 px-4 border-r">ID</th>
                  <th className="py-2 px-4">Channel</th>
                </tr>
              </thead>
              <tbody>
                {data.length ? (
                  data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border border-gray-200 text-center">{item.id}</td>
                      <td className="py-2 px-4 border border-gray-200 text-center">{item.channel}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="py-4 text-center text-gray-500">No Channels Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
 
      </div>
    </div>
  );
};
 
export default ChannelTable;