import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import Update from "../pages/Update";
import axios from "axios";

const Entries = () => {
  const [entries, setEntries] = useState([
    {
      description: "Dummy",
      amount: "Dummy",
      type: "Dummy",
      paymentMethod: "Dummy",
      date: "Dummy",
    },
  ]);

  const [visibleSection, setVisibleSection] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);

  const [newEntry, setNewEntry] = useState({
    description: "",
    amount: "",
    type: "",
    paymentMethod: "",
    date: "",
  });

  const handleClick = (index) => {
    setVisibleSection((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleChange = (field, value) => {
    setNewEntry((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/entries", newEntry)
      .then((result) => {
        setEntries([...entries, newEntry]); // Update state with the new entry
        console.log(result);
        setNewEntry({ description: "", amount: "", type: "", paymentMethod: "", date: "" }); // Reset form
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
            value={newEntry.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <div className="flex flex-col lg:flex-row gap-2">
            <input
              placeholder="Amount"
              className="border p-2 rounded-md w-full"
              value={newEntry.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
            />
            <input
              placeholder="Type"
              className="border p-2 rounded-md w-full"
              value={newEntry.type}
              onChange={(e) => handleChange("type", e.target.value)}
            />
            <select
              className="border p-2 rounded-md w-full"
              value={newEntry.paymentMethod}
              onChange={(e) => handleChange("paymentMethod", e.target.value)}
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
              value={newEntry.date}
              onChange={(e) => handleChange("date", e.target.value)}
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
                    <Edit2 />
                  </button>
                  <button className="text-red-500">
                    <Trash2 />
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
