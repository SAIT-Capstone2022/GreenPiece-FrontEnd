import React, { useCallback, useEffect, useState } from "react"
import { Line } from "react-chartjs-2";
import axios from "axios";

export const LineGraphs = () => {

  const thisUser = localStorage.getItem("user");
  const userObject = JSON.parse(thisUser);

  const data = {
    email: userObject.email
  };

  const [loading, setLoading] = useState(true);

  const [responseData, setResponseData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const url = "http://localhost:5000/data/getSensorData/graph";
      const { data: res } = await axios.post(url, data);
      setResponseData(res.data);
      setLoading(false);
    }
    fetchData()
  }, []);

  if (loading) {
    return null;
  }

  const getLabels = () => {
    const currentDate = new Date();
    const datesArray = [];
    for (let i = 24; i > 0; i--) {
      currentDate.setUTCHours(-i);
      datesArray.push(currentDate.toLocaleTimeString(navigator.language, {hour: "2-digit"}));
    }
    return datesArray;
  }

  const filterData = responseData.filter((value) => value);

  /*const temperatureGraphData  = ({
      labels: timeArray,
      datasets: [
          {
            label: "Temperature for the last 7 hours",
            data: temperatureArray
          }],
        });
  
        const humidityGraphData = ({
          labels: timeArray,
          datasets: [
              {
                label: "Percentage humidity for the last 7 hours",
                data: humidityArray,
              }]
            });
  
            const [moistureGraphData, setMoistureGraphData] = useState({
              labels: timeArray,
              datasets: [
                  {
                    label: "Percentage soil moisture for the last 7 hours",
                    data: moistureArray,
                  }]
                });*/



  return (
    <>

      <div>
        <Line data={{
          labels: getLabels(),
          datasets: [
            {
              label: "Temperature in Celsius over the last 24 hours",
              data: filterData.map((value, index) => {
                return value.avgTemperature
              })
            }]
        }} />
      </div>

      <div>
        <Line data={{
          labels: getLabels(),
          datasets: [
            {
              label: "% Humidity over the last 24 hours",
              data: filterData.map((value, index) => {
                return value.avgHumidity
              })
            }]
        }} />
      </div>

      <div>
        <Line data={{
          labels: getLabels(),
          datasets: [
            {
              label: "% Soil Moisture over the last 24 hours",
              data: filterData.map((value, index) => {
                return value.avgSoilMoisture
              })
            }]
        }} />
      </div>

    </>
  )
};
