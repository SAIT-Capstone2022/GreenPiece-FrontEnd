import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, Row, Alert } from 'react-bootstrap';
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";
import { LiveDataFeed } from './live-feed/LiveDataFeed';
import { LineGraphs } from './avg-line-graph/LineGraphs';

const DashboardComponent = () => {

  const thisUser = localStorage.getItem("user");
  const userObject = JSON.parse(thisUser);

  if (userObject === null) {
    return (
      <Navigate to="/login" replace={true} />
    );
  }

  const [city, setCity] = useState(
    userObject.city
  );

  const fahrenheitToCelsius = fahrenheit => (fahrenheit - 32) * 5 / 9;
  const apiKey = 'eec71e5fec24c1771c39631c716db4aa';
  const [weatherData, setWeatherData] = useState([{}]);
  const [weatherIcon, setWeatherIcon] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`;

  const getWeather = () => {
    fetch(url).then(
      response => response.json()
    ).then(
      data => {
        setWeatherData(data);
        setCity(city);
        setWeatherIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`);
      }
    )
  };

  useEffect(() => { getWeather() }, []);

  const handleEvent = (event) => {
    if (event.key == ("Enter")) {
      getWeather()
    }
  };

  const username = userObject.username;

  const [sentData] = useState({
    email: userObject.email,
  });

  const [sensorData, setSensorData] = useState({});

  const Alerts = () => {
    return (<div>
      {(sensorData.temperature > userObject.prefMaxTemp) &&
        (<div>
          <Alert variant='danger'>
            <h5>Temperature Alert!</h5>
            <hr />
            <p>Your Temperature is {sensorData.temperature - userObject.prefMaxTemp}C over your maximum temperature of {userObject.prefMaxTemp}C</p>
          </Alert>
        </div>)}
      {(sensorData.temperature < userObject.prefMinTemp) &&
        (<div>
          <Alert variant='danger'>
            <h5>Temperature Alert!</h5>
            <hr />
            <p>Your Temperature is {userObject.prefMinTemp - sensorData.temperature}C bellow your mininum temperature of {userObject.prefMinTemp}C</p>
          </Alert>
        </div>)}
      {(sensorData.humidity > userObject.prefMaxHumidity) &&
        (<div>
          <Alert variant='danger'>
            <h5>Humidity Alert!</h5>
            <hr />
            <p>Your Humidity is {sensorData.humidity - userObject.prefMaxHumidity}% over your maximum humidity of {userObject.prefMaxHumidity}%</p>
          </Alert>
        </div>)}
      {(sensorData.humidity < userObject.prefMinHumidity) &&
        (<div>
          <Alert variant='danger'>
            <h5>Humidity Alert!</h5>
            <hr />
            <p>Your Humidity is {userObject.prefMinHumidity - sensorData.humidity}% bellow your mininum humidity of {userObject.prefMinHumidity}%</p>
          </Alert>
        </div>)}
      {(sensorData.moistureLevel > userObject.prefMaxMoisture) &&
        (<div>
          <Alert variant='danger'>
            <h5>Soil Moisture Alert!</h5>
            <hr />
            <p>Your soil moisture is {sensorData.moistureLevel - userObject.prefMaxMoisture}% over your maximum soil moisture level of {userObject.prefMaxMoisture}%</p>
          </Alert>
        </div>)}
      {(sensorData.moistureLevel < userObject.prefMinMoisture) &&
        (<div>
          <Alert variant='danger'>
            <h5>Soil Moisture Alert!</h5>
            <hr />
            <p>Your soil moisture is {userObject.prefMinMoisture - sensorData.moistureLevel}% under your mininum soil moisture level of {userObject.prefMinMoisture}%</p>
          </Alert>
        </div>)}
    </div>)
  };

  return (
    <div className="container p-4 m-3 mx-auto bg-light rounded shadow-lg">
      <h2> {username}'s Dashboard</h2>

      <Row className='my-3 mx-0'>
        <div className='col-lg-3 rounded shadow-lg mb-4 bg-gradient' style={{ background: "#bfcfbe" }}>
          <Card.Body className='p-3'>
            <Card.Title>Weather Forecast</Card.Title>
            <hr />

            <div>
              {console.log(sensorData.moistureLevel)}
              {console.log(userObject.prefMinMoisture)}
            </div>

            <div className='container p-0'>
              {typeof weatherData.main === 'undefined' ? (
                <div>
                  <p>Enter in a city to get the current weather.</p> 
                </div>
              ) : (
                <div className='weather-data m-0'>
                  <img src={weatherIcon}></img>
                  <p className='weather'>{weatherData.weather[0].main}</p>
                  <p className='temp'>{(Math.round(fahrenheitToCelsius(weatherData.main.temp)))}°C</p>
                  <p className='city'>{weatherData.name}</p>
                </div>
              )}

              {weatherData.cod === "404" ? (
                <p>City not found</p>
              ) : (
                <>
                </>
              )}
            </div>
          </Card.Body>
        </div>

        <div className="mx-auto col-lg-9">
          <LiveDataFeed className="mx-0" retrieveData={async () => {
            const url = "http://localhost:5000/data/getSensorData";
            const { data: res } = await axios.post(url, sentData);
            return res.UsersData[res.UsersData.length - 1];
          }} 
          onDataUpdated = {setSensorData}/>
        </div>

      </Row>

      <Alerts/>

      <LineGraphs />

    </div>
  );
};

export default DashboardComponent;

