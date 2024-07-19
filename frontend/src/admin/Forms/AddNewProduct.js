import React, { useState } from 'react';
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import "./AddProduct.css";

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setProductImage] = useState('');
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const categories = [
    { label: 'Vegetables', value: 'Veg' },
    { label: 'Fruits', value: 'Fruit' },
    { label: 'Grains', value: 'Grain' },
    { label: 'Spices', value: 'Spices' },
    { label: 'Other', value: 'Other' }
  ];

  const handleImageChange = (e) => {
    const image = e.target.value;
    setProductImage(image);
    setImagePreview(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8070/product/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          productCategory,
          productImage,
        }),
      });

      const data = await response.json();
      setMessage(data);
      setShowModal(true);

      // Clear input fields
      setProductName('');
      setProductCategory('');
      setProductImage('');
      setImagePreview(null);

      // Close modal after 5 seconds
      setTimeout(() => {
        setShowModal(false);
      }, 5000);
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('An error occurred while adding the product.');
      setShowModal(true);
    }
  };

  return (
    <div className="add-product-form">
      <AdminNavbar/>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>

        <div className="image-preview">
          {imagePreview ? (
            <img src={imagePreview} alt="Product" className="image-preview-img" />
          ) : (
            <div className="empty-image-preview">
              <div className="empty-image-placeholder"></div>
              <p>No image selected</p>
            </div>
          )}
        </div>

        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          className="input-field"
        />

        <label>Product Category:</label>
        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          required
          className="input-field"
        >
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category.value}>{category.label}</option>
          ))}
        </select>

        <label>Product Image (URL):</label>
        <input
          type="text"
          value={productImage}
          onChange={handleImageChange}
          className="input-field"
        />


        <button type="submit" className="submit-btn">Add Product</button>
      </form>

      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductForm;
