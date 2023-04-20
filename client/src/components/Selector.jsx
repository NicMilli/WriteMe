/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Result from './Result';
import Spinner from './Spinner';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Selector() {
  const [formData, setFormData] = useState({
    repo: '',
    badges: true,
    technologiesFile: '',
    visuals: false,
    images: '',
    installation: true,
    codeHighlights: false,
    functions: '',
    usage: false,
    contributing: false,
    authors: true,
  });
  const [readMe, setReadMe] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (newSelection) => {
    setLoading(true);
    try {
      const update = await axios.post('/api/writeme', newSelection);
      setReadMe(update.data);
      setLoading(false);
    } catch (err) {
      toast.error(err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prevFormData) => ({ ...prevFormData, [e.target.name]: e.target.value }));
  };

  const handleCheckbox = (e) => {
    setFormData((prevFormData) => ({ ...prevFormData, [e.target.name]: e.target.checked }));
  };

  return (
    <div>
      <h2>Lets refine your ReadMe</h2>
      <main>
        <form
          type="submit"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(formData);
          }}
        >
          <div>
            <label>
              Repository:
              <input
                type="text"
                name="repo"
                value={formData.repo}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Technology badges:
              <input
                type="checkbox"
                name="badges"
                checked={formData.badges}
                onChange={handleCheckbox}
              />
            </label>
          </div>

          <div>
            <label>
              Visuals/ Images:
              <input
                type="checkbox"
                name="visuals"
                checked={formData.visuals}
                onChange={handleCheckbox}
              />
            </label>
          </div>

          <div>
            <label>
              Installation/usage instructions:
              <input
                type="checkbox"
                name="installation"
                checked={formData.installation}
                onChange={handleCheckbox}
              />
            </label>
          </div>

          <div>
            <label>
              Code Highlights:
              <input
                type="checkbox"
                name="codeHighlights"
                checked={formData.codeHighlights}
                onChange={handleCheckbox}
              />
            </label>
          </div>

          {formData.codeHighlights ? (
            <div>
              Optional:
              <input
                type="text"
                name="functions"
                value={formData.functions}
                onChange={handleChange}
                placeholder="Functions to highlight?"
              />
            </div>
          )
            : null}

          <div>
            <label>
              Authors:
              <input
                type="checkbox"
                name="authors"
                checked={formData.authors}
                onChange={handleCheckbox}
              />
            </label>
          </div>

          <button type="submit">Generate ReadMe!</button>
        </form>
      </main>
      <hr style={{
        color: 'black',
        width: '50vw',
      }}
      />
      <div className="result center">
        {loading
          ? <Spinner />
          : readMe.length > 0
            ? <Result formData={formData} readMe={readMe} />
            : <FontAwesomeIcon icon={faGear} size="2xl" style={{ color: '#177E89' }} />}
      </div>
    </div>
  );
}

export default Selector;
