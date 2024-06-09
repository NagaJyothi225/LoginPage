import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [userArray, setUserArray] = useState([]);
    const [passwordArray, setPasswordArray] = useState([]);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Retrieve arrays from local storage
        const storedUserArray = JSON.parse(localStorage.getItem('userArray')) || [];
        const storedPasswordArray = JSON.parse(localStorage.getItem('passwordArray')) || [];
        setUserArray(storedUserArray);
        setPasswordArray(storedPasswordArray);
    }, []);

    useEffect(() => {
        // Update local storage whenever the arrays change
        localStorage.setItem('userArray', JSON.stringify(userArray));
        localStorage.setItem('passwordArray', JSON.stringify(passwordArray));
    }, [userArray, passwordArray]);

    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required';
        if (!password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Add values to the arrays
            setUserArray((prevArray) => [...prevArray, name]);
            setPasswordArray((prevArray) => [...prevArray, password]);

            // Log the updated arrays
            console.log('Name:', [...userArray, name]);
            console.log('Password:', [...passwordArray, password]);

            // Clear the form
            setName('');
            setPassword('');
            setErrors({});
        }
    };

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="container">
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>User Name:</label>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i
                            className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} password-icon`}
                            onClick={toggleShowPassword}
                        ></i>
                    </div>
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default Home;
