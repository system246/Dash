 import React from 'react';
import { CgProfile } from "react-icons/cg";
import logo from "../assets/logo.png";
import { Button, Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/'); // navigate to login page
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
      <Menu.Item key="Profile" >
        Profile
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='py-1 bg-gray-100 shadow-lg px-12'>
      <div className="nav flex justify-between items-center">
        <div className="left py-2">
          <img src={logo} alt="logo" className='h-[30px] ' />
        </div>

        <Dropdown overlay={menu} placement="bottomRight" arrow>
          <button className="right cursor-pointer flex items-center gap-2 bg-transparent px-2 py-1 rounded-md hover:bg-gray-300">
            <CgProfile className='text-2xl bg-transparent' />
          </button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Nav;
