// import logo from './logo.svg';
// import './App.css';
import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Login from './Login'

function App() {
  // const [id, setId] = useState()
  const [id, setId] = useLocalStorage('id')


  return (
    <>
      {id}
      <Login onIdSubmit={setId} />
    </>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
