import React, { useState, useEffect } from "react";
import "./VegetablePage.css";
import AdminNavbar from "../../AdminNavbar/AdminNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; 

function VegetablePage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8070/product/Veg");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initially, set filtered products to all products
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle search input changes
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    filterProducts(value);
  };

  // Function to filter products based on search query
  const filterProducts = (query) => {
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="admin-veg-container">
      <AdminNavbar />
      <div className="nothing-cateogory-pages"></div>
      <p className="veg-paragraph">Vegetables</p>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search vegetables..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button className="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="products-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="products-item" key={product._id}>
              <Link 
                to={`/admin/products/vegetable/${product._id}`} 
                className="product-item-veg-link"
              >
                <img src={product.productImage} alt={product.productName} />
                <p>{product.productName}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No vegetable products found.</p>
        )}
      </div>

      <div className="nothing-cateogory-pages-below-veg"></div>
    </div>
  );
}

export default VegetablePage;