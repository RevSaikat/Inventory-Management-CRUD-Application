import React, { useEffect, useState } from 'react';
import { getItems } from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalItems: 0,
        totalValue: 0,
        recentItems: []
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getItems();
                const items = response.data;
                const totalValue = items.reduce((sum, item) => sum + (Number(item.quantity || 0) * Number(item.price)), 0);
                setStats({
                    totalItems: items.length,
                    totalValue: totalValue,
                    recentItems: items.slice(-3).reverse() // Last 3 items
                });
            } catch (error) {
                console.error("Error fetching stats", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Overview of your inventory</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                        <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Total Items</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{stats.totalItems}</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                        <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Total Value</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--success-color)' }}>
                            ₹{stats.totalValue.toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Recent Activity</h2>
                        <Link to="/items" className="btn btn-secondary" style={{ fontSize: '0.875rem' }}>View All</Link>
                    </div>
                    {stats.recentItems.length > 0 ? (
                        <ul style={{ listStyle: 'none' }}>
                            {stats.recentItems.map(item => (
                                <li key={item.id} style={{
                                    padding: '1rem 0',
                                    borderBottom: '1px solid var(--border-color)',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <span>{item.name}</span>
                                    <span style={{ fontWeight: 'bold' }}>₹{Number(item.price).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={{ color: 'var(--text-secondary)' }}>No items found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
