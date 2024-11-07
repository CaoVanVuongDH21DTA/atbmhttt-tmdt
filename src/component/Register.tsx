import React, { useState } from 'react';
import '../style/login.css';
import {Link, useNavigate} from "react-router-dom";
import Service from "../service/Service";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        city: ''
    });

     const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Gọi phương thức register từ Service
            await Service.register(formData);

            // Xóa các trường dữ liệu sau khi đăng ký thành công
            setFormData({
                name: '',
                email: '',
                password: '',
                city: ''
            });
            alert('User registered successfully');
            navigate('/login');

        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user');
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <form onSubmit={handleSubmit}>
                    <h1>Register Form</h1>
                    <div className="input-group">
                        <i className="bi bi-person-circle"></i>
                        <input
                            type="text"
                            placeholder="Account"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <i className="bi bi-person-circle"></i>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <i className="bi bi-lock-fill"></i>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <i className="bi bi-person-circle"></i>
                        <input
                            type="text"
                            placeholder="City"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="register-button">Sign Up</button>
                    <div className="login">
                        <p>Already registered? <Link to="/login">Sign In</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
