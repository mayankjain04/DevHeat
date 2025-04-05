import { useState } from "react";
import React from "react";
import Logo from "./Logo";
import { Link, useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

function Navbar() {

  // const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  const navItems = [
    { name: 'Find Jobs', url: "/job", active: true },
    // { name: "About us", url: "/aboutus", active: true },
    { name: "Learning Resources", url: "/learn", active: true },
    { name: "Dashboard", url: "/dashboard", active: authToken },
  ];

  const handleLogout = async () => {
    try {
      // Make a request to the server to log out
      const authToken = localStorage.getItem('authToken');
      localStorage.removeItem('authToken');
      const response = await fetch('http://127.0.0.1:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      // Check for a successful response
      if (response.ok) {
        // Remove the token from localStorage and reset state
        localStorage.removeItem('authToken');
        setAuthToken('');
        console.log('Logged out successfully');
        navigate('/');
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  const troubleshoot = () => {
    localStorage.clear();
    navigate('/');
  }

  return (
    <header className='w-full top-0 left-0 right-0 bg-white fixed z-50 shadow-sm'>
      <nav className='flex justify-between items-center py-7 px-20'>
        <Link to={"/"} className='mr-4'>
          <Logo />
        </Link>
        <ul className='flex'>
          {/* <li>
            <button className='nav-items bg-transparent mr-24 text-[#1F2833] hover:text-[#18BED4] transition-colors duration-200 group'
              onClick={() => {
                if (authToken && authToken.length > 0) {
                  navigate("/job"); 
                } else {
                  navigate("/login"); // Replace with an alternate route for unauthorized users
                }
              }}
            >Find Jobs
              <div className="w-full h-[1.5px] bg-[#ffffff] cursor-pointer group-hover:bg-[#18BED4] transition-colors duration-200"></div>
            </button>
          </li>
          <li>
            <button className='nav-items bg-transparent mr-24 text-[#1F2833] hover:text-[#18BED4] transition-colors duration-200 group'
              onClick={() => navigate("/#")}
            >About us
              <div className="w-full h-[1.5px] bg-[#ffffff] cursor-pointer group-hover:bg-[#18BED4] transition-colors duration-200"></div></button>
          </li>
          <li>
            <button className='nav-items bg-transparent mr-24 text-[#1F2833] hover:text-[#18BED4] transition-colors duration-200 group'
              onClick={() => navigate("/#")}
            >Learning Resources
              <div className="w-full h-[1.5px] bg-[#ffffff] cursor-pointer group-hover:bg-[#18BED4] transition-colors duration-200"></div></button>
          </li> */}
          {navItems.map((item) => item.active ? (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.url)}
                className='nav-items bg-transparent mr-24 text-[#1F2833] hover:text-[#18BED4] transition-colors duration-200 group'
              >{item.name}
                <div className="w-full h-[1.5px] bg-[#ffffff] cursor-pointer group-hover:bg-[#18BED4] transition-colors duration-200"></div>
              </button>
            </li>
          ) : null
          )}
          {/* <>
            <li>
              <button className='nav-items bg-transparent mr-24 text-[#1F2833] hover:text-[#18BED4] transition-colors duration-200 group'
                onClick={troubleshoot}
              >Troubleshoot
                <div className="w-full h-[1.5px] bg-[#ffffff] cursor-pointer group-hover:bg-[#18BED4] transition-colors duration-200"></div>
              </button>
            </li>
          </> */}
          {authToken && authToken.length > 0 ? (
            <>
              <li>
                <button className='nav-items bg-transparent mr-24 text-[#1F2833] hover:text-[#18BED4] transition-colors duration-200 group'
                  onClick={handleLogout}
                >Log Out
                  <div className="w-full h-[1.5px] bg-[#ffffff] cursor-pointer group-hover:bg-[#18BED4] transition-colors duration-200"></div>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button className='nav-items bg-transparent mr-24 text-[#1F2833] hover:text-[#18BED4] transition-colors duration-200 group'
                  onClick={() => navigate("/login")}
                >Log In
                  <div className="w-full h-[1.5px] bg-[#ffffff] cursor-pointer group-hover:bg-[#18BED4] transition-colors duration-200"></div></button>
              </li>
              <li>
                <button className='nav-items bg-transparent text-[#1F2833] hover:text-[#18BED4] transition-colors duration-200 group'
                  onClick={() => navigate("/signup")}
                >Sign up
                  <div className="w-full h-[1.5px] bg-[#ffffff] cursor-pointer group-hover:bg-[#18BED4] transition-colors duration-200"></div></button>
              </li>
            </>
          )}

        </ul>
      </nav>
      {/* <div className="w-full flex justify-center">
        <div className="h-[2px] bg-[#D9D9D9] w-[92%]"></div>
      </div> */}
    </header>
  );
}

export default Navbar;
