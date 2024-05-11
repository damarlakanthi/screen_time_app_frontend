import React, { useContext } from "react";
import {MoonIcon} from "@heroicons/react/solid"
import DarkModeContext from "../context/DarkModeContext";

export const DarkMode = () => {

    const {darkMode, setDarkMode} = useContext(DarkModeContext)

    const toggleDarkMode = ()=>{

        setDarkMode(!darkMode)
    }
  return (
    <button className={`rounded-lg border-1 border-neutral-400 p-2 absolute right-8 xl:right-32 shadow-lg top-8 xl:top-5 hover:scale-125 ${darkMode? "shadow-gray-800":null}` } onClick={toggleDarkMode} > 
  <MoonIcon className={`h-8 w-8 cursor-pointer stroke-1 fill-none  ${darkMode? "fill-yellow-400 stroke-yellow-400":"fill-none stroke-neutral-400"}` } />
</button>
  );
};
