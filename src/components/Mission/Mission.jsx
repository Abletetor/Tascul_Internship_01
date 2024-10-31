import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { FaLightbulb, FaUsers, FaHandsHelping, FaTrophy } from 'react-icons/fa';
import './Mission.scss';

const Mission = () => {
   const { theme } = useContext(ThemeContext);

   const missionItems = [
      {
         icon: <FaLightbulb />,
         title: 'Innovation',
         text: 'We constantly strive to push the boundaries of what’s possible in education, embracing new technologies and ideas to drive progress.'
      },
      {
         icon: <FaUsers />,
         title: 'Inclusivity',
         text: 'We are committed to making learning accessible to everyone, regardless of background or ability.'
      },
      {
         icon: <FaHandsHelping />,
         title: 'Collaboration',
         text: 'We work closely with educators, learners, and partners to ensure our solutions meet real-world needs and deliver tangible results.'
      },
      {
         icon: <FaTrophy />,
         title: 'Excellence',
         text: 'We uphold the highest standards in everything we do, from the quality of our products to the support we provide.'
      },
   ];

   return (
      <section className={ `mission ${theme === 'dark' ? 'dark' : ''}` }>
         <h2>Our Mission</h2>
         <div className="mission__list">
            { missionItems.map((item, index) => (
               <div key={ index } className="mission__item">
                  <div className="mission__icon">{ item.icon }</div>
                  <h3>{ item.title }</h3>
                  <p>{ item.text }</p>
               </div>
            )) }
         </div>
      </section>
   );
};

export default Mission;
