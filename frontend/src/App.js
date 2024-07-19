import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//import AdminRoute from './AdminRoute';

import FarmerPage from "./components/FarmerPage/FarmerPage";
import ProductPage from "./components/ProductPage/ProductPage";
import HomePage from "./components/HomePage/HomePage";
import SellerPage from "./components/SellerPage/SellerPage";
import FarmerSellerPage from "./components/FarmerSellerPage/FarmerSellerPage";
import SellerOrderPage from "./components/Orders/SellerOrders/SellerOrderPage";
import FarmerOrderPage from "./components/Orders/FarmerOrders/FarmerOrderPage";
import DeliveryPostPage from "./components/Orders/DeliveryPosts/DeliveryPosts";
import DeliverymanPage from "./components/DeliverymanPage/DeliverymanPage";
//import Register from "./components/Register/RegisterPage";
import RegisterPage from "./components/Register/RegisterPage";
import VegetablePage from "./components/CatogeryPages/VegetablePage/VegetablePage";
import FruitPage from "./components/CatogeryPages/FruitPage/FruitPage";
import GrainsPage from "./components/CatogeryPages/GrainsPage/GrainsPage";
import SpicesPage from "./components/CatogeryPages/SpicesPage/SpicesPage";
import OtherPage from "./components/CatogeryPages/OtherPage/OtherPage";
import RegUserHomePage from "./components/AfterRegistered/RegUserHomePage/RegUserHomePage";
import Login from "./components/Login/Login";
import OrderPage from "./components/OrderPage/OrderPage";
//import CatogeryPage from "./components/CatogeryPages/CatogeryPage";
import RegFarmer from "./components/AfterRegistered/RegFarmerPage/RegFarmerPage";
import RegVegetablePage from "./components/AfterRegistered/RegVegetablePage/RegVegetablePage";
import RegFruitPage from "./components/AfterRegistered/RegFruitPage/RegFruitPage";
import RegOtherPage from "./components/AfterRegistered/RegOtherPage/RegOtherPage";
import RegSpicesPage from "./components/AfterRegistered/RegSpicesPage/RegSpicesPage";
import RegGrainsPage from "./components/AfterRegistered/RegGrainsPage/RegGrainsPage";
import ChatWithAdmin from "./components/ChatWithAdmin/ChatWithAdmin";


import About from "./components/AboutPage/AboutPage";
import Review from "./components/ReviewPage/ReviewPage";


//import DeliveryPost from "./components/Forms/Delivery/DeliveryPost";
//import EditDeliveryPost from "./components/Forms/Delivery/EditDeliveryPost";
//import FarmerProduct from "./components/Forms/Farmer/FarmerProduct";
//import EditFarmerProduct from "./components/Forms/Farmer/EditFarmerProduct";
//import SellerProduct from "./components/Forms/Seller/SellerProduct";
//import EditSellerProduct from "./components/Forms/Seller/EditSellerProduct";

//import ProductDetails from "./Admin/Products/ProductDetails";


import AdminLoginPage from "./admin/AdminLogin/Login";
import AdminHomePage from "./admin/AdminDashboard/AdminDashboard";
import AdminReviewPage from "./admin/AdminReviewPage/AdminReviewPage";
import ProductsPage from "./admin/ProductsPage/ProductsPage";
import AddNewProduct from "./admin/Forms/AddNewProduct";
import EditProduct from "./admin/Forms/ProductDetails";
import UserDetails from "./admin/Forms/User/UserDetail";
import FarmerPostsPage from "./admin/FarmerPostsPage/FarmerPostsPage";
import SellerPostsPage from "./admin/SellerPostsPage/SellerPostsPage";
import DeliveryPostsPage from "./admin/DeliveryPostsPage/DeliveryPostsPage";
import AdminFruitPage from "./admin/CatogeryPages/FruitPage/FruitPage";
import AdminGrainPage from "./admin/CatogeryPages/GrainsPage/GrainsPage";
import AdminOtherPage from "./admin/CatogeryPages/OtherPage/OtherPage";
import AdminVegetablePage from "./admin/CatogeryPages/VegetablePage/VegetablePage";
import AdminSpicePage from "./admin/CatogeryPages/SpicesPage/SpicesPage";
import UsersPage from "./admin/UsersPage/UsersPage";
import PostsPage from "./admin/PostsPage/PostsPage";
import PostDetails from "./admin/Forms/PostDetails/PostDetails";
import ReviewDetails from "./admin/Forms/Review/ReviewDetails";
import SettingsPage from "./admin/SettingsPage/Settings";
import ResetPasswordPage from "./admin/AdminForms/ResetPassword/ResetPassword";
import UpdateProfilePage from "./admin/AdminForms/UpdateProfile/UpdateProfile";
import ManageAdminPage from "./admin/ManageAdminsPage/AdminsPage";
import AddAdminPage from "./admin/AdminForms/AddNewAdmin/AddAdmin";
import AdminDetailsPage from "./admin/AdminForms/AdminDetails/AdminDetails";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/farmer" element={<FarmerPage />} />
        <Route path="/seller" element={<SellerPage />} />
        <Route path="/both" element={<FarmerSellerPage />} />
        <Route path="/deliveryman" element={<DeliverymanPage />} />
        <Route path="/productpage" element={<ProductPage />} />
        <Route path="/sellerorder" element={<SellerOrderPage />} />
        <Route path="/farmerorder" element={<FarmerOrderPage />} />
        <Route path="/deliverypost" element={<DeliveryPostPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/vegetable" element={<VegetablePage />} />
        <Route path="/fruit" element={<FruitPage />} />
        <Route path="/grain" element={<GrainsPage />} />
        <Route path="/spices" element={<SpicesPage />} />
        <Route path="/other" element={<OtherPage />} />
        <Route path="/homepage-registeredusers" element={<RegUserHomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/regfarmer" element={<RegFarmer />} />
        <Route path="/regvegetable" element={<RegVegetablePage />} />
        <Route path="/regfruit" element={<RegFruitPage />} />
        <Route path="/reggrain" element={<RegGrainsPage />} />
        <Route path="/regspices" element={<RegSpicesPage />} />
        <Route path="/regother" element={<RegOtherPage />} />
        <Route path="/contactadmin" element={<ChatWithAdmin />} />


        <Route path="/about" element={<About />} />
        <Route path="/review" element={<Review />} />

        <Route path="/admin/products/addproduct" element={<AddNewProduct/>} />
        <Route path="/admin/products/vegetable/:productId" element={<EditProduct/>} />
        <Route path="/admin/products/fruit/:productId" element={<EditProduct/>} />
        <Route path="/admin/products/spices/:productId" element={<EditProduct/>} />
        <Route path="/admin/products/grain/:productId" element={<EditProduct/>} />
        <Route path="/admin/products/other/:productId" element={<EditProduct/>} />
        <Route path="/admin/users/userdetails/:userId" element={<UserDetails/>} />
        <Route path="/admin/posts/postdetails/:postId" element={<PostDetails/>} />
        <Route path="/admin/reviews/reviewdetails/:reviewId" element={<ReviewDetails/>} />

        {/*<Route path="/admin/products/editproduct" element={<EditProduct/>} />*/}
        <Route path="/admin/products/fruit" element={<AdminFruitPage/>}/>
        <Route path="/admin/products/grain" element={<AdminGrainPage/>}/>
        <Route path="/admin/products/other" element={<AdminOtherPage/>}/>
        <Route path="/admin/products/vegetable" element={<AdminVegetablePage/>}/>
        <Route path="/admin/products/spices" element={<AdminSpicePage/>}/>
        <Route path="/admin/users" element={<UsersPage/>}/>
        <Route path="/admin/posts" element={<PostsPage/>}/>
        <Route path="/admin/settings" element={<SettingsPage/>}/>
        <Route path="/admin/settings/reset-password" element={<ResetPasswordPage/>}/>
        <Route path="/admin/settings/update-profile" element={<UpdateProfilePage/>}/>
        <Route path="/admin/settings/admins" element={<ManageAdminPage/>}/>
        <Route path="/admin/settings/admins/add-admin" element={<AddAdminPage/>}/>
        <Route path="/admin/settings/admins/admin-details/:adminId" element={<AdminDetailsPage/>}/>

        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminHomePage />} />
        <Route path="/admin/reviews" element={<AdminReviewPage />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/farmerposts" element={<FarmerPostsPage/>}/>
        <Route path="/sellerposts" element={<SellerPostsPage/>}/>
        <Route path="/deliverymanposts" element={<DeliveryPostsPage/>}/>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;


/*<Route path="/deliverypostform" element={<DeliveryPost/>}/>
        <Route path="/editdeliverypost" element={<EditDeliveryPost/>}/>
        <Route path="/farmerproductpost" element={<FarmerProduct/>} />
        <Route path="/editproductpost" element={<EditFarmerProduct/>} />
        <Route path="/sellerorderpost" element={<SellerProduct/>} />
        <Route path="/editorderpost" element={<EditSellerProduct/>} />
        */