import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const getLinkStyle = (path) => ({
        color: location.pathname === path ? 'var(--primary-color)' : 'var(--text-secondary)',
        fontWeight: 500,
        borderBottom: location.pathname === path ? '2px solid var(--primary-color)' : 'none',
        paddingBottom: '0.25rem'
    });

    return (
        <nav style={{
            backgroundColor: 'var(--surface-color)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1rem 0',
            position: 'sticky',
            top: 0,
            zIndex: 10
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                    InventoryApp
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <Link to="/" style={getLinkStyle('/')}>Home</Link>
                    <Link to="/dashboard" style={getLinkStyle('/dashboard')}>Dashboard</Link>
                    <Link to="/items" style={getLinkStyle('/items')}>Items</Link>
                    <Link to="/settings" style={getLinkStyle('/settings')}>Settings</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
