import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Internship from './pages/Internship/Internship';
import Contact from './pages/Contact/Contact';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Signup from './pages/Auth/Signup/Signup';
import Login from './pages/Auth/Login/Login';
import EmailVerification from './pages/Auth/EmailVerification/EmailVerification';
import RequestPasswordReset from './pages/Auth/RequestPasswordReset/RequestPasswordReset';
import PasswordReset from './pages/Auth/PasswordReset/PasswordReset';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import InternDashboard from './pages/Dashboards/InternDashboard/InternDashboard';
import AdminDashboard from './pages/Dashboards/AdminDashboard/AdminDashboard';
import AuthProvider from './context/AuthContext'; // Wrap the app with the context
import Reviews from './pages/Reviews/Reviews';

function App () {
   return (
      <Router>
         <AuthProvider>  {/* Ensure the AuthProvider wraps the entire app */ }
            <ScrollToTop />
            <Navbar /> {/* Navbar will have access to the AuthContext */ }
            <Routes>
               <Route path="/" element={ <Home /> } />
               <Route path="/about" element={ <About /> } />
               <Route path="/services" element={ <Services /> } />
               <Route path="/internship" element={ <Internship /> } />
               <Route path="/contact" element={ <Contact /> } />
               <Route path='/reviews' element={ <Reviews /> } />
               <Route path="/signup" element={ <Signup /> } />
               <Route path="/login" element={ <Login /> } />
               <Route path="/email-verification" element={ <EmailVerification /> } />
               <Route path="/request-password-reset" element={ <RequestPasswordReset /> } />
               <Route path="/reset-password/:token" element={ <PasswordReset /> } />
               <Route path="/intern-dashboard" element={ <PrivateRoute element={ InternDashboard } /> } />
               <Route path="/admin-dashboard" element={ <PrivateRoute element={ AdminDashboard } /> } />
            </Routes>
         </AuthProvider>
         <Footer />
      </Router>
   );
}

export default App;
