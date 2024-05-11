import { Button } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { Bulb } from "../icons/Bulb";
import { Flex, Spin } from "antd";
import DarkModeContext from "../context/DarkModeContext";

export const Suggestions = ({ data }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {}, [prompt, loading, data]);

  const reduceScreenTimeTips = () => {
    console.log("reduce");
    setLoading(true);
    fetch("http://localhost:8080/getSuggestions")
      .then((resp) => resp.json())
      .then((data) => {
        setPrompt(data);
        setLoading(false);
      });
  };

  let query = prompt?.data;

  const paragraphs = query
    ?.split("\n")
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);
  return (
    <div
      className={`${darkMode ? "text-white" : "text-black"} ${
        darkMode ? "bg-gray-800" : "bg-white"
      } border-neutral-200`}
    >
      <p>Do you need help with reducing screen time? </p>
      <p>Reducing screen time can have several benefits</p>
      <p>
        Would you like more information or specific tips on how to reduce screen
        time effectively?
      </p>
      <br />

      {data ? (
        <Button onClick={reduceScreenTimeTips} disabled={loading}>
          {" "}
          💡 Get suggestions..
        </Button>
      ) : (
        <p>No data to suggest you at this moment...</p>
      )}
      <br />
      <br />

      {loading ? (
        <>
          <Flex align="center" gap="middle">
            <Spin size="large" />
            <p>Analysing your screen time data...</p>
          </Flex>
        </>
      ) : (
        <>
          {prompt ? (
            <div style={{ overflowY: "scroll", height: "50vh" }}>
              {paragraphs}
            </div>
          ) : (
            <></>
          )}
        </>
      )}
      <style>
        {`
        /* For Webkit Browsers (Chrome, Safari, Edge) */
        ::-webkit-scrollbar {
          width: 5px; /* Adjust the width of the scrollbar */
        }

        ::-webkit-scrollbar-thumb {
          background: #888; /* Color of the scrollbar thumb */
          border-radius: 5px; /* Rounded corners for the scrollbar thumb */
        }

        /* For Firefox and Edge Chromium */
        ::-webkit-scrollbar-thumb {
          width: 5px; /* Adjust the width of the scrollbar thumb */
          background-color: #888;
          border-radius: 5px;
        }
      `}
      </style>
    </div>
  );
};

export default Suggestions;
