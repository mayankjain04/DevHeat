import { useState } from "react";
import React from "react";
import Logo from "./Logo";
import { Link, useNavigate } from 'react-router-dom';
import config from "../../config";

import { useContext } from 'react';
import { AuthContext } from '../../authcontext';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from "../../store/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const { authToken, setAuthToken } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch()
  const status = useSelector(state => state.auth.status)

  const navItems = [
    { name: 'Find Jobs', url: "/job", active: true },
    { name: 'Learning Resources', url: "/learn", active: true },
    { name: 'About', url: "/about", active: true }, 
    { name: 'Dashboard', url: "/dashboard", active: status },
  ];
  
  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      localStorage.removeItem('authToken');
      const response = await fetch(`${config.apiUrl}/api/logout/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        localStorage.removeItem('authToken');
        dispatch(logout())
        setAuthToken('');
        console.log('Logged out successfully');
        navigate('/');
      } else {
        console.error('Logout failed:', response.statusText);
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className='w-full top-0 left-0 right-0 bg-white fixed z-50 shadow-sm'>
      <nav className='flex flex-wrap items-center justify-between py-5 px-6 md:px-20'>
        <Link to={"/"} className='mr-4'>
          <Logo />
        </Link>
        <button 
          className='md:hidden text-[#1F2833] focus:outline-none'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
        <ul className={`flex-col md:flex-row md:flex md:items-center w-full md:w-auto mt-4 md:mt-0 ${menuOpen ? 'flex' : 'hidden'}`}>
          {navItems.map((item) => item.active ? (
            <li key={item.name} className='mb-4 md:mb-0 md:mr-6'>
              <button
                onClick={() => { setMenuOpen(false); navigate(item.url); }}
                className='nav-items bg-transparent text-[#1F2833] hover:text-[#18BED4] transition-colors duration-200 group w-full text-left'
              >
                {item.name}
                <div className="w-full h-[1.5px] bg-[#ffffff] group-hover:bg-[#18BED4] transition-colors duration-200"></div>
              </button>
            </li>
          ) : null)}

          {status ? (
            <li className='mb-4 md:mb-0 md:mr-6'>
              <button className='nav-items bg-transparent text-[#1F2833] hover:text-[#18BED4] transition-colors duration-200 group w-full text-left'
                onClick={() => { setMenuOpen(false); handleLogout(); }}
              >
                Log Out
                <div className="w-full h-[1.5px] bg-[#ffffff] group-hover:bg-[#18BED4] transition-colors duration-200"></div>
              </button>
            </li>
          ) : (
            <>
              <li className='mb-4 md:mb-0 md:mr-6'>
                <button className='nav-items bg-transparent text-[#1F2833] hover:text-[#18BED4] transition-colors duration-200 group w-full text-left'
                  onClick={() => { setMenuOpen(false); navigate("/login"); }}
                >
                  Log In
                  <div className="w-full h-[1.5px] bg-[#ffffff] group-hover:bg-[#18BED4] transition-colors duration-200"></div>
                </button>
              </li>
              <li className='md:mr-0'>
                <button className='nav-items bg-transparent text-[#1F2833] hover:text-[#18BED4] transition-colors duration-200 group w-full text-left'
                  onClick={() => { setMenuOpen(false); navigate("/signup"); }}
                >
                  Sign up
                  <div className="w-full h-[1.5px] bg-[#ffffff] group-hover:bg-[#18BED4] transition-colors duration-200"></div>
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
