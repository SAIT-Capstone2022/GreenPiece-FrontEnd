import { useState } from "react";
import { Navigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import './calendar.css';
import axios from "axios";
import React from "react";
import moment from "moment";
import { Spinner, Alert } from 'react-bootstrap';

const Water = () => {
	const [isLoading, setLoading] = useState(false);
	const [date, dateOnChange] = useState(new Date());

	const user = localStorage.getItem("user");
	const userobject = JSON.parse(user);
	const mark = [];

	if (userobject == null) {
		return (
			<Navigate to="/login" replace={true} />
		);
	}

	for (const d of userobject.waterHistoryLog) {
		const day = String(d.day).padStart(2, '0');
		const month = String(d.month).padStart(2, '0');
		const year = d.year;
		mark.push(day + '-' + month + '-' + year);
	}

	const d = new Date();
	const today = String(d.getDate()).padStart(2, 0) + '-' + String((d.getMonth() + 1)).padStart(2, 0) + '-' + d.getFullYear();
	const [disabled, setDisabled] = useState(mark.includes(today));
	const [msg, setMsg] = useState(disabled ? "Plants have already been watered for today." : "");
	const [showMsg, setShowMsg] = useState(disabled);

	const [data, setData] = useState({
		_id: userobject._id
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/users/water-update";
			const { data: res } = await axios.post(url, data);
			localStorage.removeItem("user");
			localStorage.setItem("user", JSON.stringify(res.user));
			setMsg(res.message);
			setShowMsg(true);
			setLoading(false);
			setDisabled(true);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	return (
		<div className="container p-4 mt-3 mb-5 mx-auto bg-light rounded shadow-lg" id="signup-component">
			<h3 className="mb-4">Watering History</h3>
			<form onSubmit={handleSubmit}>
				<div className="pb-4">
					<Calendar className="mx-auto rounded" onChange={dateOnChange} value={date} calendarType="US"
						tileClassName={({ date }) => {
							if (mark.find(x => x === moment(date).format("DD-MM-YYYY"))) {
								return 'highlight'
							}
						}} />
				</div>

				<div className="form-group py-2">
					<h5 className="m-0">Have you watered your plants today?</h5>
				</div>

				{msg &&
					<Alert show={showMsg} variant="success" className="mt-2">
						{msg}
					</Alert>
				}

				<div className="form-group mt-2">
					<input type="submit" value="Watered" className="btn btn-success" disabled={disabled} />
					<span className="m-2 p-2">
						{isLoading ? <Spinner animation="border" size="sm" variant="secondary" /> : ""}
					</span>
				</div>
			</form>
		</div>
	);
};

export default Water;