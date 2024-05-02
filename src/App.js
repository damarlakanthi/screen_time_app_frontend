import React, { useEffect, useState } from 'react';
import PieChart from './PieChart';

function App() {
  const [data, setAppData] = useState(null);

  useEffect(() => {
    fetchData(); // Initial fetch when component mounts

    const interval = setInterval(() => {
      fetchData(); // Fetch data every 1 minute
    }, 6000); // 1 minute interval in milliseconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const fetchData = () => {
    fetch('http://localhost:8080/getAppData')
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        return resp.json();
      })
      .then((data) => setAppData(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h1 style={{textAlign:'center'}}>Screen Time 🕑</h1>
      {data ? <PieChart data={data} /> : <p>Loading data...</p>}
    </div>
  );
}

export default App;
