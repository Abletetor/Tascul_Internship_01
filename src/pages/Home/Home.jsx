import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import heroImage from '../../assets/Img-hero.png';
import { ThemeContext } from '../../context/ThemeContext';
import GrowingTogether from '../../components/GrowingTogether/GrowingTogether';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import Testimonials from '../../components/Testimonials/Testimonial';
import Faq from '../../components/Faq/Faq';

const Home = () => {
   const { theme } = useContext(ThemeContext);


   return (
      <>
         <section className={ `hero ${theme}` }>
            <div className="hero__content">
               <h1 className="hero__title">We always provide<br />Best Service</h1>
               <p className="hero__description">
                  At <i><strong>Tascul</strong></i>, we are a trusted Web Development company, combining deep technical expertise and industry experience to help our clients stay ahead of the curve and solve challenges before they arise. Our web solutions provide a unique competitive advantage by empowering businesses to elevate their digital presence and achieve success online.
               </p>
               <Link to="/services" className="hero__button">Get started</Link>
            </div>
            <div className="hero__image">
               <img src={ heroImage } alt="Professional Web Development" />
            </div>
         </section>
         <GrowingTogether />
         <WhyChooseUs />
         <Testimonials />
         <Faq />
      </>
   );
};

export default Home;
