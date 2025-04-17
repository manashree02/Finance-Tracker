import React,{useEffect,useState} from 'react'
import axios from "axios";
import { FilePenLine, Trash2 } from "lucide-react";
import Entries from './Entries';
import Update from "../pages/Update";

const ViewEntries = () => {
    const [visibleSection, setVisibleSection] = useState({});
    const [entries, setEntries] = useState([]);
    const [showUpdate, setShowUpdate] = useState(false);
    
      useEffect(() => {
        const fetchDataEntries = async () => {
          const userId=localStorage.getItem('userid');
          console.log("userId",userId);
        try{
        const response=await axios.get(`http://localhost:3001/entries?userId=${userId}`)
        console.log("response:",response.data)
        setEntries(response.data); 
        }
        catch(err){
          console.log(err);
        }
      }
      fetchDataEntries();
    }, []); 

  return (
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
          {/* Modal Overlay */}
      {showUpdate && <Update closeUpdate={() => setShowUpdate(false)} />}
        </div>
  )
}

export default ViewEntries