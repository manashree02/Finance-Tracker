import React, { useEffect, useState } from "react";
import { LogOut } from 'lucide-react';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Header = () => {
  const {user,logout}=useContext(AuthContext);
  const [username,setUserName]=useState("")

  useEffect(() => {
    if (user && user.username) {
      setUserName(user.username); 
    }
  }, [user]); 

  useEffect(() => {
    console.log('header : ', username); 
  }, [username]);

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
      <div className="flex gap-4">
        <div className="flex gap-1 items-center">
          <LogOut size={18}/>
          <button onClick={handleClick}>Logout</button>
        </div>
        <p>{username}</p>
      </div>
    </div>
  );
};

export default Header;
