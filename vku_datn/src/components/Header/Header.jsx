import React, {useRef, useEffect} from 'react';

import { Link, NavLink, useNavigate } from "react-router-dom";
import './header.css';

import { motion } from "framer-motion";
import { Container, Row } from 'reactstrap';
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import {toast} from "react-toastify";

const nav__links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
]

const Header = () => {
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const profileActionRef = useRef(null);

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const {currentUser} = useAuth();

  const stickyHeaderFunc = ()=>{
    window.addEventListener("scroll", () => {
      if(
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
        ){
          headerRef.current.classList.add("sticky__header");
      } else{
        headerRef.current.classList.remove("sticky__header");
      }
    })
  }

  const logout = ()=>{
    signOut(auth).then(() => {
      toast.success("Logged out")
      navigate("/home")
    }).catch((err) => {
      toast.error(err.message)
    })
  }

  useEffect(()=>{
      stickyHeaderFunc()

      return ()=> window.removeEventListener("scroll", stickyHeaderFunc)
  })

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const navigateToCart = () => {
    navigate("/cart")
  };

  // const toggleProfileActions = ()=> profileActionRef.current.classList.toggle("show_profileActions")

  return (
    <header className="header" ref={headerRef}>
    <Container>
    <Row>
      <div className="nav__wrapper">
        <div className="logo">
          <div>
            <h1 className='name__logo1'>
              <Link to={'/home'} className='text__name'>E-Mart</Link>
            </h1>
          </div>
        </div>

        <div className="navigation" ref={menuRef} onClick={menuToggle}>
          <motion.ul className="menu">
            { nav__links.map((item, index) => (
                <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) => navClass.isActive ? "nav__active" : ""}
                      >
                      {item.display}
                    </NavLink>
                </li>
              ))}
          </motion.ul>
        </div>

        <div className="nav__icons">
          {/* <span className="fav__icon">
            <i class="ri-heart-line"></i>
            <span className="badge">1</span>
          </span> */}

          <span className="cart__icon" onClick={navigateToCart}>
            <Link to={'/cart'}>
              <i class="ri-shopping-bag-line"></i>
              <span className="badge">{totalQuantity}</span>
            </Link>
          </span>

          <div className="profile">
              {currentUser ? (
                <>
                  <button type='button' className='btn btn-outline-dark'>
                    <span className='cart__icon' onClick={logout}>Logout</span>
                  </button>
                </>
                ) : (
                  <>
                   <div className="align-items-right cart__icon">
                    <Link to="/signup" style={{textDecoration:"none"}}>Signup</Link> / 
                    <Link to="/login" style={{textDecoration:"none"}}>Login</Link>
                  </div>
                  </>
                ) }
          </div>
          {/* <div className="mobile__menu">
            <span onClick={menuToggle}>
              <i class="ri-menu-line"></i>
            </span>
          </div> */}
        </div>
      </div>
    </Row>
  </Container>
  </header>
  )
}

export default Header;