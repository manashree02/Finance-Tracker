import React,{useContext,useEffect,useState} from "react";
import {X} from "lucide-react"
import { AuthContext } from '../context/AuthContext';
import axios from "axios";


const Detail = ({ closeUpdate}) => {
  const {entryId}=useContext(AuthContext);
  const [detail, setDetail] = useState([]);

  useEffect(()=>{
    console.log(detail);
    const updateData = async () => {
      try{
      const response=await axios.put(`http://localhost:3001/detail/${entryId}`,detail)
      console.log("Update response:", response.data);
      }
      catch(err){
        console.log(err);
      }
    }
    updateData();
  })

  useEffect(() => {
    const fetchDataEntries = async () => {
    try{
    const response=await axios.get(`http://localhost:3001/detail?entryId=${entryId}`)
    console.log("response:",response.data)
    setDetail(response.data); 
    }
    catch(err){
      console.log(err);
    }
  }
  fetchDataEntries();
  console.log("detail",detail);
}, []); 

  const handleChange=(e,val)=>{
    console.log("val",val);
    switch(val){
      case "description":
        setDetail({...detail,description:e.target.value});
        break;
      case "amount":
        setDetail({...detail,amount:e.target.value});
        break;
      case "type":
        setDetail({...detail,type:e.target.value});
        break;
      case "paymentMethod":
        setDetail({...detail,paymentMethod:e.target.value});
        break;
      case "date":
        setDetail({...detail,date:e.target.value});
        break;
      default:
        break;
        
    }
  }
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={closeUpdate}>
      <div className="bg-white p-8 shadow-2xl w-full lg:w-2/4 mx-20 rounded-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-baseline">
            <h1 className="text-2xl font-bold mb-4 text-purple-800">Entry Details</h1>
            <X className="text-purple-800 hover:text-purple-950 hover:scale-105 transition-all cursor-pointer" size={30} onClick={closeUpdate}/>
        </div>
        <input placeholder="Description" defaultValue={detail.description} onChange={(e)=>handleChange(e,"description")} className="border  p-2 rounded-md w-full mb-2" />
        <input placeholder="Amount" defaultValue={detail.amount} onChange={(e)=>handleChange(e,"amount")} className="border p-2 rounded-md w-full mb-2" />
        <select className="border p-2 rounded-md w-full mb-2" defaultValue={detail.type} onChange={(e)=>handleChange(e,"type")}>
          <option  disabled>Expense Type</option>
          <option>Income</option>
          <option>Expence</option>
        </select>
        <select className="border p-2 rounded-md w-full mb-2" defaultValue={detail.paymentMethod} onChange={(e)=>handleChange(e,"paymentMethod")}>
          <option disabled>Payment Type</option>
          <option>Online Payment</option>
          <option>Cash</option>
          <option>Debit Card</option>
        </select>
        <input type="date" defaultValue={detail.date?new Date(detail.date).toISOString().split('T')[0]:''} onChange={(e)=>handleChange(e,"date")} placeholder="Date" className="border p-2 rounded-md w-full mb-2" />
      </div>
    </div>
  );
};

export default Detail;
