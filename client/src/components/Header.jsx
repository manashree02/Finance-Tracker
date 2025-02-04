import React from "react";
import { LogOut } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-violet-700 flex justify-between items-center h-max px-4 py-2 font-sans">
      <div>
        <p className="text-4xl font-semibold">Expense</p>
        <p className="font-semibold text-xl">Tracker</p>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-1 items-center">
          <LogOut size={18}/>
          <button>Logout</button>
        </div>
        <p>manashree</p>
      </div>
    </div>
  );
};

export default Header;
