import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../services/api';

const ItemList = ({ onEdit, isAdmin, searchTerm }) => {
    const [items, setItems] = useState([]);
    // Filtered items based on search term (case-insensitive)
    const filteredItems = items.filter(item => {
        const term = searchTerm?.toLowerCase() || '';
        return (
            item.name?.toLowerCase().includes(term) ||
            item.description?.toLowerCase().includes(term) ||
            item.category?.toLowerCase().includes(term)
        );
    });

    const fetchItems = async () => {
        try {
            const response = await getItems();
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching items", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteItem(id);
            fetchItems();
        } catch (error) {
            console.error("Error deleting item", error);
        }
    };

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Inventory Items</h2>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {filteredItems.length} items found
                </span>
            </div>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            {isAdmin && <th style={{ textAlign: 'right' }}>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan={isAdmin ? "8" : "7"} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                    No items found. {isAdmin && "Add one above."}
                                </td>
                            </tr>
                        ) : (
                            filteredItems.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        {item.imageUrl ? (
                                            <img
                                                src={`http://localhost:8080${item.imageUrl}`}
                                                alt={item.name}
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    objectFit: 'cover',
                                                    borderRadius: 'var(--radius-md)',
                                                    border: '1px solid var(--border-color)'
                                                }}
                                            />
                                        ) : (
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                backgroundColor: 'var(--background-color)',
                                                borderRadius: 'var(--radius-md)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.5rem',
                                                border: '1px solid var(--border-color)'
                                            }}>
                                                📦
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ fontWeight: 500 }}>{item.name}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{item.description}</td>
                                    <td>{item.category || '-'}</td>
                                    <td style={{ fontFamily: 'monospace' }}>{item.quantity || 0}</td>
                                    <td style={{ fontFamily: 'monospace' }}>₹{Number(item.price).toFixed(2)}</td>
                                    <td style={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--success-color)' }}>
                                        ₹{(Number(item.quantity || 0) * Number(item.price)).toFixed(2)}
                                    </td>
                                    {isAdmin && (
                                        <td style={{ textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                <button
                                                    className="btn btn-secondary"
                                                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                                                    onClick={() => onEdit(item)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ItemList;
