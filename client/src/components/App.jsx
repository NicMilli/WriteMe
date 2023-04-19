import React from 'react';
import { ToastContainer } from 'react-toastify';
import Selector from './Selector';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <h1>Write Me</h1>
      <div>
        <Selector />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
