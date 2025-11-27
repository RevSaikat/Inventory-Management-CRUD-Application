import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main className="main-content">
                <div className="container">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
