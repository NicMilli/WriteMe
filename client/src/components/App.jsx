import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Selector from './Selector';
import 'react-toastify/dist/ReactToastify.css';
import '../styles.css';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  const [night, setNight] = useState(false);

  const handleClick = () => {
    setNight((prevNight) => !prevNight);
  };

  return (
    <>
      <div>
        <h1>
          Write Me &nbsp;
          <FontAwesomeIcon icon={faPenNib} style={{ color: '#177E89' }} />

          <button type="button" onClick={handleClick} className="night">
            {night ? 'Back' : 'Night Mode' }
            &nbsp;
            <FontAwesomeIcon icon={faMoon} style={{ color: '#FFC857' }} />
          </button>
        </h1>
      </div>
      {night
        ? (
          <div className="video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/Ln2Xq8fCNI8?autoplay=1"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              title="video"
            />
          </div>
        )
        : (
          <div className="app center">
            <Selector />
          </div>
        )}
      <ToastContainer />
    </>
  );
}

export default App;
