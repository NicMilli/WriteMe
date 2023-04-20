import React from 'react';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Spinner() {
  return (
    <div>
      <FontAwesomeIcon icon={faGear} spin size="2xl" style={{ color: '#177E89' }} />
    </div>
  );
}

export default Spinner;
