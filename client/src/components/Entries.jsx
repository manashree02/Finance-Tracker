import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { FilePenLine, Trash2 } from "lucide-react";
import Update from "../pages/Update";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Entries = () => {
  const {user}=useContext(AuthContext)
  const [visibleSection, setVisibleSection] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);
 
  const [description,setDescription]=useState("");
  const [amount,setAmount]=useState("");
  const [type,setType]=useState("");
  const [paymentMethod,setPaymentMethod]=useState("");
  const [date,setDate]=useState("");

  const [entries, setEntries] = useState([]);

  


  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`http://localhost:3001/entries?userId=${user._id}`) 
        .then((result) => {
          console.log("User-specific entries:", result.data);
          setEntries(result.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleClick = (index) => {
    setVisibleSection((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleAdd = (e) => {
    console.log('user',user);
    console.log('user id',user.userId);
    
    
    if (!user || !user.userId) {
      console.log("User ID is missing");
      return;
    }
    axios
      .post("http://localhost:3001/entries", { userId:user.userId,description,amount,type,paymentMethod,date})
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
                Type
              </option>
              <option>Income</option>
              <option>Expense</option>
            </select>
            <select
              className="border p-2 rounded-md w-full"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="" disabled>
                Payment Type
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

        <div className="mt-6">
          <p className="text-2xl font-semibold mb-4">Expenses</p>
          {entries.map((entry, index) => (
            <div key={index} className="border p-4 rounded-md shadow-sm mb-3">
              <div className="flex justify-between items-center">
                <p
                  className="cursor-pointer w-full"
                  onClick={() => handleClick(index)}
                >
                  {entry.description}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowUpdate(true)}
                    className="text-black"
                  >
                    <FilePenLine color="purple" size={18} />
                  </button>
                  <button className="text-red-500">
                    <Trash2 size={18}/>
                  </button>
                </div>
              </div>

              {visibleSection[index] && (
                <div className="mt-2 text-gray-600">
                  <p>Amount: {entry.amount}</p>
                  <p>Type: {entry.type}</p>
                  <p>Payment Method: {entry.paymentMethod}</p>
                  <p>Date: {entry.date}</p>
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
