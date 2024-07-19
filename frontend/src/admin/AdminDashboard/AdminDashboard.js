import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BiSolidCategory } from 'react-icons/bi';
import { GrTransaction } from 'react-icons/gr';
import { MdPostAdd } from 'react-icons/md';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie } from 'recharts';
import './AdminDashboard.css';
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "./Header";
import { mockTransactions } from "./mockData";

const Home = () => {
  const [userCount, setUserCount] = useState(0);
  const [farmerCount, setFarmerCount] = useState(0);
  const [sellerCount, setSellerCount] = useState(0);
  const [deliverymanCount, setDeliverymanCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState([]);

  useEffect(() => {
    fetchUserCount();
  }, []);

  const fetchUserCount = async () => {
    try {
      // Fetch count of farmers
      const farmerResponse = await fetch("http://localhost:8070/farmer/count");
      const farmerData = await farmerResponse.json();
      const farmerCount = farmerData.count;
      setFarmerCount(farmerCount);

      // Fetch count of sellers
      const sellerResponse = await fetch("http://localhost:8070/seller/count");
      const sellerData = await sellerResponse.json();
      const sellerCount = sellerData.count;
      setSellerCount(sellerCount);

      // Fetch count of deliverymen
      const deliverymenResponse = await fetch("http://localhost:8070/deliveryman/count");
      const deliverymenData = await deliverymenResponse.json();
      const deliverymenCount = deliverymenData.count;
      setDeliverymanCount(deliverymenCount);

      // Calculate total user count
      const totalCount = farmerCount + sellerCount + deliverymenCount;
      setUserCount(totalCount);
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  useEffect(() => {
    fetchPostCount();
  }, []);

  const fetchPostCount = async () => {
    try {
      // Fetch count of farmers
      const farmerResponse = await fetch("http://localhost:8070/farmerorder/count");
      const farmerOrderData = await farmerResponse.json();
      const farmerOrderCount = farmerOrderData.count;

      // Fetch count of sellers
      const sellerResponse = await fetch("http://localhost:8070/sellerorder/count");
      const sellerOrderData = await sellerResponse.json();
      const sellerOrderCount = sellerOrderData.count;

      // Fetch count of deliverymen
      const deliverymenResponse = await fetch("http://localhost:8070/deliverypost/count");
      const deliveryPostData = await deliverymenResponse.json();
      const deliveryPostCount = deliveryPostData.count;

      // Calculate total user count
      const totalPostCount = farmerOrderCount + sellerOrderCount + deliveryPostCount;
      setPostCount(totalPostCount);
    } catch (error) {
      console.error('Error fetching post count:', error);
    }
  };

  useEffect(() => {
    fetchProductCount();
  }, []);

  const fetchProductCount = async () => {
    try {
      const response = await fetch("http://localhost:8070/product/count");
      if (response.ok) {
        const data = await response.json();
        setProductCount(data.count);
      } else {
        console.error('Failed to fetch product count');
      }
    } catch (error) {
      console.error('Error fetching product count:', error);
    }
  };

  

  const data1 = [
    { name: 'Farmers', value: farmerCount },
    { name: 'Sellers', value: sellerCount },
    { name: 'Deliverymen', value: deliverymanCount },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const recentTransactions = mockTransactions.slice(0, 6);

  /*
  const data2 = [
    {
      name: 'Vegetables',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Fruits',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Grains',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Species',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Others',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
  ];*/

  useEffect(() => {
    fetchCategoryCounts();
  }, []);

  const fetchCategoryCounts = async () => {
    try {
      const response = await fetch("http://localhost:8070/product/categorycount");
      if (response.ok) {
        const data = await response.json();
        setCategoryCounts(data);
      } else {
        console.error('Failed to fetch category counts');
      }
    } catch (error) {
      console.error('Error fetching category counts:', error);
    }
  };

  
  const categories = [
    { name: 'Vegitables', productName: 'Veg', color: '#0088FE' },
    { name: 'Fruits', productName: 'Fruit', color: '#00C49F' },
    { name: 'Grains', productName: 'Grain', color: '#FFBB28' },
    { name: 'Spices', productName: 'Spices', color: '#FF8042' },
    { name: 'Others', productName: 'Other', color: '#8884d8' },
  ];

  // Generate data2 dynamically based on category counts
  const data2 = categories.map(category => ({
    name: category.name,
    uv: categoryCounts[category.productName] || 0, 
    pv: categoryCounts[category.productName] || 0, 
    amt: 100, 
  }));

  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = async () => {
    try {
      const response = await fetch("http://localhost:8070/farmerorder/getrecent");
      if (response.ok) {
        const data = await response.json();
        // Check if there are more than 6 records
        if (data.length > 6) {
          // Slice the array to get only the first 6 records
          setRecentPosts(data.slice(0, 6));
        } else {
          // Set the entire data if there are 6 or fewer records
          setRecentPosts(data);
        }
      } else {
        console.error('Failed to fetch recent posts');
      }
    } catch (error) {
      console.error('Error fetching recent posts:', error);
    }
  };
  

  return (
    <div className='admin-dashboard'>
      <AdminNavbar />
      <main className='main-container'>
        <Box m="10px">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>

        <div className='main-cards'>
          <div className='card border-left-primary shadow h-100 py-10'>
            <div className='card-inner'>
              <h3>USERS</h3>
              <BsPeopleFill className='card_icon_1' />
            </div>
            <h1>{userCount}</h1>
          </div>
          <div className='card border-left-warning shadow h-100 py-2'>
            <div className='card-inner'>
              <h3>POSTS</h3>
              <MdPostAdd className='card_icon_2' />
            </div>
            <h1>{postCount}</h1>
          </div>
          <div className='card border-left-danger shadow h-100 py-2'>
            <div className='card-inner'>
              <h3>ORDERS</h3>
              <GrTransaction className='card_icon_3' />
            </div>
            <h1>11</h1>
            {/*<h1>{transactionCount}</h1>*/}
          </div>
          <div className='card border-left-success shadow h-100 py-2'>
            <div className='card-inner'>
              <h3>PRODUCTS</h3>
              <BiSolidCategory className='card_icon_4' />
            </div>
            <h1>{productCount}</h1>
          </div>
        </div>

        <div className='piechart-container'>
        <Box className="transaction-box">
          <Typography variant="h5" fontWeight="600">
            RECENT POSTS
          </Typography>
          {recentPosts.map((post, i) => (
            <Box key={i} display="flex" alignItems="center" justifyContent="space-between" borderBottom={`1px solid #ccc`} p="10px 0">
              <Typography variant="body1" style={{ width: '40%' }}>{post.company} </Typography>
              <Typography variant="body1" style={{ width: '30%' }}>{post.item} </Typography>
              <Typography variant="body1" style={{ width: '25%' }}>{post.quantity} </Typography>
              <Typography variant="body1" style={{ width: '10%' }}>Rs.{post.price} </Typography>
            </Box>
          ))}
        </Box>

          <div className='piechart-card'>
            <ResponsiveContainer width="100%" height='100%'>
              <PieChart width={800} height={400}>
                <Pie
                  data={data1}
                  cx={120}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data1.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="options">
              {data1.map((item) => (
                <div className="option" key={item.name}>
                  <div className="title">
                    <div className="dot" style={{ backgroundColor: COLORS[data1.indexOf(item)] }} />
                    <span>{item.name}</span>
                  </div>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='barchart-container'>
          <div className='barchart-card'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data2}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={20}
              >
                <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <Box className="transaction-box">
            <Typography variant="h5" fontWeight="600">
              RECENT ORDERS
            </Typography>
            {recentTransactions.map((transaction, i) => (
              <Box key={i} display="flex" alignItems="center" justifyContent="space-between" borderBottom={`1px solid #ccc`} p="10px 0">
                <Typography variant="body1" style={{ width: '40%' }}>{transaction.user}</Typography>
                <Typography variant="body1" style={{ width: '40%' }}>{transaction.date}</Typography>
                <Typography variant="body1" style={{ width: '20%' }}>Rs.{transaction.cost}</Typography>
              </Box>
            ))}
          </Box>
        </div>
      </main>
    </div>
  );
};

export default Home;
