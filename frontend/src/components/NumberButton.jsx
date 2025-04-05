import PropTypes from 'prop-types';

export function NumberButton({ number, onClick, className = '' }) {
    return (
        <button 
            className={`btn ${className}`} 
            onClick={() => onClick(number)}
        >
            {number}
        </button>
    );
}

NumberButton.propTypes = {
    /** The number to display on the button */
    number: PropTypes.string.isRequired,
    /** Function to call when the button is clicked, receives the number as argument */
    onClick: PropTypes.func.isRequired,
    /** Additional CSS classes to apply to the button */
    className: PropTypes.string
}; 