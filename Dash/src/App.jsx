import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './Compo/Nav';
import Sidebar from './Compo/Sidebar';
import Dasbrd from './Bundle/Dasbrd';
import Category from './Category/Category';
import AddCategory from './Category/AddCategory';
import DumyValid from './VAL/DumyValidity';
import AddDumyValidty from './VAL/AddDumyval';
import DashTable from './Bundle/DashTop/DashTop';
import Opcodes from './Operater/Opcodes';
import AddOpcode from './Operater/AddOpcode';
import Home_Page from './Dashboard/Home_Page';
import Login_pg from './Login/Login_pg';
import PrivateRoute from './compo/PrivateRoutee';
import Channel from './Channel/Channel';
import Add_Channel from './Channel/Add_Channel';

const AppContent = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <>
      {/* Conditionally render Nav and Sidebar */}
      {isLoggedIn && location.pathname !== '/' && (
        <>
          <Nav />
          <Sidebar />
        </>
      )}

      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login_pg />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/Dashboard" element={<Home_Page />} />
          <Route path="/bundle" element={<Dasbrd />} />
          <Route path="/category" element={<Category />} />
          <Route path="/addCategory" element={<AddCategory />} />
          <Route path="/Validity" element={<DumyValid />} />
          <Route path="/DashTable" element={<DashTable />} />
          <Route path="/AddValidity" element={<AddDumyValidty />} />
          <Route path="/Opcodes" element={<Opcodes />} />
          <Route path="/AddOpcode" element={<AddOpcode />} />
          <Route path="/channel" element={<Channel/>} />
          <Route path="/AddChannel" element={<Add_Channel/>} />
        </Route>
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
