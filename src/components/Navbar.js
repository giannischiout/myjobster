import React, {useState} from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import {FaAlignCenter, FaAlignLeft, FaHome, FaUserCircle, FaCaretDown} from 'react-icons/fa';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, logoutUser } from '../features/user/userSlice';
const Navbar = () => {
  const {user} = useSelector((store) => store.user)
  const [showLogout, setShowLogout] = useState(false);

  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleSidebar())
  }
  return (
    <Wrapper>
      <div className="nav-center">
        <button 
          type='button'
          className="toggle-btn"
          onClick= {toggle}
        >
        <FaAlignLeft/>
        </ button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button 
            onClick={() => setShowLogout((prev) =>!prev)}
            type='button'
            className="btn">
              <FaUserCircle />
              {user?.name}
              <FaCaretDown/>
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type='button'
              className="dropdown-btn"
              onClick={() => dispatch(logoutUser())}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar