import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { Provider } from 'react-redux'; 

import store from './Store/store';
import Layout from './assects/Layout';
import HomePage from './components/HomePage';
import SubPages from './components/SubPages';
import SinglePage from './components/SinglePage.jsx';
import Login from "./Autentications/Login.jsx"
import SignIn from "./Autentications/SignIn.jsx"
import Profile from "./components/ProfilePage.jsx"
import Order from "./components/OrderCheck.jsx"
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/category/:id" element={<SubPages />} />
            <Route path="/product/:id" element={<SinglePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orderStatus" element={<Order />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
