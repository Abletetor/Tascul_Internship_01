import { NavLink } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Navbar.scss';
import logo from '../../assets/TasCulLogo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

   // Mobile Menu toggle handler
   const toggleMobileMenu = () => {
      setMobileMenuOpen(!isMobileMenuOpen);
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
         </ul>
         <ThemeToggle />
         <button className="navbar__toggle" onClick={ toggleMobileMenu } aria-label="Toggle menu">
            { isMobileMenuOpen ? <FaTimes /> : <FaBars /> }
         </button>
      </nav>
   );
};

export default Navbar;
