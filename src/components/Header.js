import React from "react";
import {notification } from 'antd';
import { DarkMode } from "./DarkMode";

const Header = () => {
    
  return (
    <div>
        <h1 style={{fontWeight:'700', fontFamily:'sans-serif'}}>Screen Time Application</h1>
       
       <DarkMode/>
    </div>
  );
};


export default Header;
