import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"; // Import useNavigate hook from react-router-dom
import api from "../Utils/Axios";
import {toast} from "react-toastify";
import {Helmet} from "react-helmet";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate(); // Initialize useNavigate for redirection

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken != null) {
            window.location.href = "http://localhost:3003";
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await api.post("admin-login/", {
                username,
                password,
            });

            const {access, refresh} = response.data;
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);

            window.location.href = "http://localhost:3003";
        } catch (err) {
            toast.error("Login failed. Please check your credentials.");
            setError("Invalid credentials or not authorized.");
        }
    };

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="bd-login__area pt-110 pb-130">
                <div className="container small-container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-10">
                            <div className="Login-form-wrapper">
                                <div className="bd-postbox__contact">
                                    <form onSubmit={handleLogin}>
                                        <div className="row">
                                            <div className="col-xxl-12">
                                                <div className="bd-postbox__singel-input">
                                                    {error && (
                                                        <div className="error text-danger my-3">{error}</div>
                                                    )}
                                                    <input
                                                        type="text"
                                                        placeholder="Email or Username"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xxl-12">
                                                <div className="bd-postbox__singel-input">
                                                    <input
                                                        type="password"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="bd-sigin__action-button mb-20">
                                                <button className="bd-fill__btn w-100" type="submit">
                                                    Login now
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
