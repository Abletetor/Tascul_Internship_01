import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import profileVideo from '../../assets/profile-video.mp4';
import './GrowingTogether.scss';

const GrowingTogether = () => {

   const { theme } = useContext(ThemeContext);

   return (
      <section className={ `growing-together ${theme}` }>
         <div className="growing-together__video">
            <video controls>
               <source src={ profileVideo } type="video/mp4" />
               Your browser does not support the video tag.
            </video>
         </div>
         <div className="growing-together__content">
            <h2 className="growing-together__title">Tascul: Growing Together</h2>
            <ul className="growing-together__points">
               <li>Built with a passion for quality and innovation since day one.</li>
               <li>A collaborative space that inspires creativity and growth.</li>
               <li>Encouraging personal and professional development through workshops and mentorship.</li>
               <li>Focusing on long-term success with responsible business practices.</li>
               <li>Collaborating with leading organizations to drive impactful solutions.</li>
            </ul>
         </div>
      </section>
   );
};

export default GrowingTogether;
