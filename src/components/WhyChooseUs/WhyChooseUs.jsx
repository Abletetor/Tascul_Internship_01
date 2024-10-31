import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { FaCertificate, FaUsers, FaSmile, FaCheckCircle, FaComments } from 'react-icons/fa';
import './WhyChooseUs.scss';

const WhyChooseUs = () => {
   const { theme } = useContext(ThemeContext);

   return (
      <section className={ `why-choose-us ${theme}` }>
         <h1 className="why-choose-us__title">Why Choose Us</h1>
         <div className="why-choose-us__cards">
            <div className={ `why-choose-us__card ${theme}` }>
               <FaCertificate className="icon" />
               <h3>MSME Certified</h3>
               <p>We are recognized by the MSME for our commitment to excellence in service.</p>
            </div>
            <div className={ `why-choose-us__card ${theme}` }>
               <FaUsers className="icon" />
               <h3>Experienced Team</h3>
               <p>Our team consists of skilled professionals with years of experience in web development.</p>
            </div>
            <div className={ `why-choose-us__card ${theme}` }>
               <FaSmile className="icon" />
               <h3>Client Satisfaction</h3>
               <p>We prioritize our clients&apos; needs and ensure their satisfaction with our services.</p>
            </div>
            <div className={ `why-choose-us__card ${theme}` }>
               <FaCheckCircle className="icon" />
               <h3>Proven Track Record</h3>
               <p>We have successfully delivered numerous projects across various industries.</p>
            </div>
            <div className={ `why-choose-us__card ${theme}` }>
               <FaComments className="icon" />
               <h3>Transparent Communication</h3>
               <p>We maintain open lines of communication with our clients throughout the project lifecycle.</p>
            </div>
         </div>
      </section>
   );
};

export default WhyChooseUs;
