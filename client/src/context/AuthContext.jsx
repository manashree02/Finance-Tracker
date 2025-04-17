import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [entryId,setEntryId]=useState("");
  
  useEffect(()=>{
    console.log("entryId",entryId);
  },[entryId])

  const login = (username) => {
    const userId = uuidv4();  
    setUser({ username, userId });
    
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userid");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,entryId,setEntryId }}>
      {children}
    </AuthContext.Provider>
  );
};
