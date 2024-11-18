import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EmailVerification.scss';

const EmailVerification = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const [message, setMessage] = useState('');
   const [isVerified, setIsVerified] = useState(false);

   useEffect(() => {
      // Extract the token from the URL
      const token = new URLSearchParams(location.search).get('token');

      const verifyEmail = async () => {
         try {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/intern/email-verification?token=${token}`);
            const data = await response.json();

            if (response.ok && data.message === 'Email verified successfully') {
               setMessage('Your email has been successfully verified. Redirecting to login...');
               setIsVerified(true);
               setTimeout(() => navigate('/login'), 3000);
            } else {
               setMessage(data.message || 'Verification failed. Invalid or expired token.');
            }
         } catch (error) {
            console.error('Verification Error:', error);
            setMessage('An error occurred during verification. Please try again.');
         }
      };

      verifyEmail();
   }, [navigate, location]);

   return (
      <div className="email-verification-container">
         <h2>{ isVerified ? 'Email Verified!' : 'Email Verification' }</h2>
         <p>{ message || 'Verifying your email. Please wait...' }</p>
      </div>
   );
};

export default EmailVerification;
