import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Button, Spin, message } from 'antd';
import useBundleFetch from '../../hooks/ValidHook';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

const Valid = () => {
  const location = useLocation();
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const stateData = location.state || {};
  let { opcode, channel,  } = stateData;

  if (!opcode || !channel) {
    const storedInputs = JSON.parse(localStorage.getItem('categoryInputs'));
    if (storedInputs) {
      opcode = storedInputs.opcode;
      channel = storedInputs.channel;
      
    }
  }

  const { bundles, loading, error, fetchBundles } = useBundleFetch();
  const [bundleList, setBundleList] = useState([]);

  useEffect(() => {
    if (!opcode || !channel || !categoryName) {
      message.error('Missing data. Please return and fill all fields.');
      return;
    }

    const getData = async () => {
      const result = await fetchBundles(opcode, channel,categoryName);
      if (!result.success) {
        message.error(result.message);
      } else {
        message.success(`TxnID: ${result.txnId}`);
        setBundleList(result.bundles);
      }
    };

    getData();
  }, [opcode, channel, , categoryName]);

  const moveRow = (dragIndex, hoverIndex) => {
    setBundleList((prevList) =>
      update(prevList, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevList[dragIndex]]
        ]
      })
    );
  };

  const DraggableRow = ({ item, index, moveRow }) => {
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
        isDragging: monitor.isDragging()
      })
    });

    drag(drop(ref));

    return (
      <tr ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="text-center">
        <td className="border px-4 py-2">{index + 1}</td>
        <td className="border px-4 py-2">
          <Button
            onClick={() =>
              navigate(`/allbndl/${categoryName}`, {
                state: { opcode, channel,validity: item.validity }
              })
            }
            type="primary"
          >
            {item.validity}
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="absolute inset-0 overflow-hidden top-20 left-65 py-4 px-2">
       <div className="flex items-center justify-between">
       <h1 className='text-sm py-2 text-gray-400 underline'>Category/Validity</h1>
       <Button onClick={()=>navigate('/')}>+Add new Validity</Button>
       </div>
        <h1 className="text-2xl font-bold underline mb-4">Bundle Details for {categoryName}</h1>

        <div className="mb-4 text-md rounded font-mono flex border border-gray-200 p-2 justify-between">
          <p className='shadow p-2'><strong>OPCODE:</strong> {opcode}</p>
          <p className='shadow p-2'><strong>CHANNEL:</strong> {channel}</p>
          <p className='shadow p-2'><strong>:</strong> {}</p>
          <p className='shadow p-2'><strong>CATEGORY:</strong> {categoryName}</p>
        </div>

        <h1 className="text-2xl font-bold underline mb-4">Validity for {categoryName}</h1>

        {loading ? (
          <Spin tip="Loading bundles..." />
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Serial No</th>
                <th className="border px-4 py-2">Validity</th>
              </tr>
            </thead>
            <tbody>
              {bundleList.map((item, index) => (
                <DraggableRow
                  key={index}
                  item={item}
                  index={index}
                  moveRow={moveRow}
                />
              ))}
            </tbody>
          </table>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </DndProvider>
  );
};

export default Valid;
