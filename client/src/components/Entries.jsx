import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import Update from "../pages/Update";

const Entries = () => {
  const [entries, setEntries] = useState([
    {
      Description: "Dummy",
      Amount: "Dummy",
      Type: "Dummy",
      PaymentMethod: "Dummy",
      Date: "Dummy",
    },
  ]);

  const [visibleSection, setVisibleSection] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);

  const handleClick = (index) => {
    setVisibleSection((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="p-6 relative">
      {/* Background Blur Effect When Modal Opens */}
      <div className={`${showUpdate ? "blur-sm pointer-events-none" : ""}`}>
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          <input placeholder="Description" className="border p-2 rounded-md" />
          <div className="flex flex-col lg:flex-row gap-2">
            <input placeholder="Amount" className="border p-2 rounded-md w-full" />
            <input placeholder="Category" className="border p-2 rounded-md w-full" />
            <select className="border p-2 rounded-md w-full">
              <option value="Payment Type" disabled>Payment Type</option>
              <option>Online Payment</option>
              <option>Cash</option>
              <option>Debit Card</option>
            </select>
            <input type="date" className="border p-2 rounded-md w-full" />
            <button className="bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300">
              Add
            </button>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-2xl font-semibold mb-4">Expenses</p>
          {entries.map((entry, index) => (
            <div key={index} className="border p-4 rounded-md shadow-sm mb-3">
              <div className="flex justify-between items-center">
                <p className="cursor-pointer w-full" onClick={() => handleClick(index)}>
                  {entry.Description}
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setShowUpdate(true)} className="text-black">
                    <Edit2 />
                  </button>
                  <button className="text-red-500">
                    <Trash2 />
                  </button>
                </div>
              </div>

              {visibleSection[index] && (
                <div className="mt-2 text-gray-600">
                  <p>Amount: {entry.Amount}</p>
                  <p>Type: {entry.Type}</p>
                  <p>Payment Method: {entry.PaymentMethod}</p>
                  <p>Date: {entry.Date}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {showUpdate && <Update closeUpdate={() => setShowUpdate(false)} />}
    </div>
  );
};

export default Entries;
