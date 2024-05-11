import React, { useContext } from "react";
import DarkModeContext from "../context/DarkModeContext";

const Card = ({ children }) => {
    const {darkMode} = useContext(DarkModeContext)
  return (
    <div className={`w-full h-full rounded-md relative p-8 border-2 ${
        darkMode ? "bg-gray-900 border-gray-600" : "bg-white border-neutral-200"
      }`}>
      {children}
    </div>
  );
};

export default Card;
