import { useState, useContext } from 'react';
import { FaUser, FaEnvelope, FaIdCard, FaLock } from 'react-icons/fa';
import { ThemeContext } from '../../../context/ThemeContext';
import './Signup.scss';

const SignUp = () => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [internId, setInternId] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const { theme } = useContext(ThemeContext);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');
      setIsSubmitting(true);

      try {
         const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/intern/signup`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, internId, password })
         });

         const data = await response.json();

         if (response.ok) {
            setSuccess('Account created successfully! Please check your email to verify your account before logging in.');
            setName(''); setEmail(''); setInternId(''); setPassword('');
         } else {
            setError(data.message || 'Something went wrong');
         }
      } catch (error) {
         setError('Server error. Please try again later.');
         console.log(error);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className={ `signup-container ${theme}` }>
         <h2>Create An Account</h2>
         { error && <p className="error-message">{ error }</p> }
         { success && <p className="success-message">{ success }</p> }
         <form onSubmit={ handleSubmit } className="signup-form">
            <div className="form-group">
               <label htmlFor="name">
                  <FaUser /> Name
               </label>
               <input
                  type="text"
                  id="name"
                  value={ name }
                  onChange={ (e) => setName(e.target.value) }
                  required
               />
            </div>

            <div className="form-group">
               <label htmlFor="email">
                  <FaEnvelope /> Email
               </label>
               <input
                  type="email"
                  id="email"
                  value={ email }
                  onChange={ (e) => setEmail(e.target.value) }
                  required
               />
            </div>

            <div className="form-group">
               <label htmlFor="internId">
                  <FaIdCard /> Intern ID/CIN
               </label>
               <input
                  type="text"
                  id="internId"
                  value={ internId }
                  onChange={ (e) => setInternId(e.target.value) }
                  required
               />
            </div>

            <div className="form-group">
               <label htmlFor="password">
                  <FaLock /> Password
               </label>
               <input
                  type="password"
                  id="password"
                  value={ password }
                  onChange={ (e) => setPassword(e.target.value) }
                  required
               />
            </div>

            <button type="submit" className="btn-signup" disabled={ isSubmitting }>
               { isSubmitting ? 'Signing Up...' : 'Sign Up' }
            </button>
            <p>
               Already have an account?{ ' ' }
               <a href="/login" className="link-login">Login</a>
            </p>
         </form>
      </div>
   );
};

export default SignUp;
