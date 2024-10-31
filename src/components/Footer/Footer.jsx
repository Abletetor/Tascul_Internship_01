// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../../assets/TasCulLogo.png';
import './Footer.scss';
import { useState } from 'react';

const Footer = () => {
   const [formData, setFormData] = useState({ email: '' });

   //footer year
   const currentYear = new Date().getFullYear();

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   //Handle Form Submission
   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      formData.append("access_key", import.meta.env.VITE_FORM_ID);

      const response = await fetch("https://api.web3forms.com/submit", {
         method: "POST",
         body: formData
      });

      const data = await response.json();

      if (data.success) {
         alert("Newsletter Successfully Subscribed!");
         e.target.reset();

      } else {
         console.log("Error", data);
         alert(data.message);
      }
   };

   return (
      <footer className='footer'>
         <div className="footer__content">

            <div className="footer__company">
               <img src={ logo } alt="Tascul Logo" className="footer__logo" />
               <p>Innovating the digital space, empowering your business every step of the way.</p>
            </div>

            {/* Quick Links */ }
            <div className="footer__links">
               <h3>Quick Links</h3>
               <ul>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/services">Services</Link></li>
                  <li><Link to="/internship">Internship</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
               </ul>
            </div>

            {/* Contact Info */ }
            <div className="footer__contact">
               <h3>Contact Us</h3>
               <p><FaEnvelope /> info@tascul.com</p>
               <p><FaPhoneAlt /> (123) 456-7890</p>
               <p><FaMapMarkerAlt /> Koforidua, Eastern Region</p>
            </div>

            {/* Social Media */ }
            <div className="footer__social">
               <h3>Follow Us</h3>
               <div className="footer__social-icons">
                  <a href="https://facebook.com" target='_blank' rel='noopener noreferrer'><FaFacebookF /></a>
                  <a href="https://x.com/tascul_official" target='_blank' rel='noopener noreferrer'><FaTwitter /></a>
                  <a href="https://www.instagram.com/tasculofficial/" target='_blank' rel='noopener noreferrer'><FaInstagram /></a>
                  <a href="https://www.linkedin.com/company/tascul/" target='_blank' rel='noopener noreferrer'><FaLinkedinIn /></a>
               </div>
            </div>

            {/* Newsletter Subscription */ }
            <div className="footer__form-links">

               <div className="footer__newsletter">
                  <h3>Subscribe to Our Newsletter</h3>
                  <form onSubmit={ handleSubmit } className="footer__form">
                     <input type="email"
                        name="email"
                        placeholder="Email"
                        value={ formData.email }
                        onChange={ handleChange }
                        required />
                     <button type="submit">Subscribe</button>
                  </form>
               </div>

               {/* Terms and Privacy Policy */ }
               <div className="footer__terms-policy">
                  <Link to="/terms">Terms & Conditions</Link>
                  <Link to="/policy">Privacy Policy</Link>
               </div>
            </div>
         </div>

         {/* Copyright */ }
         <div className="footer__copyright">
            <p>© { currentYear } Tascul. All rights reserved.</p>
         </div>
      </footer>
   );
};

export default Footer;
