import React, { useState } from 'react';
import ItemList from '../components/ItemList';
import ItemForm from '../components/ItemForm';
import Modal from '../components/Modal';

const ItemsPage = () => {
    const [currentItem, setCurrentItem] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user?.role === 'ADMIN';

    // Search state
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleEdit = (item) => {
        setCurrentItem(item);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setCurrentItem(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
    };

    const handleSave = () => {
        handleCloseModal();
        setRefreshKey(oldKey => oldKey + 1);
    };

    return (
        <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>Inventory Items</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage your stock</p>
                </div>
                {isAdmin && (
                    <button className="btn btn-primary" onClick={handleAddNew}>
                        + Add New Item
                    </button>
                )}
            </div>

            {/* Search bar */}
            <div style={{ margin: '1rem 0' }}>
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                />
            </div>

            <ItemList key={refreshKey} onEdit={handleEdit} isAdmin={isAdmin} searchTerm={searchTerm} />

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={currentItem ? 'Edit Item' : 'Add New Item'}
            >
                <ItemForm
                    currentItem={currentItem}
                    onSave={handleSave}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

export default ItemsPage;
