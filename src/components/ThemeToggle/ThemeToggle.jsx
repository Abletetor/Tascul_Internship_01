import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.scss';

const ThemeToggle = () => {
   const { theme, toggleTheme } = useContext(ThemeContext);

   return (
      <button className="theme-toggle" onClick={ toggleTheme } aria-label="Toggle Theme">
         { theme === 'light' ? <FaMoon /> : <FaSun /> }
      </button>
   );
};

export default ThemeToggle;
