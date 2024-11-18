import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { FaQuoteLeft } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';
import './Testimonial.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
   const { theme } = useContext(ThemeContext);
   const [testimonials, setTestimonials] = useState([]);

   // Fetch approved testimonials from database
   useEffect(() => {
      const fetchTestimonials = async () => {
         try {
            const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/admin/reviews/approved`);
            setTestimonials(response.data);
         } catch (error) {
            console.error('Error fetching approved testimonials:', error);
         }
      };

      fetchTestimonials();
   }, []);

   // Slider settings
   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
      adaptiveHeight: true,
      responsive: [
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
            },
         },
      ],
   };

   return (
      <section className={ `testimonials ${theme === 'dark' ? 'dark' : ''}` }>
         <h2 className="testimonials__title">What Our Clients Say</h2>
         { testimonials.length > 0 ? (
            <Slider { ...settings }>
               { testimonials.map((testimonial) => (
                  <div key={ testimonial._id } className="testimonial">
                     <FaQuoteLeft className="testimonial__icon" />
                     <p className="testimonial__text">&quot;{ testimonial.feedback }&quot;</p>
                     <h4 className="testimonial__name">{ testimonial.name }</h4>
                  </div>
               )) }
            </Slider>
         ) : (
            <p className="testimonials__no-feedback">No testimonials available at this time.</p>
         ) }
      </section>
   );
};

export default Testimonials;
