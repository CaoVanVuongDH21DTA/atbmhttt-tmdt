import React, { useState } from 'react';
import '../style/login.css';
import {Link, useNavigate} from "react-router-dom";
import Service from "../service/Service";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSync} from "@fortawesome/free-solid-svg-icons";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const [loadingAPI, setLoadingAPI] = useState(false)
    const [error, setError] = useState('')
    const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingAPI(true); // Bắt đầu tải API
        try {
            const userData = await Service.login(email, password)
            console.log(userData)
            if (userData.token) {
                localStorage.setItem('token', userData.token)
                localStorage.setItem('role', userData.role)
                console.log("đăng nhập thành công")
                navigate('/')
            }else{
                setError(userData.message)
                console.log("login that bai")
            }

        } catch (error:any) {
            console.log(error)
            setError(error.message)
            setTimeout(()=>{
                setError('');
            }, 5000);
        }finally {
            setLoadingAPI(false);
        }
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <h1>Login Form</h1>
                    {error && <p className="error-message">{error}</p>}
                    <div className="input-group">
                        <i className="bi bi-person-circle"></i>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <i className="bi bi-lock-fill"></i>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="forget">
                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            Remember me
                        </label>
                        <a href="">Forgot Password?</a>
                    </div>
                    <button type="submit" className="login-button">
                        {loadingAPI && <FontAwesomeIcon icon={faSync} className="loading"/>}
                        &nbsp; Login
                    </button>
                    <div className="register">
                        <p>Don't have a account <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
