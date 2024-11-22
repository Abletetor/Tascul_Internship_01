/* eslint-disable react/prop-types */
import { useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { ThemeContext } from '../../../../context/ThemeContext';
import 'react-toastify/dist/ReactToastify.css';
import './ReviewSystem.scss';

const ReviewSystem = ({ reviews, setReviews }) => {
   const { theme } = useContext(ThemeContext);

   // Fetch reviews on initial render
   useEffect(() => {
      const fetchReviews = async () => {
         try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/admin/reviews/pending`, {
               headers: { Authorization: `Bearer ${token}` },
            });
            setReviews(response.data);
         } catch (error) {
            console.error('Error fetching reviews:', error.response?.data || error.message);
            toast.error('Failed to fetch reviews.');
         }
      };

      fetchReviews();
   }, [setReviews]);

   // Handle Approve/Reject action
   const handleReviewAction = async (id, action) => {
      try {
         const token = localStorage.getItem('token');
         const endpoint =
            action === 'approve'
               ? `${import.meta.env.VITE_APP_URL}/api/admin/reviews/${id}/approve`
               : `${import.meta.env.VITE_APP_URL}/api/admin/reviews/${id}/reject`;

         const method = action === 'approve' ? 'put' : 'delete';
         await axios({
            method,
            url: endpoint,
            headers: { Authorization: `Bearer ${token}` },
         });

         setReviews((prev) => prev.filter((review) => review._id !== id));

         // Show success toast
         toast.success(`Review ${action === 'approve' ? 'approved' : 'rejected'} successfully.`);
      } catch (error) {
         console.error(`Error handling review ${action}:`, error.response?.data || error.message);
         toast.error(`Failed to ${action} review: ${error.response?.data?.message || 'Unknown error'}`);
      }
   };

   return (
      <section className={ `review-system ${theme === 'dark' ? 'darkmode' : ''}` }>
         <h3 className="review-system__title">Review System</h3>
         <div className="reviews-list">
            { reviews.map((review) => (
               <div className="review-card" key={ review._id }>
                  <h4 className="review-card__name">{ review.name }</h4>
                  <p className="review-card__feedback">{ review.feedback }</p>
                  <div className="review-actions">
                     <button
                        onClick={ () => handleReviewAction(review._id, 'approve') }
                        className="review-actions__button approve-btn"
                     >
                        Approve
                     </button>
                     <button
                        onClick={ () => handleReviewAction(review._id, 'reject') }
                        className="review-actions__button reject-btn"
                     >
                        Reject
                     </button>
                  </div>
               </div>
            )) }
         </div>
         <ToastContainer position="top-right" autoClose={ 3000 } style={ { zIndex: 100001 } } />
      </section>
   );
};

export default ReviewSystem;
