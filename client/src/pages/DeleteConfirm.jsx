import React from 'react'

const deleteConfirm = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-7 shadow-2xl w-full mx-20">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-4 text-purple-800">Update Entry</h1>
                <button onClick={closeUpdate}><X/></button>
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
}

export default deleteConfirm