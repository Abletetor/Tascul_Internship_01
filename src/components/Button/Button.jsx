import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ label, onClick, variant = 'primary', icon = null }) => (
   <button className={ `button button--${variant}` } onClick={ onClick }>
      { icon && <span className="button__icon">{ icon }</span> }
      { label }
   </button>
);

Button.propTypes = {
   label: PropTypes.string.isRequired,
   onClick: PropTypes.func,
   variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
   icon: PropTypes.element,
};

export default Button;
