import { useState } from "react";
import { Navigate } from 'react-router-dom';
import React from 'react';
import axios from "axios";
import { Spinner, Alert } from 'react-bootstrap';


//to do verification that we have a user in the first place

const ProfileUpdate = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(true);
  const [password, setPassword] = useState("");

  const user = localStorage.getItem("user");
  const userobject = JSON.parse(user);

  if (userobject == null) {
    return (
      <Navigate to="/login" replace={true} />
    );
  }

  const [data, setData] = useState({
    _id: userobject._id,
    username: userobject.username,
    password: userobject.password,
    phonenumber: userobject.phonenumber,
    city: userobject.city,
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowMsg(false);
    setError("");
    setMsg("");
    setLoading(true);
    try {
      const url = "http://localhost:5000/users/profile-update";
      const { data: res } = await axios.post(url, data);
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(res.user));
      console.log(res);
      setError("");
      setMsg(res.message);
      setShowMsg(true);
      setLoading(false);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setLoading(false);
        setError(error.response.data.message);
        setShowMsg(true);
      }
    }
  };

  return (

    <div className="container p-4 m-2 mb-5 mx-auto mt-3 bg-light rounded shadow-lg" style={{ maxWidth: "600px" }}>
      <form onSubmit={handleSubmit}>
        <h1>Profile Information</h1>
        <div className="form-group py-2">
          <h5>E-mail</h5>
          <input
            type="email"
            placeholder="Email"
            name="email"
            readOnly
            value={userobject.email}
            className="form-control"
          />
        </div>

        <div className="form-group py-2">
          <h5>Password</h5>
          <input
            type="password"
            placeholder="password"
            name="password"
            defaultValue="12345678"
            readOnly
            className="form-control"
          />
        </div>

        <div className="form-group py-2">
          <h5>Username</h5>
          <input
            type="username"
            placeholder="username"
            name="username"
            onChange={handleChange}
            defaultValue={userobject.username}
            required
            className="form-control"
          />
        </div>

        <div className="form-group py-2">
          <h5>PhoneNumber</h5>
          <input
            type="phonenumber"
            placeholder="phonenumber"
            name="phonenumber"
            onChange={handleChange}
            defaultValue={userobject.phonenumber}
            required
            className="form-control"
          />
        </div>

        <div className="form-group py-2">
          <h5>Your Town / City</h5>
          <input
            type="city"
            placeholder="The City of Your Greenhouse"
            name="city"
            onChange={handleChange}
            defaultValue={userobject.city}
            required
            className="form-control"
          />
        </div>

        {error &&
          <Alert show={showMsg} variant="danger" className="mt-2">
            {error}
          </Alert>
        }
        {msg &&
          <Alert show={showMsg} variant="success" className="mt-2">
            {msg}
          </Alert>
        }

        <div className="form-group pt-2">
          <input type="submit" value="Save" className="btn btn-primary" />
          <span className="m-2 p-2">
            {isLoading ? <Spinner animation="border" size="sm" variant="secondary" /> : ""}
          </span>
        </div>

      </form>
    </div>
  );
};

export default ProfileUpdate;