import React, { useEffect, useState } from "react";
import PieChart from "./components/PieChart";
import Dashboard from "./components/Dashboard";
import "./index.css";
import DarkModeContext from "./context/DarkModeContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const matchMediaDark = window.matchMedia("(prefers-color-scheme: dark)");

    setDarkMode(matchMediaDark.matches);

    const handleChange = (e) => setDarkMode(e.matches);
    matchMediaDark.addEventListener("change", handleChange);

    return () => {
      matchMediaDark.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <Dashboard />
    </DarkModeContext.Provider>
  );
}

export default App;
