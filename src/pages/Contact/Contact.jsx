import { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaEnvelope, FaPhone, FaPaperPlane } from 'react-icons/fa';
import './Contact.scss';

const Contact = () => {
   const { theme } = useContext(ThemeContext);
   const [formData, setFormData] = useState({ fullname: '', email: '', phone: '', message: '' });

   // Handling form elements change
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   // Handling form submission
   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      formData.append('access_key', import.meta.env.VITE_FORM_ID);

      try {
         const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
         });

         const data = await response.json();

         if (data.success) {
            toast.success('Mail sent successfully!');
            e.target.reset();
            setFormData({ fullname: '', email: '', phone: '', message: '' });
         } else {
            toast.error(data.message || 'Failed to send the message.');
         }
      } catch (error) {
         console.error('Error:', error);
         toast.error('An error occurred. Please try again.');
      }
   };

   return (
      <section className={ `contact ${theme === 'dark' ? 'dark' : ''}` }>
         <h1>Contact Us</h1>
         <form onSubmit={ handleSubmit } className="contact__form">
            <div className="contact__field">
               <FaUser className="contact__icon" />
               <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  value={ formData.fullname }
                  onChange={ handleChange }
                  required
               />
            </div>
            <div className="contact__field">
               <FaEnvelope className="contact__icon" />
               <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={ formData.email }
                  onChange={ handleChange }
                  required
               />
            </div>
            <div className="contact__field">
               <FaPhone className="contact__icon" />
               <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={ formData.phone }
                  onChange={ handleChange }
                  required
               />
            </div>
            <div className="contact__field">
               <textarea
                  name="message"
                  placeholder="Your Message"
                  value={ formData.message }
                  onChange={ handleChange }
                  required
               />
            </div>
            <button type="submit" className="contact__button">
               Send Message <FaPaperPlane />
            </button>
         </form>
         <ToastContainer position="top-right" autoClose={ 3000 } style={ { zIndex: 100001 } } />
      </section>
   );
};

export default Contact;
