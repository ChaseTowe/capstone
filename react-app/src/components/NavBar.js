
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import '../components/auth/auth.css'
import LoginFormModal from './LoginFormModal';
import SellFormModal from './SellFormModal';
import logo from '../logo/Screenshot_49.png'

const NavBar = () => {

  const user = useSelector(state => state.session.user)

  return (
    <nav id="navbar">
      <div id='navbar_div'>
          <div className='navbar_div'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img className='logo' src={logo}/>
          </NavLink>
          </div>
          <div className='user_buttons'>
          <NavLink to='/cart' exact={true} activeClassName='active'>
          <span className='cart_div'>{user && <span className="material-symbols-outlined" id='carticon'>shopping_cart_checkout</span>}</span>
          </NavLink>
            {user && <SellFormModal/>}
          <li>
            {!user && <LoginFormModal/>}
            {user && <LogoutButton/>}
          </li>
          </div>
      </div>
    </nav>
  );
}

export default NavBar;
