import PropTypes from 'prop-types';

export function Display({ display, isLoading, error }) {
    return (
        <div className="display">
            {error ? (
                <div className="error">{error}</div>
            ) : isLoading ? (
                <div className="loading">Calculating...</div>
            ) : (
                display
            )}
        </div>
    );
}

Display.propTypes = {
    /** The current value to display */
    display: PropTypes.string.isRequired,
    /** Whether the calculator is currently calculating */
    isLoading: PropTypes.bool.isRequired,
    /** Any error message to display */
    error: PropTypes.string
}; 