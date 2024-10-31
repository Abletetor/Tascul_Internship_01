import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import aboutImage from '../../assets/About-Img.png';
import './About.scss';
import Vision from '../../components/Vision/Vision';
import Mission from '../../components/Mission/Mission';

const About = () => {
   const { theme } = useContext(ThemeContext);

   return (
      <>
         <section className={ `about ${theme === 'dark' ? 'dark' : ''}` }>
            <div className="about__content">
               <div className="about__text">
                  <h1>Transforming the Way People Learn</h1>
                  <p>
                     Welcome to <i><strong>Tascul</strong></i>, where we are dedicated to revolutionizing the way people learn and grow.
                     Our mission is to provide cutting-edge solutions that make education more accessible, engaging,
                     and effective for everyone.
                  </p>
               </div>
               <div className="about__image">
                  <img src={ aboutImage } alt="Transforming the Way People Learn" />
               </div>
            </div>
         </section>
         <Vision />
         <Mission />
      </>
   );
};

export default About;
