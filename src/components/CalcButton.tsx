import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
    value: number | string;
    onClick: () => void;

}

const CalcButton: React.FC<Props> = ({ value, onClick }) => {
    return (
        <div className='buttonContainer' >
            <button >
                {value}
            </button>
        </div>
    )
}

export default CalcButton;