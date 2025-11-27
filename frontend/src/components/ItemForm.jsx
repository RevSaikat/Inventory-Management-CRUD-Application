import React, { useState, useEffect } from 'react';
import { createItem, updateItem } from '../services/api';
import axios from 'axios';

const ItemForm = ({ currentItem, onSave, onCancel }) => {
    const [item, setItem] = useState({ name: '', description: '', price: '', category: '', quantity: '', imageUrl: '' });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (currentItem) {
            setItem(currentItem);
            setImagePreview(currentItem.imageUrl ? `http://localhost:8080${currentItem.imageUrl}` : null);
        } else {
            setItem({ name: '', description: '', price: '', category: '', quantity: '', imageUrl: '' });
            setImagePreview(null);
        }
        setImageFile(null);
    }, [currentItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = item.imageUrl;

            // Upload image if a new file was selected
            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);

                const uploadResponse = await axios.post('http://localhost:8080/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                imageUrl = uploadResponse.data.url;
            }

            // Save item with image URL
            const itemData = { ...item, imageUrl };

            if (item.id) {
                await updateItem(item.id, itemData);
            } else {
                await createItem(itemData);
            }

            onSave();
            setItem({ name: '', description: '', price: '', category: '', quantity: '', imageUrl: '' });
            setImageFile(null);
            setImagePreview(null);
        } catch (error) {
            console.error("Error saving item", error);
            alert("Error saving item. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Name</label>
                <input
                    className="form-input"
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter item name"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Description</label>
                <input
                    className="form-input"
                    type="text"
                    name="description"
                    value={item.description}
                    onChange={handleChange}
                    placeholder="Enter item description"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Category</label>
                <input
                    className="form-input"
                    type="text"
                    name="category"
                    value={item.category}
                    onChange={handleChange}
                    placeholder="Enter category"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Quantity</label>
                <input
                    className="form-input"
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={handleChange}
                    required
                    placeholder="Enter quantity"
                    min="0"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Price</label>
                <input
                    className="form-input"
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={handleChange}
                    required
                    placeholder="0.00"
                    step="0.01"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Item Image</label>
                <input
                    className="form-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ padding: '0.4rem 0.75rem' }}
                />
                {imagePreview && (
                    <div style={{ marginTop: '0.5rem' }}>
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-color)'
                            }}
                        />
                    </div>
                )}
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                    style={{ flex: 1 }}
                    disabled={uploading}
                >
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={uploading}>
                    {uploading ? 'Uploading...' : (item.id ? 'Save Changes' : 'Create Item')}
                </button>
            </div>
        </form>
    );
};

export default ItemForm;
