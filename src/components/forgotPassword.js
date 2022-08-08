import { useState } from "react";
import axios from "axios";
import React from "react";
import { Spinner, Alert } from 'react-bootstrap';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [showMsg, setShowMsg] = useState(true);
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowMsg(false);
        setError("");
        setMsg("");
        setLoading(true);
        try {
            const url = "http://localhost:5000/password-reset";
            const { data } = await axios.post(url, { email });
            setError("");
            setMsg(data.message);
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
    }

    return (
        <div class="container p-4 m-2 mx-auto my-3 bg-light rounded shadow-lg" id="signup-component">
            <h3 className="mb-3">Forgot Password</h3>

            <form onSubmit={handleSubmit}>
                <div className="form-group py-3">
                    <h5>E-mail</h5>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        className="form-control"
                    />
                </div>

                <div class="col-6">
                    <p>Return to <a href="/">Login Page</a></p>
                </div>

                <div className="form-group">
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
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword;