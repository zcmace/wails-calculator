import PropTypes from 'prop-types';
import { Display } from './Display';
import { CalculatorButtons } from './CalculatorButtons';
import { useCalculator } from '../hooks/useCalculator';

export function Calculator() {
    const { 
        display,
        isLoading,
        error, 
        handleNumber, 
        handleOperation, 
        handleEquals, 
        handleClear, 
        handleDecimal, 
        handlePercentage, 
        handlePlusMinus
    } = useCalculator();

    return (
        <div className="calculator">
            <Display 
                display={display}
                isLoading={isLoading}
                error={error}
            />
            <CalculatorButtons
                handleNumber={handleNumber}
                handleOperation={handleOperation}
                handleEquals={handleEquals}
                handleClear={handleClear}
                handleDecimal={handleDecimal}
                handlePercentage={handlePercentage}
                handlePlusMinus={handlePlusMinus}
            />
        </div>
    );
}