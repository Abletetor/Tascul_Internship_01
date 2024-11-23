import { useState, useContext } from 'react';
import { FaUser, FaEnvelope, FaIdCard, FaLock } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { ThemeContext } from '../../../context/ThemeContext';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.scss';

const SignUp = () => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [internId, setInternId] = useState('');
   const [password, setPassword] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const { theme } = useContext(ThemeContext);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
         const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/intern/signup`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, internId, password }),
         });

         const data = await response.json();

         if (response.ok) {
            toast.success('Account created successfully! Please check your email to verify your account before logging in.');
            setName('');
            setEmail('');
            setInternId('');
            setPassword('');
         } else {
            toast.error(data.message || 'Something went wrong');
         }
      } catch (error) {
         toast.error('Server error. Please try again later.');
         console.error(error);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className={ `signup-container ${theme}` }>
         <h2>Create An Account</h2>
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

         <ToastContainer position="top-right" autoClose={ 4000 } style={ { zIndex: 100001 } } />
      </div>
   );
};

export default SignUp;
