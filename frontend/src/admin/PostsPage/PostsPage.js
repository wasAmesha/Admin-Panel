import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PostsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye , faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import AdminNavbar from "../AdminNavbar/AdminNavbar";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [loading, setLoading] = useState(true);
  const [searchTermProduct, setSearchTermProduct] = useState('');
  const [searchTermCategory, setSearchTermCategory] = useState('');
  const [searchTermQuantity, setSearchTermQuantity] = useState('');
  const [searchTermPrice, setSearchTermPrice] = useState('');
  const [searchTermDistrict, setSearchTermDistrict] = useState('');
  const [searchTermExpireDate, setSearchTermExpireDate] = useState('');
  const [searchTermPostOwner, setSearchTermPostOwner] = useState('');
  const [searchTermModel, setSearchTermModel] = useState('');
  const [searchTermCapacity, setSearchTermCapacity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      let url = "";
      switch (selectedRole) {
        case 'farmer':
          url = 'http://localhost:8070/farmerorder/';
          break;
        case 'seller':
          url = 'http://localhost:8070/sellerorder/';
          break;
        case 'deliveryman':
          url = 'http://localhost:8070/deliverypost/';
          break;
        default:
          url = 'http://localhost:8070/farmerorder/';
          break;
      }
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching ${selectedRole} posts:`, error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedRole]);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    // Reset search term state values
    setSearchTermProduct('');
    setSearchTermCategory('');
    setSearchTermQuantity('');
    setSearchTermPrice('');
    setSearchTermDistrict('');
    setSearchTermExpireDate('');
    setSearchTermPostOwner('');
    setSearchTermModel('');
    setSearchTermCapacity('');
  };
  

  const handleRowClick = (postId) => {
    // Handle row click functionality
  };

  const handleSearchProductChange = (event) => {
    setSearchTermProduct(event.target.value);
  };

  const handleSearchCategoryChange = (event) => {
    setSearchTermCategory(event.target.value);
  };

  const handleSearchQuantityChange = (event) => {
    setSearchTermQuantity(event.target.value);
  };

  const handleSearchPriceChange = (event) => {
    setSearchTermPrice(event.target.value);
  };

  const handleSearchDistrictChange = (event) => {
    setSearchTermDistrict(event.target.value);
  };

  const handleSearchExpireDateChange = (event) => {
    setSearchTermExpireDate(event.target.value);
  };

  const handleSearchPostOwnerChange = (event) => {
    setSearchTermPostOwner(event.target.value);
  };

  const handleSearchModelChange = (event) => {
    setSearchTermModel(event.target.value);
  };
  
  const handleSearchCapacityChange = (event) => {
    setSearchTermCapacity(event.target.value);
  };

  const handleClear = () => {
    clearSearchTerms();
  };

  const clearSearchTerms = () => {
    setSearchTermProduct('');
    setSearchTermCategory('');
    setSearchTermQuantity('');
    setSearchTermPrice('');
    setSearchTermDistrict('');
    setSearchTermExpireDate('');
    setSearchTermPostOwner('');
    setSearchTermModel('');
    setSearchTermCapacity('');
  };

  const filteredPosts = posts.filter(post => {
    return (
      (!searchTermProduct || (post.item && post.item.toLowerCase().includes(searchTermProduct.toLowerCase()))) &&
      (!searchTermCategory || (post.category && post.category.toLowerCase().includes(searchTermCategory.toLowerCase()))) &&
      (!searchTermQuantity || (post.quantity !== undefined && post.quantity.toString().toLowerCase().includes(searchTermQuantity.toLowerCase()))) &&
      (!searchTermPrice || (post.price !== undefined && post.price.toString().toLowerCase().includes(searchTermPrice.toLowerCase()))) &&
      (!searchTermDistrict || (post.district && post.district.toLowerCase().includes(searchTermDistrict.toLowerCase()))) &&
      (!searchTermExpireDate || (post.expireDate && post.expireDate.toLowerCase().includes(searchTermExpireDate.toLowerCase()))) &&
      (!searchTermPostOwner || (post.company && post.company.toLowerCase().includes(searchTermPostOwner.toLowerCase()))) &&
      (!searchTermModel || (post.model && post.model.toLowerCase().includes(searchTermModel.toLowerCase()))) &&
      (!searchTermCapacity || (post.capacity !== undefined && post.capacity.toString().toLowerCase().includes(searchTermCapacity.toLowerCase())))
      
    );
  });
  
  const handleDeletePost = async (postId) => {
    try {
      if (window.confirm('Are you sure you want to delete this post?')) {
        let response;
        let deletedFromAnyCollection = false;
  
        response = await fetch(`http://localhost:8070/farmerorder/delete/${postId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setMessage('Post deleted successfully from the collection');
          deletedFromAnyCollection = true;
        }
  
        response = await fetch(`http://localhost:8070/sellerorder/delete/${postId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setMessage('Post deleted successfully from the collection');
          deletedFromAnyCollection = true;
        }
  
        response = await fetch(`http://localhost:8070/deliverypost/delete/${postId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setMessage('Post deleted successfully from the collection');
          deletedFromAnyCollection = true;
        }
  
        if (!deletedFromAnyCollection) {
          setMessage('Post not found in any collection');
        }
  
        setShowModal(true);
        // Refresh the posts data after deletion
        //window.location.reload();
        //const updatedPosts = await fetchPosts();
        //setPosts(updatedPosts);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setMessage('Error deleting post');
      setShowModal(true);
    }
  };  

  return (
    <div className='postsContainer'>
      <AdminNavbar/>
      <h1>Post Details</h1>
      <div className="filterContainer">
        <label htmlFor="roleFilter">Select the Role:</label>
        <select id="roleFilter" value={selectedRole} onChange={handleRoleChange}>
          <option value="farmer">Farmer</option>
          <option value="seller">Seller</option>
          <option value="deliveryman">Deliveryman</option>
        </select>
        <div className="searchContainer">
        <FontAwesomeIcon icon={faSearch} className="searchIcon" />
        <label className="searchLabel" htmlFor="searchProduct">Search</label>
        {selectedRole === 'farmer' && (
          <>
            <input
            type="text"
            placeholder="Product"
            value={searchTermProduct}
            onChange={handleSearchProductChange}
          />
          <input
            type="text"
            placeholder="Category"
            value={searchTermCategory}
            onChange={handleSearchCategoryChange}
          />
          <input
            type="text"
            placeholder="Quantity"
            value={searchTermQuantity}
            onChange={handleSearchQuantityChange}
          />
          <input
            type="text"
            placeholder="Price"
            value={searchTermPrice}
            onChange={handleSearchPriceChange}
          />
          <input
            type="text"
            placeholder="District"
            value={searchTermDistrict}
            onChange={handleSearchDistrictChange}
          />
          <input
            type="text"
            placeholder="Expire Date"
            value={searchTermExpireDate}
            onChange={handleSearchExpireDateChange}
          />
          <input
            type="text"
            placeholder="Post Owner"
            value={searchTermPostOwner}
            onChange={handleSearchPostOwnerChange}
          />
          </>
        )}
        {selectedRole === 'seller' && (
          <>
            <input
            type="text"
            placeholder="Product"
            value={searchTermProduct}
            onChange={handleSearchProductChange}
          />
          <input
            type="text"
            placeholder="Category"
            value={searchTermCategory}
            onChange={handleSearchCategoryChange}
          />
          <input
            type="text"
            placeholder="Quantity"
            value={searchTermQuantity}
            onChange={handleSearchQuantityChange}
          />
          <input
            type="text"
            placeholder="Price"
            value={searchTermPrice}
            onChange={handleSearchPriceChange}
          />
          <input
            type="text"
            placeholder="District"
            value={searchTermDistrict}
            onChange={handleSearchDistrictChange}
          />
          <input
            type="text"
            placeholder="Expire Date"
            value={searchTermExpireDate}
            onChange={handleSearchExpireDateChange}
          />
          <input
            type="text"
            placeholder="Post Owner"
            value={searchTermPostOwner}
            onChange={handleSearchPostOwnerChange}
          />
          </>
        )}
        {selectedRole === 'deliveryman' && (
          <>
            <input
            type="text"
            placeholder="Model"
            value={searchTermModel}
            onChange={handleSearchModelChange}
          />
          <input
            type="text"
            placeholder="Capacity"
            value={searchTermCapacity}
            onChange={handleSearchCapacityChange}
          />
          <input
            type="text"
            placeholder="Price"
            value={searchTermPrice}
            onChange={handleSearchPriceChange}
          />
          <input
            type="text"
            placeholder="District"
            value={searchTermDistrict}
            onChange={handleSearchDistrictChange}
          />
          <input
            type="text"
            placeholder="Post Owner"
            value={searchTermPostOwner}
            onChange={handleSearchPostOwnerChange}
          />
          </>
        )}
          <button className="clearButton" onClick={handleClear}>
            <div className="clearButtonContent">
                <FontAwesomeIcon icon={faTimes} />
                <span>Clear</span>
            </div>
          </button>
        </div>
      </div>
      <div className="listContainer">
      <table className='postTable'>
        <thead>
          <tr className='labelRow'>
            {selectedRole === 'farmer' && (
              <>
                <td>Product Image</td>
                <td>Product</td>
                <td>Category</td>
                <td>Quantity (kg)</td>
                <td>Price(per kg)</td>
                <td>District</td>
                <td>Expire Date</td>
                <td>Post Owner</td>
                <td>Actions</td>
              </>
            )}
            {selectedRole === 'seller' && (
              <>
                <td>Product Image</td>
                <td>Product</td>
                <td>Category</td>
                <td>Quantity (kg)</td>
                <td>Price(per kg)</td>
                <td>District</td>
                <td>Expire Date</td>
                <td>Post Owner</td>
                <td>Actions</td>
              </>
            )}
            {selectedRole === 'deliveryman' && (
              <>
                <td>Vehicle Image</td>
                <td>Model</td>
                <td>Capacity</td>
                <td>Price(per km)</td>
                <td>District</td>
                <td>Post Owner</td>
                <td>Actions</td>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {/* Add row with bottom border before starting the dataset */}
          <tr className='rowSeparator'>
            <td colSpan='9'></td>
          </tr>
          {loading ? (
            <tr>
              <td colSpan='9'>Loading...</td>
            </tr>
          ) : (
            filteredPosts.map((post) => (
              <React.Fragment key={post._id}>
                <tr
                  onClick={() => handleRowClick(post._id)}
                  className={`postRow`}
                >
                  {selectedRole === 'farmer' && (
                    <>
                      <td>
                        <img src={post.productImage} alt={post.item} className="productImage" />
                      </td>
                      <td>{post.item}</td>
                      <td>{post.category}</td>
                      <td>{post.quantity}</td>
                      <td>{post.price}</td>
                      <td>{post.district}</td>
                      <td>{post.expireDate}</td>
                      <td>{post.company}</td>
                    </>
                  )}
                  {selectedRole === 'seller' && (
                    <>
                      <td>
                        <img src={post.productImage} alt={post.item} className="productImage" />
                      </td>
                      <td>{post.item}</td>
                      <td>{post.category}</td>
                      <td>{post.quantity}</td>
                      <td>{post.price}</td>
                      <td>{post.district}</td>
                      <td>{post.expireDate}</td>
                      <td>{post.company}</td>
                    </>
                  )}
                  {selectedRole === 'deliveryman' && (
                    <>
                      <td>
                        <img src={post.vehicleImage} alt={post.model} className="vehicleImage" />
                      </td>
                      <td>{post.model}</td>
                      <td>{post.capacity}</td>
                      <td>{post.price}</td>
                      <td>{post.district}</td>
                      <td>{post.company}</td>
                    </>
                  )}
                  <td>
                  <Link to={`/admin/posts/postdetails/${post._id}`}>
                    <FontAwesomeIcon icon={faEye} className='viewIcon' />
                  </Link>
                    <FontAwesomeIcon icon={faTrashAlt} className='deleteIcon' onClick={() => handleDeletePost(post._id)} />
                  </td>
                </tr>
              </React.Fragment>
            ))
          )}
          {/* Add spacer row after the final dataset */}
          <tr className='rowSeparator'>
            <td colSpan='9'></td>
          </tr>
        </tbody>
      </table>
      </div>
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostsPage;
