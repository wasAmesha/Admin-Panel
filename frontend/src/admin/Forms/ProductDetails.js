import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import "./ProductDetails.css";

const categories = [
  { label: 'Vegetables', value: 'Veg' },
  { label: 'Fruits', value: 'Fruit' },
  { label: 'Grains', value: 'Grain' },
  { label: 'Spices', value: 'Spices' },
  { label: 'Other', value: 'Other' }
];

const ProductDetailsForm = () => {
  const { productId } = useParams(); // Extract productId from URL params
  const [product, setProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8070/product/get/${productId}`);
        const data = await response.json();
        setProduct(data.product);
        setEditedProduct({ ...data.product }); // Set initial values for the edited product
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if any details are changed
    const isDetailsChanged = Object.keys(editedProduct).some(key => editedProduct[key] !== product[key]);
  
    if (!isDetailsChanged) {
      setMessage('No changes were made.');
      setShowModal(true);
      return;
    }
  
    try {
      await fetch(`http://localhost:8070/product/update/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });
  
      // Prepare the message mentioning the updated details
      const updatedDetails = [];
      for (const key in editedProduct) {
        if (editedProduct[key] !== product[key]) {
          updatedDetails.push(`${key}: ${editedProduct[key]}`);
        }
      }
      setMessage(`Product details updated successfully!\n\nUpdated details:\n${updatedDetails.join('\n')}`);
      setShowModal(true);
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while updating the product details.');
      setShowModal(true);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`http://localhost:8070/product/delete/${productId}`, {
          method: "DELETE",
        });
        setMessage('Product deleted successfully!');
        setShowModal(true);

        // Wait for 3 seconds before navigating back
        setTimeout(() => {
          window.history.back();
        }, 3000);
      } catch (error) {
        console.error(error);
        setMessage('An error occurred while deleting the product.');
        setShowModal(true);
      }
    }
  };
  

  return (
    <div className="product-details-container">
      <AdminNavbar/>
      {product ? (
        <div>
          <form onSubmit={handleSubmit}>
            <h2>Edit Product Details</h2>

            {/* Display the image */}
            <div className="image-preview">
              <img src={editedProduct.productImage} alt="Product" />
            </div>
              <label htmlFor="productName">Product Name:</label>
              <input className="input-field"
                type="text"
                id="productName"
                name="productName"
                value={editedProduct.productName}
                onChange={handleInputChange}
                required
              />
            
              <label htmlFor="productCategory">Product Category:</label>
              <select className="input-field"
                id="productCategory"
                name="productCategory"
                value={editedProduct.productCategory}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.value}>{category.label}</option>
                ))}
              </select>
            
              <label htmlFor="productImage">Product Image URL:</label>
              <input className="input-field"
                type="text"
                id="productImage"
                name="productImage"
                value={editedProduct.productImage}
                onChange={handleInputChange}
                required
              />

              {/* Display message */}
              {/*<p>{message}</p>*/}
              {/* 
              <div className="button-container">
              <button type="button" onClick={handleSubmit}>Update</button>
              <button type="button" onClick={handleDelete}>Delete</button>
              </div>*/}
              <button type="button" onClick={handleSubmit}>Update</button>
              <button type="button" onClick={handleDelete}>Delete</button>

          </form>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}

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

export default ProductDetailsForm;
