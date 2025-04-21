import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FilePenLine, Trash2 } from "lucide-react";
import Entries from "./Entries";
import Detail from "../pages/Detail";
import { AuthContext } from "../context/AuthContext";

const ViewEntries = () => {
  const [visibleSection, setVisibleSection] = useState({});
  const [entries, setEntries] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [balance,setBalance]=useState(0);
  const { entryId, setEntryId } = useContext(AuthContext);

  useEffect(() => {
    const fetchDataEntries = async () => {
      const userId = localStorage.getItem("userid");
      console.log("userId", userId);
      try {
        const response = await axios.get(
          `http://localhost:3001/entries?userId=${userId}`
        );
        console.log("response:", response.data);
        setEntries(response.data);
        console.log("Entry type : ", response.data[0].type);
        const totalBalance = response.data.reduce((acc, entry) => { 
          return acc + (entry.type === "Income" ? entry.amount : -entry.amount);
        }
        , 0);
        setBalance(totalBalance);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataEntries();
  }, [entries]);

  const handleClick = (index) => {
    setEntryId(entries[index]._id);
    setShowDetails(true);
  };

  const closeModel = () => {
    setShowDetails(false);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-baseline mb-4">
        <p className="text-2xl font-semibold mb-4">Expenses</p>
        <p className="font-light">Balance : {balance}</p>
      </div>
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
              <button className="text-red-500">
                <Trash2 size={18} />
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
      {/* Modal Overlay */}
      {showDetails && <Detail closeUpdate={() => setShowDetails(false)} />}
    </div>
  );
};

export default ViewEntries;
