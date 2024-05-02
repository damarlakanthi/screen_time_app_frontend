import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
  const chartContainer = useRef(null);
  const chartRef = useRef(null);

  const totalTimeCalc = (data) => {
    const totalTimeInSeconds = data.reduce((total, item) => {
      const timeParts = item.time.split(':');
      return (
        total +
        parseInt(timeParts[0]) * 3600 +
        parseInt(timeParts[1]) * 60 +
        parseFloat(timeParts[2])
      );
    }, 0);

    const totalHours = Math.floor(totalTimeInSeconds / 3600);
    const totalMinutes = Math.floor((totalTimeInSeconds % 3600) / 60);
    const totalFormatted = `${totalHours}H ${totalMinutes}M`;
    return totalFormatted;
  };

  const getTimeFormatted = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(parseFloat);
    const timeFormatted = `${hours}H ${minutes}M`;
    return timeFormatted;
  };

  const cleanupChart = () => {
    if (chartRef.current) {
      chartRef.current.selectAll('*').remove();
    }
  };

  useEffect(() => {
    if (!data || !chartContainer.current) return;

    cleanupChart(); // Clean up before rendering the new chart

    const totalFormatted = totalTimeCalc(data);

    const width = 500;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    const innerRadius = 120;
    const padding = 40;

    const svg = d3
      .select(chartContainer.current)
      .selectAll('svg')
      .data([data]) // Use an array with one item (data) for the data join
      .join('svg')
      .attr('width', width + padding * 2)
      .attr('height', height + padding * 2)
      .append('g')
      .attr('transform', `translate(${width / 2 + padding},${height / 2 + padding})`);

    const pie = d3.pie().value((d) => parseFloat(d.time.split(':')[1])).sort(null);

    pie.padAngle(0.052);

    const arc = d3.arc().innerRadius(innerRadius).outerRadius(radius);

    const color = d3.scaleOrdinal().domain(data.map((d) => d.app)).range(d3.schemeCategory10);

    const arcs = pie(data);

    svg
      .selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.app))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .on('mouseover', function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', d3.arc().innerRadius(innerRadius).outerRadius(radius + 15));

        document.querySelector('.total-time').textContent = `${d.data.app.split('.')[2]} ${getTimeFormatted(d.data.time)}`;
      })
      .on('mouseout', function () {
        d3.select(this).transition().duration(200).attr('d', arc);

        document.querySelector('.total-time').textContent = `Total Time: ${totalFormatted}`;
      });

    chartRef.current = svg; // Store the SVG reference

    return cleanupChart; // Return the cleanup function
  }, [data]); // Only re-render when data changes

  useEffect(() => {
    return () => {
      cleanupChart(); // Clean up when the component unmounts
    };
  }, []);

  return (
    <div ref={chartContainer} className="pie-chart-container">
      <div className="total-time">Total Time: {totalTimeCalc(data)}</div>
      <style>{`
        .pie-chart-container {
          position: relative;
          padding: 30%;
        }

        .total-time {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 18px;
          font-weight: bold;
          color: #204ec2;
        }
      `}</style>
    </div>
  );
};

export default PieChart;
