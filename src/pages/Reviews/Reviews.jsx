import { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Reviews.scss';

const Reviews = () => {
   const { theme } = useContext(ThemeContext);
   const [formData, setFormData] = useState({ name: '', email: '', feedback: '' });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/admin/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
         });

         const data = await response.json();
         if (response.ok) {
            toast.success(data.message || 'Feedback submitted successfully!');
            setFormData({ name: '', email: '', feedback: '' });
         } else {
            toast.error(data.message || 'Failed to submit feedback.');
         }
      } catch (error) {
         toast.error('An error occurred while submitting feedback. Please try again later.');
         console.error('Error submitting feedback:', error);
      }
   };

   return (
      <div className={ `reviews ${theme === 'dark' ? 'darkmode' : ''}` }>
         <h2>Your Feedback Matters to Us!</h2>
         <p>
            We value your thoughts on our service. Your feedback helps us to continually improve
            and provide you with the best possible experience. Please take a moment to share
            your experience with us.
         </p>
         <form onSubmit={ handleSubmit } className="feedback-form">
            <div className="input-group">
               <label htmlFor="name">Name</label>
               <input
                  type="text"
                  id="name"
                  name="name"
                  value={ formData.name }
                  onChange={ handleChange }
                  required
               />
            </div>
            <div className="input-group">
               <label htmlFor="email">Email</label>
               <input
                  type="email"
                  id="email"
                  name="email"
                  value={ formData.email }
                  onChange={ handleChange }
                  required
               />
            </div>
            <div className="input-group">
               <label htmlFor="feedback">Feedback</label>
               <textarea
                  id="feedback"
                  name="feedback"
                  rows="5"
                  value={ formData.feedback }
                  onChange={ handleChange }
                  required
               ></textarea>
            </div>
            <button type="submit" className="submit-btn">Submit Feedback</button>
         </form>
         <ToastContainer position="top-right" autoClose={ 3000 } style={ { zIndex: 100001 } } />
      </div>
   );
};

export default Reviews;
