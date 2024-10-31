// src/components/Testimonials.jsx
import { useContext } from 'react';
import Slider from 'react-slick';
import { FaQuoteLeft } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';
import './Testimonial.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
   {
      id: 1,
      name: 'Johnathan Kubi',
      text: 'Tascul provided exceptional web development services. Their team was professional, responsive, and delivered high-quality work.',
      position: 'CEO, HerbalMedics Inc.'
   },
   {
      id: 2,
      name: 'Larry Alax',
      text: 'Working with Tascul has been a game changer for our business. Their expertise in web solutions helped us elevate our online presence.',
      position: 'Marketing Manager, Telesol Inc.'
   },
   {
      id: 3,
      name: 'Michael Johnson',
      text: 'The creativity and technical skills at Tascul are impressive. They truly care about their clients and their success.',
      position: 'Project Lead, Tech Innovators'
   },
   {
      id: 4,
      name: 'Emily Davis',
      text: 'Tascul’s team is fantastic! They understood our needs and delivered a beautiful website that exceeded our expectations.',
      position: 'Founder, QuiLas Startup Co.'
   },
   {
      id: 5,
      name: 'Chris Lee',
      text: 'Our experience with Tascul was amazing. They were dedicated and went above and beyond to ensure we were satisfied.',
      position: 'Operations Director, Nakrec Inc.'
   },
   {
      id: 6,
      name: 'Alex Brown',
      text: 'Professionalism and expertise at its best.',
      position: 'CTO, Innovative Solutions'
   },
];

const Testimonials = () => {
   const { theme } = useContext(ThemeContext);

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
         <Slider { ...settings }>
            { testimonials.map((testimonial) => (
               <div key={ testimonial.id } className="testimonial">
                  <FaQuoteLeft className="testimonial__icon" />
                  <p className="testimonial__text">&quot;{ testimonial.text }&quot;</p>
                  <h4 className="testimonial__name">{ testimonial.name }</h4>
                  <p className="testimonial__position">{ testimonial.position }</p>
               </div>
            )) }
         </Slider>
      </section>
   );
};

export default Testimonials;
