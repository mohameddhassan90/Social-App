import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useContext, useState } from 'react'
import { authContext } from './Context/AuthContext'

export default function Layout() {
  const{isLogin}=useContext(authContext)
  


  return (
    <div className='flex flex-col justify-between bg-[#F0F2F5] '>
    {isLogin&&<Navbar></Navbar>}
      
        <div className="md:container min-h-screen">
            <Outlet></Outlet>
        </div>
    <Footer></Footer>
    </div>
  )
}
