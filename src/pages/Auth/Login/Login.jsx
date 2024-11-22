import { useState, useContext } from 'react';
import { FaUser, FaKey, FaIdCard } from 'react-icons/fa';
import { ThemeContext } from '../../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './Login.scss';

const Login = () => {
   const [internId, setInternId] = useState('');
   const [name, setName] = useState('');
   const [password, setPassword] = useState('');
   const [isAdmin, setIsAdmin] = useState(false);
   const { theme } = useContext(ThemeContext);
   const { login } = useAuth();
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();

      const loginData = isAdmin
         ? { name, password }
         : { internId, password };

      try {
         const endpoint = isAdmin
            ? `${import.meta.env.VITE_APP_URL}/api/admin/login`
            : `${import.meta.env.VITE_APP_URL}/api/intern/login`;

         const response = await axios.post(endpoint, loginData);

         const { token, user } = response.data;
         localStorage.setItem('token', token);
         localStorage.setItem('user', JSON.stringify(user));
         login(user, token);

         // Success Toast
         toast.success('Login successful! Welcome back!');

         // Redirect to the appropriate dashboard
         if (user.role === 'admin') {
            navigate('/admin-dashboard');
         } else {
            navigate('/intern-dashboard');
         }
      } catch (error) {
         console.error('Login error:', error);
         toast.error('Wrong ID or password!');
      }
   };

   return (
      <div className={ `login-container ${theme}` }>
         <h2>Log Into Your Account</h2>
         <div className="login-tabs">
            <button onClick={ () => setIsAdmin(false) } className={ !isAdmin ? 'active' : '' }>
               Intern
            </button>
            <button onClick={ () => setIsAdmin(true) } className={ isAdmin ? 'active' : '' }>
               Admin
            </button>
         </div>
         <form onSubmit={ handleSubmit } className="login-form">
            { !isAdmin ? (
               <>
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
                        <FaKey /> Password
                     </label>
                     <input
                        type="password"
                        id="password"
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                        required
                     />
                  </div>
               </>
            ) : (
               <>
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
                     <label htmlFor="password">
                        <FaKey /> Password
                     </label>
                     <input
                        type="password"
                        id="password"
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                        required
                     />
                  </div>
               </>
            ) }
            <button type="submit" className="btn-login">
               Login
            </button>
            { !isAdmin && (
               <>
                  <p>
                     Don&apos;t have an account?{ ' ' }
                     <a href="/signup" className="link-signup">
                        Sign Up
                     </a>
                  </p>
                  <p>
                     <a href="/request-password-reset" className="link-reset">
                        Forgot Password?
                     </a>
                  </p>
               </>
            ) }
         </form>
         <ToastContainer position="top-right" autoClose={ 3000 } style={ { zIndex: 100001 } } />
      </div>
   );
};

export default Login;
