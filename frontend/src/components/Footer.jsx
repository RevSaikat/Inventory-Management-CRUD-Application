import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: 'var(--surface-color)',
            borderTop: '1px solid var(--border-color)',
            padding: '2rem 0',
            marginTop: 'auto'
        }}>
            <div className="container" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                <p>&copy; {new Date().getFullYear()} Inventory Management System. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
