import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { FaLaptopCode, FaUserTie, FaLightbulb, FaChartLine, FaRocket, FaNetworkWired } from 'react-icons/fa';
import internImg from '../../assets/Intern-Img.png';
import './Internship.scss';
import { Link } from 'react-router-dom';

const Internship = () => {
   const { theme } = useContext(ThemeContext);

   const features = [
      {
         icon: <FaLaptopCode />,
         title: 'Real-World Experience',
         text: 'Interns at Tascul work on live projects, applying their skills in real-world scenarios and contributing to the success of clients and products.',
      },
      {
         icon: <FaUserTie />,
         title: 'Mentorship and Guidance',
         text: 'Each intern is assigned a mentor who provides personalized guidance and industry best practices.',
      },
      {
         icon: <FaLightbulb />,
         title: 'Diverse Learning Opportunities',
         text: 'Interns explore different business aspects, from development to deployment, for a well-rounded experience.',
      },
      {
         icon: <FaChartLine />,
         title: 'Innovation and Creativity',
         text: 'Interns are encouraged to innovate and provide creative solutions, making a real impact on projects.',
      },
      {
         icon: <FaRocket />,
         title: 'Career Growth',
         text: 'Many interns secure full-time roles with Tascul or use their experience to move into other prominent roles in the tech industry.',
      },
      {
         icon: <FaNetworkWired />,
         title: 'Networking',
         text: 'Interns build connections with industry professionals, peers, and clients, creating valuable networking opportunities.',
      },
   ];

   return (
      <section className={ `internship ${theme === 'dark' ? 'dark' : ''}` }>
         <div className="internship__intro">
            <div className="internship__text">
               <h1>Internship Opportunities at Tascul</h1>
               <p>
                  At <i><strong>Tascul</strong></i>, we believe in fostering talent and providing a platform for aspiring individuals to grow and excel in their careers. Our internship program is designed to offer students and young professionals hands-on experience in the tech industry, helping them bridge the gap between theoretical knowledge and real-world applications.
               </p>
               <p>
                  <i><strong>Tascul&apos;s</strong></i> internship program offers a unique blend of learning, practical exposure, and innovation. Interns at Tascul are not just bystanders; they become integral parts of the team, contributing to live projects, collaborating with seasoned professionals, and learning the latest tools and technologies that are reshaping the digital landscape.
               </p>
            </div>
            <div className="internship__image">
               <img src={ internImg } alt="Internship Program" />
            </div>
         </div>
         <div className="internship__features">
            { features.map((feature, index) => (
               <div key={ index } className="internship__card">
                  <div className="internship__icon">{ feature.icon }</div>
                  <h3>{ feature.title }</h3>
                  <p>{ feature.text }</p>
               </div>
            )) }
         </div>
         <div className="internship__cta">
            <Link to='https://docs.google.com/forms/u/0/d/e/1FAIpQLSdaJQXqvx5R0tqhl9zZX1_9UUP0lUL8IBJoFQ_1lOGhVazvlg' target='_blank' className='cta-btn'>Apply Now</Link>
         </div>
      </section>
   );
};

export default Internship;
