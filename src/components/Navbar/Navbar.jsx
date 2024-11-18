// src/components/Navbar/Navbar.jsx

import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Navbar.scss';
import logo from '../../assets/TasCulLogo.png';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
   const { isLoggedIn, role } = useAuth();
   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
   const navigate = useNavigate();

   const toggleMobileMenu = () => {
      setMobileMenuOpen(!isMobileMenuOpen);
   };

   const handleLogout = () => {
      localStorage.removeItem('token');
      window.location.href = '/login';
   };

   const handleProfileClick = () => {
      if (role === 'admin') {
         navigate('/admin-dashboard'); // Redirect to Admin Dashboard
      } else if (role === 'intern') {
         navigate('/intern-dashboard'); // Redirect to Intern Dashboard
      }
   };

   return (
      <nav className="navbar">
         <div className="navbar__logo">
            <img src={ logo } alt="TasCul-Logo" />
         </div>
         <ul className={ `navbar__links ${isMobileMenuOpen ? 'navbar__links--open' : ''}` }>
            <li>
               <NavLink to="/" className={ ({ isActive }) => (isActive ? 'active' : '') } onClick={ () => setMobileMenuOpen(false) }>Home</NavLink>
            </li>
            <li>
               <NavLink to="/about" className={ ({ isActive }) => (isActive ? 'active' : '') } onClick={ () => setMobileMenuOpen(false) }>About</NavLink>
            </li>
            <li>
               <NavLink to="/services" className={ ({ isActive }) => (isActive ? 'active' : '') } onClick={ () => setMobileMenuOpen(false) }>Services</NavLink>
            </li>
            <li>
               <NavLink to="/internship" className={ ({ isActive }) => (isActive ? 'active' : '') } onClick={ () => setMobileMenuOpen(false) }>Internship</NavLink>
            </li>
            <li>
               <NavLink to="/contact" className={ ({ isActive }) => (isActive ? 'active' : '') } onClick={ () => setMobileMenuOpen(false) }>Contact Us</NavLink>
            </li>
            <li>
               <NavLink to="/reviews" className={ ({ isActive }) => (isActive ? 'active' : '') } onClick={ () => setMobileMenuOpen(false) }>Reviews</NavLink>
            </li>
            <div className="navbar__actions">
               { isLoggedIn ? (
                  <>
                     <button onClick={ handleProfileClick } className="navbar__button navbar__button--profile">
                        <FaUser /> Profile
                     </button>
                     <button onClick={ handleLogout } className="navbar__button navbar__button--logout">Logout</button>
                  </>
               ) : (
                  <>
                     <NavLink to="/login" className="navbar__button" onClick={ () => setMobileMenuOpen(false) }>Login</NavLink>
                     <NavLink to="/signup" className="navbar__button navbar__button--signup" onClick={ () => setMobileMenuOpen(false) }>Sign Up</NavLink>
                  </>
               ) }
            </div>
         </ul>

         <ThemeToggle />
         <button className="navbar__toggle" onClick={ toggleMobileMenu } aria-label="Toggle menu">
            { isMobileMenuOpen ? <FaTimes /> : <FaBars /> }
         </button>
      </nav>
   );
};

export default Navbar;
