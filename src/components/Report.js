import React, { useContext, useState } from "react";
import Download from "../icons/Download";
import DarkModeContext from "../context/DarkModeContext";
import { Flex, Spin } from "antd";

export const Report = ({ data }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:8080/getreport", {
        method: "GET",
      });

      const blob = await response.blob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "report.pdf";

      document.body.appendChild(link);
      link.click();

      URL.revokeObjectURL(url);
      document.body.removeChild(link);

      setIsLoading(false);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setIsLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "monospace", fontWeight: "500" }}>
      {data.length ? (
        <div>
          <h1>
            <b>Report</b><br/><br/>
          </h1>
          <h1>
            Here you can see detailed report of the daily activity and download
            the file min to min tracking report
          </h1>
          <br />
          <p>
            Your most used app is {data[0].app.split(".")[2]} you have used it
            for{" "}
            {`${data[0].time.split(":")[0]}H:${data[0].time.split(":")[1]}M`}{" "}
            time{" "}
          </p>
          <br />
          <p>
            You can download the detailed report for every minute here &nbsp;
            <button
              onClick={handleDownload}
              className={`rounded-lg border-1 border-neutral-400 p-2 hover:scale-125 ${
                darkMode
                  ? "fill-yellow-400 stroke-yellow-400"
                  : "fill-none stroke-neutral-400"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Flex align="center" gap="middle">
                    <Spin size="large" />
                    <p>Downloading report...</p>
                  </Flex>
                </>
              ) : (
                <Download />
              )}
            </button>
          </p>
        </div>
      ) : (
        <>No Data to Show at the moment....</>
      )}
    </div>
  );
};

export default Report;
