import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CalcButton from './CalcButton';
import '../styles/calc.css';
import Button from '@mui/material/Button';


function CalcSquare(props: any) {
    return (
        <Button variant="text" onClick={props.onClick}>
            {props.value}
        </Button>
    )
}

function Calc() {
    const [firstOp, setFirstOp] = useState('')
    const [firstNum, setFirstNum] = useState(0)
    const [secondNum, setSecondNum] = useState(0)
    const [secondNumLoaded, setSecondNumLoaded] = useState(false)
    const [secondOp, setSecondOp] = useState('')
    const [display, setDisplay] = useState(0)
    function renderButton(i: number | string) {
        return (
            <CalcSquare
                value={i}
                onClick={() => handleButtonClick(i)}
            />
        );
    }

    function reset() {
        setFirstOp('');
        setFirstNum(0);
        setSecondNum(0);
        setSecondNumLoaded(false);
        setSecondOp('');
        setDisplay(0);
    }

    function opSwitch(i: string) {

        switch (i) {
            case '+':
                return add(firstNum, secondNum);
            case '-':
                return subtract(firstNum, secondNum);
            case '*':
                return multiply(firstNum, secondNum);
            case '/':
                return divide(firstNum, secondNum);
            default:
                break;
        }

    }

    function handleDecimalOp(i: number) {
        let num: string;
        if (secondOp === '.') {
            num = secondNum.toString()
        }
        else {
            num = firstNum.toString()
        }
        //console.log(num)
        if (!num.includes('.')) {
            num = num.concat('.');
            //console.log('if reached')
        }
        num = num + i.toString();
        //console.log(num);
        return parseFloat(num);
    }

    function handleButtonClick(i: number | string) {
        //console.log('reached')
        //console.log(typeof i)
        let isNumber: boolean = (typeof i === "number")
        if (firstOp === '') { //if no first operator is there 
            //console.log('reached first if branch')
            if (!secondNumLoaded && isNumber) { //if input button is a number 
                //console.log('is a number')
                setDisplay(display * 10 + Number(i))//add inputted number to display 
                setFirstNum(display * 10 + Number(i))
            }
            else if (secondNumLoaded && isNumber) {
                setDisplay(display * 10 + Number(i))
                setSecondNum(display * 10 + Number(i))
            }
            else {  //if button is an operator 
                if (i === '=') {
                    return;
                }
                setFirstOp(String(i)) //set first operator 
                setFirstNum(display)
            }
        }
        else { //if first operator has been inputted
            if (!secondNumLoaded && !isNumber) { //if no second number is given and first operator is there 
                // console.log('jesus')
                setFirstOp(String(i)) //change first operator to the new input 
            }
            else if (secondNumLoaded && !isNumber) {//if a second operator is given after the first operator and second number are given
                if (String(i) === '.') {
                    if (secondOp === '.') {
                        return;
                    }
                    setSecondOp(String(i));
                    return;
                }
                setDisplay(Number(opSwitch(firstOp))); //do the operation 
                setFirstNum(Number(opSwitch(firstOp))); //change display                
                if (String(i) === '=') {
                    setFirstOp(''); //and first op
                }
                else {
                    setFirstOp(String(i));
                }
                setSecondOp('');
                setSecondNum(0); //set result to be first number
                setSecondNumLoaded(false);
            }
            else if (!secondNumLoaded && isNumber) {
                if (secondOp === '.') {
                    setDisplay(handleDecimalOp(Number(i)));
                    setSecondNum(handleDecimalOp(Number(i)))
                    console.log('gao');
                }
                if (firstOp === '.') {
                    setDisplay(handleDecimalOp(Number(i)));
                    setFirstNum(handleDecimalOp(Number(i)))
                    //console.log(handleDecimalOp(Number(i)));
                }
                else {
                    setDisplay(Number(i));
                    setSecondNum(Number(i));
                    setSecondNumLoaded(true);
                }
            }
            else if (secondNumLoaded && isNumber) {
                if (secondOp === '.') {
                    setDisplay(handleDecimalOp(Number(i)));
                    setSecondNum(handleDecimalOp(Number(i)))
                    console.log(Number(i));
                }
                setDisplay(display * 10 + Number(i));
                setSecondNum(display * 10 + Number(i));
            }
        }
    }
    return (
        <div className='calcContainer'>
            <div className='buttonContainer'>
                <div className="calc-row">
                    {renderButton(Number(1))}
                    {renderButton(2)}
                    {renderButton(3)}
                    {renderButton('+')}
                </div>
                <div className="calc-row">
                    {renderButton(4)}
                    {renderButton(5)}
                    {renderButton(6)}
                    {renderButton('-')}
                </div>
                <div className="calc-row">
                    {renderButton(7)}
                    {renderButton(8)}
                    {renderButton(9)}
                    {renderButton('*')}
                </div>
                <div className="calc-row">
                    {renderButton('.')}
                    {renderButton(0)}
                    {renderButton('=')}
                    {renderButton('/')}
                </div>
            </div>
            <div className="outer">
                <div>{display}</div>
                <div>
                    <Button variant="contained" onClick={reset}>
                        RESET
                    </Button>
                </div>
            </div>
        </div >
    )
}


function add(a: number, b: number) {
    return a + b;
}

function subtract(a: number, b: number) {
    return a - b;
}

function multiply(a: number, b: number) {
    return a * b;
}

function divide(a: number, b: number) {
    if (b == 0) {
        return Number.NaN
    }
    return a / b;
}


export default Calc;