import React, { useEffect, useState, useContext } from "react";
import { LogOut } from 'lucide-react';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Header = () => {
  const {logout}=useContext(AuthContext);
  const [username,setUserName]=useState("")

  useEffect(() => {

    const fetchUserName=async()=>{
      try{
        const userId=localStorage.getItem('userid');
        if (!userId) return;
        const response=await axios.get(`http://localhost:3001/user/${userId}`);
        console.log("responce : ",response.data);
        const email=response.data.username;
        const name=email.split('@')[0];
        setUserName(name);
      }
      catch(err){
        console.log(err);
      }
    }
    fetchUserName();
    console.log('header : ', username); 
  }, []);

  const navigate=useNavigate();
  const handleClick=()=>{
    logout();
    navigate('/')
  }

  return (
    <div className="bg-violet-700 flex justify-between items-center h-max px-4 py-2 font-sans">
      <div>
        <p className="text-4xl font-semibold">Expense</p>
        <p className="font-semibold text-xl">Tracker</p>
      </div>
      <div className="flex gap-4 text-white">
        <p><span className="text-xl">Welcome, </span>{username}</p>
        <div className="flex gap-1 items-center" onClick={handleClick}>
          <LogOut size={22} className="cursor-pointer hover:scale-125 transition-all text-black" />
        </div>
      </div>
    </div>
  );
};

export default Header;
