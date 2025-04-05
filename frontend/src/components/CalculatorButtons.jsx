import PropTypes from 'prop-types';
import { OperatorButton } from './OperatorButton';
import { NumberButton } from './NumberButton';

export function CalculatorButtons({
    handleNumber,
    handleOperation,
    handleEquals,
    handleClear,
    handleDecimal,
    handlePercentage,
    handlePlusMinus
}) {
    return (
        <div className="buttons">
            <OperatorButton label="AC" onClick={handleClear} />
            <OperatorButton label="±" onClick={handlePlusMinus} />
            <OperatorButton label="%" onClick={handlePercentage} />
            <OperatorButton label="÷" onClick={() => handleOperation("÷")} />
            
            <NumberButton number="7" onClick={handleNumber} />
            <NumberButton number="8" onClick={handleNumber} />
            <NumberButton number="9" onClick={handleNumber} />
            <OperatorButton label="×" onClick={() => handleOperation("×")} />
            
            <NumberButton number="4" onClick={handleNumber} />
            <NumberButton number="5" onClick={handleNumber} />
            <NumberButton number="6" onClick={handleNumber} />
            <OperatorButton label="-" onClick={() => handleOperation("-")} />
            
            <NumberButton number="1" onClick={handleNumber} />
            <NumberButton number="2" onClick={handleNumber} />
            <NumberButton number="3" onClick={handleNumber} />
            <OperatorButton label="+" onClick={() => handleOperation("+")} />
            
            <NumberButton number="0" onClick={handleNumber} className="zero" />
            <OperatorButton label="." onClick={handleDecimal} />
            <OperatorButton label="=" onClick={handleEquals} className="equals" />
        </div>
    );
}

CalculatorButtons.propTypes = {
    /** Function to handle number button clicks */
    handleNumber: PropTypes.func.isRequired,
    /** Function to handle operation button clicks */
    handleOperation: PropTypes.func.isRequired,
    /** Function to handle equals button click */
    handleEquals: PropTypes.func.isRequired,
    /** Function to handle clear button click */
    handleClear: PropTypes.func.isRequired,
    /** Function to handle decimal button click */
    handleDecimal: PropTypes.func.isRequired,
    /** Function to handle percentage button click */
    handlePercentage: PropTypes.func.isRequired,
    /** Function to handle plus/minus button click */
    handlePlusMinus: PropTypes.func.isRequired
}; 