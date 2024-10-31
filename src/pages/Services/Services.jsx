import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { FaLaptopCode, FaUserFriends, FaLightbulb } from 'react-icons/fa';
import './Services.scss';
import { Link } from 'react-router-dom';

const Services = () => {
   const { theme } = useContext(ThemeContext);

   const services = [
      {
         icon: <FaLaptopCode />,
         title: 'Web Development Solutions',
         text: 'We offer tailored web development services to build modern, responsive, and scalable websites that boost your online presence. Our expertise ensures that your business thrives in the digital world.',
         code: 'WD001',
         price: 'Starts at ₹10,000',
      },
      {
         icon: <FaUserFriends />,
         title: 'Counseling and Wellbeing',
         text: 'Our professional counseling services provide support to students and professionals seeking career advice, mental well-being, and personal growth. We guide individuals toward achieving both personal and career success.',
         code: 'CS002',
         price: '₹799',
      },
      {
         icon: <FaLightbulb />,
         title: 'Guidance and Mentorship',
         text: 'Through our mentorship programs, we guide individuals through the complexities of career choices, offering personalized advice and actionable strategies to succeed in the competitive job market.',
         code: 'GM003',
         price: '₹1,500',
      }
   ];

   return (
      <section className={ `services ${theme === 'dark' ? 'dark' : ''}` }>
         <h1>Our Services</h1>
         <div className="services__list">
            { services.map((service, index) => (
               <div key={ index } className="services__card">
                  <div className="services__icon">{ service.icon }</div>
                  <h3>{ service.title }</h3>
                  <p>{ service.text }</p>
                  <div className="services__info">
                     <span className="info-item">Service Code: { service.code }</span>
                     <span className="info-item">Price: { service.price }</span>
                  </div>

               </div>
            )) }
         </div>
         <div className="services__note">
            <p>Note: Please contact us with the service code to book an appointment.</p>
            <Link to="/contact" className="services__button">Contact Us</Link>
         </div>
      </section>
   );
};

export default Services;
