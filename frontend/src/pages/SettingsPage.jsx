import React from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('user');
        // Redirect to login page
        navigate('/login');
    };

    return (
        <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>Settings</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Application Configuration</p>
            </div>

            {/* User Account Section */}
            <div className="card">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Account</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Username</span>
                        <span style={{ fontWeight: 500 }}>{user?.username || 'N/A'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Role</span>
                        <span style={{
                            fontWeight: 500,
                            padding: '0.25rem 0.75rem',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: user?.role === 'ADMIN' ? 'var(--primary-color)' : 'var(--secondary-color)',
                            color: 'white',
                            fontSize: '0.875rem'
                        }}>
                            {user?.role || 'N/A'}
                        </span>
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                        <button
                            className="btn btn-danger"
                            onClick={handleLogout}
                            style={{ width: '100%' }}
                        >
                            🚪 Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="card">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>About Application</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>App Name</span>
                        <span style={{ fontWeight: 500 }}>Inventory Management System</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Version</span>
                        <span style={{ fontWeight: 500 }}>1.0.0</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Theme</span>
                        <span style={{ fontWeight: 500 }}>Warm Earthy</span>
                    </div>
                </div>
            </div>

            <div className="card">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Developer Info</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    This application was built using Spring Boot for the backend and React with Vite for the frontend.
                </p>
            </div>
        </div>
    );
};

export default SettingsPage;
