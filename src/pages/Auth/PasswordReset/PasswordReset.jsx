import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './PasswordReset.scss';

const PasswordReset = () => {
   const { token } = useParams();
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      if (!token) {
         setError('Invalid or missing token');
      }
   }, [token]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (newPassword !== confirmPassword) {
         setError('Passwords do not match');
         return;
      }

      if (newPassword.length < 6) {
         setError('Password must be at least 6 characters');
         return;
      }

      setLoading(true);

      try {
         await axios.post(
            `${import.meta.env.VITE_APP_URL}/api/intern/reset-password/${token}`,
            { password: newPassword }
         );

         setSuccess('Password reset successful! You can now log in with your new password.');
         setNewPassword('');
         setConfirmPassword('');
         setTimeout(() => navigate('/login'), 3000);
      } catch (error) {
         setError(error.response?.data?.error || 'Failed to reset password');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="password-reset-container">
         <h2>Reset Password</h2>
         <form onSubmit={ handleSubmit }>
            <div className="form-group">
               <label htmlFor="newPassword">New Password</label>
               <input
                  type="password"
                  id="newPassword"
                  value={ newPassword }
                  onChange={ (e) => setNewPassword(e.target.value) }
                  required
               />
            </div>
            <div className="form-group">
               <label htmlFor="confirmPassword">Confirm Password</label>
               <input
                  type="password"
                  id="confirmPassword"
                  value={ confirmPassword }
                  onChange={ (e) => setConfirmPassword(e.target.value) }
                  required
               />
            </div>
            <button type="submit" className="btn-submit" disabled={ loading }>
               { loading ? 'Resetting...' : 'Reset Password' }
            </button>
         </form>
         { error && <p className="error-message">{ error }</p> }
         { success && <p className="success-message">{ success }</p> }
      </div>
   );
};

export default PasswordReset;
