import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Internship from './pages/Internship/Internship';
import Contact from './pages/Contact/Contact';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';


function App () {
   return (
      <Router>
         <ScrollToTop />
         <Navbar />
         <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/about" element={ <About /> } />
            <Route path="/services" element={ <Services /> } />
            <Route path="/internship" element={ <Internship /> } />
            <Route path="/contact" element={ <Contact /> } />
         </Routes>
         <Footer />
      </Router>
   );
}

export default App;
