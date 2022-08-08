import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { useParams } from 'react-router-dom';
import React from "react";
import { Spinner, Alert } from 'react-bootstrap';


const PasswordReset = () => {
    const [validUrl, setValidUrl] = useState(false);
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [showMsg, setShowMsg] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const param = useParams();
    const url = `http://localhost:5000/password-reset/${param.id}/${param.token}`

    useEffect(() => {
        const verifyUrl = async () => {
            try {
                await axios.get(url)
                setValidUrl(true)
            } catch (error) {
                setValidUrl(false)

            }
        }
        verifyUrl()
    }, [param, url]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowMsg(false);
        setError("");
        setMsg("");
        setLoading(true);
        try {
            const { data } = await axios.post(url, { password });
            setError("");
            setMsg(data.message);
            setShowMsg(true);
            setLoading(false);
            window.location = "/login"
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
        <Fragment>
            {validUrl ? (
                <div class="container p-4 m-2 mx-auto my-3 bg-light rounded shadow-lg" id="signup-component">
                    <h3>New Password</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group py-3">
                            <h5>New Password</h5>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                className="form-control"
                            />
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
            ) : (
                <div class="container p-4 m-2 mx-auto mt-3 bg-light rounded shadow-lg" id="signup-component">
                    <h1>404 Not Found</h1>
                </div>
            )}


        </Fragment>
    )
}

export default PasswordReset;