import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    // Load saved username if "Remember me" was checked
    useEffect(() => {
        const savedUsername = localStorage.getItem('rememberedUsername');
        if (savedUsername) {
            setFormData(prev => ({ ...prev, username: savedUsername }));
            setRememberMe(true);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setLoginError('');
    };

    const validateForm = () => {
        const newErrors = {};

        // Username validation
        if (!formData.username) {
            newErrors.username = 'Username is required';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Set loading state
        setIsLoading(true);
        setLoginError('');

        try {
            const data = await login(formData.username, formData.password);

            // Handle "Remember me" functionality
            if (rememberMe) {
                localStorage.setItem('rememberedUsername', formData.username);
            } else {
                localStorage.removeItem('rememberedUsername');
            }

            console.log('Login successful:', data);

            // Redirect based on role or to dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error('Login failed:', err);
            setLoginError('Invalid username or password');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <div className="login-left-content">
                    <h1 className="login-brand-title">Inventory<br />Management</h1>
                    <p className="login-brand-subtitle">
                        Streamline your stock tracking with our intuitive system
                    </p>
                    <div className="login-features">
                        <div className="feature-badge">✓ Real-time tracking</div>
                        <div className="feature-badge">✓ Secure & reliable</div>
                        <div className="feature-badge">✓ Easy to use</div>
                    </div>
                </div>
            </div>

            <div className="login-right">
                <div className="login-form-container">
                    <h2 className="login-title">Sign In</h2>
                    <p className="login-subtitle">Access your dashboard</p>

                    {loginError && <div className="error-banner">{loginError}</div>}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                name="username"
                                className={`form-input ${errors.username ? 'input-error' : ''}`}
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {errors.username && <span className="error-message">{errors.username}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    className={`form-input ${errors.password ? 'input-error' : ''}`}
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={togglePasswordVisibility}
                                    disabled={isLoading}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        <div className="form-options">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    disabled={isLoading}
                                />
                                <span>Remember me</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary login-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>

                        <div className="login-footer">
                            <p>Default credentials:</p>
                            <p>Admin: <strong>admin / admin</strong></p>
                            <p>User: <strong>user / user</strong></p>
                        </div>

                        <div className="signup-prompt">
                            <p>Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
