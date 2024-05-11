import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import PieChart from "./PieChart";
import MostUsedApps from "./MostUsedApps";
import Report from "./Report";
import Header from "./Header";
import DarkModeContext from "../context/DarkModeContext";
import { Tabs, Badge} from "antd";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import Suggestions from "./Suggestions";
import { Bulb } from "../icons/Bulb";
import { Pie } from "../icons/Pie";
import {PieChartOutlined, BulbOutlined, BellOutlined} from '@ant-design/icons'
import './antstyles.css'
import { Bell } from "../icons/Bell";
import { Notifications } from "./Notifications";
import { v4 as uuidv4 } from 'uuid';



const Dashboard = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [data, setAppData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const[notiCount, setNotiCount] = useState(null);
  useEffect(() => {
    fetchData(); 

    const interval = setInterval(() => {
      fetchData(); 
    }, 60000);

    return () => clearInterval(interval); 
  }, []); 

  const fetchData = () => {
    fetch("http://localhost:8080/getAppData")
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        return resp.json();
      })
      .then((data) => setAppData(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(storedNotifications);

    const ws = new WebSocket("ws://localhost:8081");

    ws.onmessage = function (event) {
      const notification = JSON.parse(event.data);
      console.log("notification received",notification)
      const newNotification = {
        id: uuidv4(), 
        text: notification.message
      };
      setNotifications(prevNotifications => {
        const updatedNotifications = [...prevNotifications, newNotification];
        localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
        return updatedNotifications;
      });
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotiCount(notifications.length);
  }, [notifications]);

  if (data) {
    data.sort((a, b) => {
      const timeA = a.time
        .split(":")
        .reduce((acc, cur, i) => acc + parseInt(cur) * Math.pow(60, 2 - i), 0);
      const timeB = b.time
        .split(":")
        .reduce((acc, cur, i) => acc + parseInt(cur) * Math.pow(60, 2 - i), 0);
      return timeB - timeA;
    });
  }

  console.log('noti count',notiCount)

  

  return (
    <div
      className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols- grid-rows-8 md:grid-rows-7 xl:grid-rows-5 gap-4 p-4 auto-rows-fr  ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}
    >
      <div className={"col-span-1 md:col-span-2 xl:col-span-3 row-span-1"}>
        <Card>
          <Header  />
        </Card>
      </div>
      <div className="md:col-span-1 row-span-7 sm:col-span-1 ">
        <Card>
          {data ? (
            <div>
              <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    label: `Screen Time`,
                    key: "1",
                    children: <PieChart data={data} />,
                    icon:<Pie style={{display:'iinline-flex'}}/>,
                  
                  },
                  {
                    label: "Suggestions",
                    key: "2",
                    children: <Suggestions data={data}/>,
                    icon:<Bulb />
                  },
                  {
                    label: `Notifications`,
                    key: "3",
                    children: <Notifications notifications={notifications} setNotifications={setNotifications}/>,
                    icon:<Badge count={notiCount} ><Bell/></Badge>
                  },
                ]}
              />
            </div>
          ) : (
            <p>Loading data...</p>
          )}
        </Card>
      </div>
      <div className="row-span-4 col-span-2">
        <Card>{data ? <MostUsedApps data={data} /> : <>loading....</>}</Card>
      </div>
      <div className="row-span-2 xl:row-span-3 col-span-2">
        <Card>{data ? <Report data={data} /> : <>getting data....</>}</Card>
      </div>
    </div>
  );
};

export default Dashboard;
