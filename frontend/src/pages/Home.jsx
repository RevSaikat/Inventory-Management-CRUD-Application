import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {/* Hero Section */}
            <section style={{
                textAlign: 'center',
                padding: '4rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem'
            }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: 'bold',
                    color: 'var(--text-primary)',
                    lineHeight: 1.2,
                    maxWidth: '800px'
                }}>
                    Manage Your Inventory with <span style={{ color: 'var(--primary-color)' }}>Ease</span>
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '600px',
                    lineHeight: 1.6
                }}>
                    Streamline your stock tracking, reduce waste, and boost efficiency with our intuitive inventory management system.
                </p>
                <div style={{ marginTop: '1rem' }}>
                    <Link to="/dashboard" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.125rem' }}>
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    padding: '2rem 0'
                }}>
                    <div className="card" style={{ padding: '2rem', textAlign: 'left' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: 'var(--background-color)',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            fontSize: '1.5rem'
                        }}>
                            📊
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Real-time Tracking</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Monitor your stock levels in real-time and never run out of essential items again.
                        </p>
                    </div>

                    <div className="card" style={{ padding: '2rem', textAlign: 'left' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: 'var(--background-color)',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            fontSize: '1.5rem'
                        }}>
                            🛡️
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Secure Data</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Your inventory data is stored securely and accessible only to you.
                        </p>
                    </div>

                    <div className="card" style={{ padding: '2rem', textAlign: 'left' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: 'var(--background-color)',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            fontSize: '1.5rem'
                        }}>
                            ⚡
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Easy Management</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Add, edit, and remove items with just a few clicks. Simple and efficient.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
