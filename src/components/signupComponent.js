import { useState } from "react";
import axios from "axios";
import React from "react";
import { Spinner, Alert } from 'react-bootstrap';

const Signup = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
		username: "",
		phonenumber: "", 
		city: "",
	});
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");
	const [showMsg, setShowMsg] = useState(true);
	const [isLoading, setLoading] = useState(false);

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
			const url = "http://localhost:5000/users";
			const { data: res } = await axios.post(url, data);
			setError("");
			setMsg(res.message);
			setShowMsg(true);
			setLoading(false);
			setData({
				email: "",
				password: "",
				username: "",
				phonenumber: "",
				city: "",
			});
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
		<div class="container p-4 m-2 mx-auto my-3 bg-light rounded shadow-lg" id="signup-component">

			<h3 className="mb-4">Sign Up</h3>


			<form onSubmit={handleSubmit}>
				<div className="form-group py-2">
					<h5>E-mail</h5>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleChange}
						value={data.email}
						required
						className="form-control"
					/>
				</div>

				<div className="form-group pt-2">
					<h5>Password</h5>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={data.password}
						required
						className="form-control"
					/>
					<div>
					<p id='subText'>Use 8 or more characters. Must have at least one Uppercase, Lowercase, a Number and a Symbol</p>
					</div>
				</div>

				<div className="form-group pb-2">
					<h5>Username</h5>
					<input
						type="text"
						placeholder="Username"
						name="username"
						onChange={handleChange}
						value={data.username}
						required
						className="form-control"
					/>
				</div>

				<div className="form-group py-2">
					<h5>Phone Number</h5>
					<input
						type="text"
						placeholder="(xxx)-xxx-xxxx"
						pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$"
						name="phonenumber"
						onChange={handleChange}
						value={data.phonenumber}
						required
						className="form-control"
					/>
				</div>

				<div className="form-group py-2">
					<h5>City / Town Where Greenhouse is Located</h5>
					<input
						type="text"
						name="city"
						onChange={handleChange}
						value={data.city}
						required
						className="form-control"
					/>
				</div>

				<div class="mb-3">
					<p>Already have an account? <a href="/">Log In</a></p>
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

				<div className="form-group py-2 mt-2">
					<input type="submit" value="Submit" className="btn btn-success" />
					<span className="m-2 p-2">
						{isLoading ? <Spinner animation="border" size="sm" variant="secondary" /> : ""}
					</span>
				</div>
			</form>
		</div>
	);
};

export default Signup;