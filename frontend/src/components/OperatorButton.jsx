import PropTypes from 'prop-types';

export function OperatorButton({ label, onClick, className = '' }) {
    return (
        <button 
            className={`btn operator ${className}`} 
            onClick={onClick}
        >
            {label}
        </button>
    );
}

OperatorButton.propTypes = {
    /** The text to display on the button */
    label: PropTypes.string.isRequired,
    /** Function to call when the button is clicked */
    onClick: PropTypes.func.isRequired,
    /** Additional CSS classes to apply to the button */
    className: PropTypes.string
}; 