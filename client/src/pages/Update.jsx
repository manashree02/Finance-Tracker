import React from "react";
import {X} from "lucide-react"

const Update = ({ closeUpdate }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 shadow-2xl w-full lg:w-2/4 mx-20 rounded-lg">
        <div className="flex justify-between items-baseline">
            <h1 className="text-2xl font-bold mb-4 text-purple-800">Update Entry</h1>
            <X className="text-purple-800 hover:text-purple-950 hover:scale-105 transition-all cursor-pointer" size={30} onClick={closeUpdate}/>
        </div>
        <input placeholder="Description" className="border  p-2 rounded-md w-full mb-2" />
        <input placeholder="Amount" className="border p-2 rounded-md w-full mb-2" />
        <input placeholder="Type" className="border p-2 rounded-md w-full mb-2" />
        <select className="border p-2 rounded-md w-full mb-2">
          <option value="Payment Type" disabled>Payment Type</option>
          <option>Online Payment</option>
          <option>Cash</option>
          <option>Debit Card</option>
        </select>
        <input type="date" placeholder="Date" className="border p-2 rounded-md w-full mb-2" />
      </div>
    </div>
  );
};

export default Update;
