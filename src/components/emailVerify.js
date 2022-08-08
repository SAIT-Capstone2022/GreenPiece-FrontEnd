import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Fragment } from "react/cjs/react.production.min";
import React from "react";
import { Alert } from 'react-bootstrap';

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:5000/users/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<Fragment>
			{validUrl ? (
				<div class="container p-4 m-2 mx-auto my-3 bg-light rounded shadow-lg">
					<h1>Email verified successfully</h1>
					<Alert variant="success" className="mt-2">
						Your Email has been successfully verified, pleace proceed to the <Alert.Link href="/">Login Page</Alert.Link>.
					</Alert>
				</div>
			) : (
				<div class="container p-4 m-2 mx-auto mt-3 bg-light rounded shadow-lg">
					<h1>404 Not Found.</h1>
				</div>
			)}
		</Fragment>
	);
};

export default EmailVerify;