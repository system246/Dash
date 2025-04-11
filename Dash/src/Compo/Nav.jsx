import React from 'react'
import { CgProfile } from "react-icons/cg";
import logo from "../assets/logo.png"
import { Button } from "antd";


const Nav = () => {
  return (
    <div className='py-1 bg-gray-00 px-4 shadow-lg '>
       
       <div className="nav flex justify-between items-center ">
       <div className="left py-2">
            <img src={logo} alt="" className='' />
        </div>
        <Button className="right flex gap-2  items-center ">
       
            <CgProfile className='text-2xl' />     
            <h1 className='text-xl'>Profile</h1>
        </Button>
       </div>
      
    </div>
  )
}

export default Nav
