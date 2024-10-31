import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './Vision.scss';

const Vision = () => {
   const { theme } = useContext(ThemeContext);

   return (
      <section className={ `vision ${theme === 'dark' ? 'dark' : ''}` }>
         <h2>Our Vision</h2>
         <div className={ `vision__content ${theme === 'dark' ? 'dark' : ''}` }>
            <p>
               At <i><strong>Tascul</strong></i>, we envision a world where education transcends traditional boundaries and adapts to the needs of each individual. Our vision is to harness the power of technology to create personalized learning experiences that inspire curiosity and foster lifelong learning.
            </p>
            <p>
               Our vision is to empower businesses through cutting-edge web development solutions while shaping the future of technology by providing aspiring developers with hands-on, real-world experience.
            </p>
         </div>
      </section>
   );
};

export default Vision;
