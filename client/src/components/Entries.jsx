import React, { useState, useEffect } from "react";

import axios from "axios";
import ViewEntries from "./ViewEntries";

const Entries = () => {
  
  const [visibleSection, setVisibleSection] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);
 
  const [description,setDescription]=useState("");
  const [amount,setAmount]=useState("");
  const [type,setType]=useState("");
  const [paymentMethod,setPaymentMethod]=useState("");
  const [date,setDate]=useState("");
  const [entries, setEntries] = useState([]);


  

  const handleClick = (index) => {
    setVisibleSection((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleAdd = (e) => {
    axios
      .post("http://localhost:3001/entries", {description,amount,type,paymentMethod,date})
      .then((result) => {
        console.log("Added data: ",result.data);
        setEntries([...entries,result.data])
        setDescription(""); setAmount(""); setType(""); setPaymentMethod(""); setDate("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-6 relative">
      {/* Background Blur Effect When Modal Opens */}
      <div className={`${showUpdate ? "blur-sm pointer-events-none" : ""}`}>
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          <input
            placeholder="Description"
            className="border p-2 rounded-md"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />
          <div className="flex flex-col lg:flex-row gap-2">
            <input
              placeholder="Amount"
              className="border p-2 rounded-md w-full"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              className="border p-2 rounded-md w-full"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
               <option value="" disabled>
                Payment Type
              </option>
              <option>Expense</option>
              <option>Income</option>
            </select>

            <select
              className="border p-2 rounded-md w-full"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="" disabled>
                Payment Method
              </option>
              <option>Online Payment</option>
              <option>Cash</option>
              <option>Debit Card</option>
            </select>
            <input
              type="date"
              className="border p-2 rounded-md w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button
              onClick={handleAdd}
              className="bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300"
            >
              Add
            </button>
          </div>
        </div>
        <ViewEntries/>
      </div>

      
    </div>
  );
};

export default Entries;
