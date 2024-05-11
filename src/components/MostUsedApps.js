import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ProgressBar = ({ percentage, barHeight }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const progress = svg
  .append("rect")
  .attr("width", (percentage * width) / 100)
  .attr("height", height)
  .attr("fill", "steelblue")
  .style("transform", "translateY(5px)") // Add margin top
  .on("mousemove", (event) => {
    const mouseX =
      event.clientX - svgRef.current.getBoundingClientRect().left;
    const percentValue = Math.round((mouseX / width) * 100);
    tooltip
      .html(percentValue + "%")
      .style("left", event.pageX + 10 + "px")
      .style("top", event.pageY - 10 + "px")
      .style("display", "block");
  })
  .on("mouseleave", () => tooltip.style("display", "none"));

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("display", "none")
      .style("position", "absolute")
      .style("background-color", "rgba(0, 0, 0, 0.7)")
      .style("color", "#fff")
      .style("padding", "5px 10px")
      .style("border-radius", "5px");

    return () => {
      svg.selectAll("*").remove();
      tooltip.remove();
    };
  }, [percentage]);

  return <svg ref={svgRef} style={{ height: barHeight, width: "100%" }} />;
};

const mappingAppType = {
  Chrome: "Education",
  VSCode: "Work",
  Word: "Education",
  FaceTime:"Social",
  WhatsApp:'Social'
};

const MostUsedApps = ({ data }) => {
  const topFive = data.slice(0, 5);

  const getTotalTime = () => {
    let total = 0;
    topFive.forEach((item) => {
      total += timeToSeconds(item.time); // Convert time to seconds
    });
    return total;
  };

  const timeToSeconds = (time) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  return (
    <div>
        <style>
        {`
          .Education {
            background-color:#458c37;
            color:white;
            padding:4px;
            margin-left:5px;
            border-radius:10px;
            

          }
          .Work{
            background-color:#3a74e8;
            color:white;
            padding:4px;
            margin-left:5px;
            border-radius:10px;
          }
          .utility{
            background-color:#d16726;
            color:white;
            padding:2px;
            margin-left:5px;
            border-radius:10px;
          }
          .Social{
            background-color:#f08490;
            color:white;
            padding:2px;
            margin-left:5px;
            border-radius:10px;
          }
        `}
      </style>
      <p style={{fontFamily:'serif'}}>
        <b>Your Most Used Apps</b><br/><br/>
      </p>
      {topFive.length ? (
        topFive.map((item, index) => (
          <div key={index}>
            {item.app.split(".")[2]} : {item.time}{" "}
            {mappingAppType[item.app.split(".")[2]]
              ? <span className={`${mappingAppType[item.app.split(".")[2]]}`}>{mappingAppType[item.app.split(".")[2]]}</span>
              : <span className="utility">Utility</span>}
            <span>
              <ProgressBar
                percentage={(timeToSeconds(item.time) / getTotalTime()) * 100}
                barHeight={10} 
              />
            </span>
            <br />
          </div>
        ))
      ) : (
        <>No Data to Show at the moment...</>
      )}
    </div>
  );
};

export default MostUsedApps;
