import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calc from './components/Calc';

function App() {
  return (
    <div className="App">
      <div className='centered-container' style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1557682268-e3955ed5d83f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=582&q=80")`
      }} >
        <Calc />
      </div>
    </div>
  );
}

export default App;
