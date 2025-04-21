import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { FilePenLine, Trash2 } from "lucide-react";
import Update from "../pages/Detail";
import ViewEntries from "./ViewEntries";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Entries = () => {
  //const {user}=useContext(AuthContext)
  const [visibleSection, setVisibleSection] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);
  const [userId, setUserId] = useState("");

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [date, setDate] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchDataEntries = async () => {
      try {
        const userId = localStorage.getItem("userid");
        setUserId(userId);

        const response = await axios.get(
          `http://localhost:3001/entries?userId=${userId}`
        );

        console.log("User-specific entries:", response.data);
        setEntries(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataEntries();
  }, [userId,entries]);

  const handleClick = (index) => {
    setVisibleSection((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleAdd = (e) => {
    if (!userId) {
      console.log("User ID is missing");
      return;
    }
    axios
      .post("http://localhost:3001/entries", {
        userId: userId,
        description,
        amount,
        type,
        paymentMethod,
        date,
      })
      .then((result) => {
        console.log("Added data: ", result.data);
        setEntries([...entries, result.data]);
        setDescription("");
        setAmount("");
        setType("");
        setPaymentMethod("");
        setDate("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-6 relative">
      <div>
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          <input
            placeholder="Description"
            className="border p-2 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            
          </div>
          <div className="flex justify-center">
          <button
              onClick={handleAdd}
              className="bg-violet-700 px-14 py-2 rounded-md w-full mt-6 hover:bg-violet-500 text-white"
            >
              Add
            </button>
          </div>
        </div>
        <ViewEntries />
      </div>
    </div>
  );
};

export default Entries;
