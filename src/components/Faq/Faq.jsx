import { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './Faq.scss';

const faqData = [
   {
      id: 1,
      question: 'What services do you offer?',
      answer: 'We offer web development, digital transformation, and consultancy services tailored to your business needs.'
   },
   {
      id: 2,
      question: 'What is your pricing structure?',
      answer: 'Our pricing depends on the service package. Contact us for detailed information.'
   },
   {
      id: 3,
      question: 'Do you provide maintenance after project completion?', answer: 'Yes, we offer maintenance and support packages to ensure your website continues to perform at its best.'
   },
   {
      id: 4,
      question: 'How long does it take to complete a project?',
      answer: 'The timeline depends on the complexity of the project, but on average, a standard website takes 4 to 6 weeks.'
   },
   {
      id: 5,
      question: 'Do you offer custom designs?',
      answer: 'Yes, we create custom designs based on your brand and business needs, ensuring a unique digital presence.'
   },
   {
      id: 6,
      question: 'What technology do you use for development?',
      answer: 'We typically utilize ReactJS alongside Express as part of a full MERN stack architecture.'
   },
];

const Faq = () => {
   const { theme } = useContext(ThemeContext);
   const [activeQuestion, setActiveQuestion] = useState(null);

   const toggleAnswer = (id) => {
      setActiveQuestion(activeQuestion === id ? null : id);
   };

   return (
      <section className={ `faq ${theme === 'dark' ? 'dark' : ''}` }>
         <h1 className="faq__title">Frequently Asked Questions</h1>
         <div className="faq__list">
            { faqData.map((item) => (
               <div key={ item.id } className={ `faq__item ${activeQuestion === item.id ? 'active' : ''}` }>
                  <div className="faq__question" onClick={ () => toggleAnswer(item.id) }>
                     <span>{ item.question }</span>
                     { activeQuestion === item.id ? <FaMinus className="faq__icon" /> : <FaPlus className="faq__icon" /> }
                  </div>
                  { activeQuestion === item.id && <p className="faq__answer">{ item.answer }</p> }
               </div>
            )) }
         </div>
      </section>
   );
};

export default Faq;
