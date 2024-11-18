import { useState } from 'react';
import './RequestPasswordReset.scss';

const RequestPasswordReset = () => {
   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage('');

      try {
         const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/intern/request-password-reset`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
         });

         const data = await response.json();

         if (response.ok) {
            setMessage(`A password reset link has been sent to ${email}. Please check your inbox.`);
         } else {
            setMessage(data.message || 'Something went wrong');
         }
      } catch (error) {
         console.error('Error requesting password reset:', error);
         setMessage('An error occurred. Please try again later.');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="request-password-reset-container">
         <h2>Request Password Reset</h2>
         <form onSubmit={ handleSubmit }>
            <div className="form-group">
               <label htmlFor="email">Email Address</label>
               <input
                  type="email"
                  id="email"
                  value={ email }
                  onChange={ (e) => setEmail(e.target.value) }
                  required
               />
            </div>
            <button type="submit" className="btn-submit" disabled={ loading }>
               { loading ? 'Sending...' : 'Send Reset Link' }
            </button>
         </form>

         { message && <p className="message">{ message }</p> }
      </div>
   );
};

export default RequestPasswordReset;
