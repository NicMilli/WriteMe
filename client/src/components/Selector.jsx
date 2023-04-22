/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Result from './Result';
import Spinner from './Spinner';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Selector() {
  const [formData, setFormData] = useState({
    repo: '',
    tech: true,
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
  const [techBadges, setTechBadges] = useState({});

  const fetchBadges = async () => {
    const fetchedBadges = await axios.get('/api/badges');
    const badgeArray = await fetchedBadges.data;
    setTechBadges(badgeArray);
  };

  useEffect(() => {
    fetchBadges();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const allBadges = [...techBadges];
    const selectedBadges = allBadges.filter((badge) => badge.selected === true);
    try {
      const update = await axios.post('/api/writeme', {
        formData,
        badges: selectedBadges,
      });
      setReadMe(update.data);
      setLoading(false);
    } catch (err) {
      toast.error(err);
      setLoading(false);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      repo: '',
      tech: true,
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
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prevFormData) => ({ ...prevFormData, [e.target.name]: e.target.value }));
  };

  const handleCheckbox = (e) => {
    setFormData((prevFormData) => ({ ...prevFormData, [e.target.name]: e.target.checked }));
  };

  const handleBadges = (e, ind) => {
    const copyArr = [...techBadges];
    copyArr[ind].selected = e.target.checked;
    setTechBadges(copyArr);
  };

  return (
    <div className="selector">
      <h2>Lets refine your ReadMe</h2>
      <main>
        <form
          type="submit"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
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

          <div className="ckeck-box">
            <label>
              Technology badges:
              <input
                type="checkbox"
                name="tech"
                checked={formData.tech}
                onChange={handleCheckbox}
              />
            </label>
          </div>

          <div>
            {techBadges.length > 0
              ? (
                <ul className="tech-container">
                  {techBadges.map((badge, ind) => (
                    <li key={`${badge._id}`}>
                      <label>
                        {badge.name}
                        <input
                          type="checkbox"
                          name={badge.name}
                          checked={badge.selected}
                          onChange={(e) => { handleBadges(e, ind); }}
                        />
                      </label>
                    </li>
                  ))}
                </ul>
              )
              : null }
          </div>

          <div className="ckeck-box">
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

          {formData.visuals ? (
            <div>
              Image URLs (Comma separated list):
              <input
                type="text"
                name="images"
                value={formData.images}
                onChange={handleChange}
              />
            </div>
          )
            : null}

          <div className="ckeck-box">
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

          <div className="ckeck-box">
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

          <div className="ckeck-box">
            <label>
              Authors:
              <input
                type="checkbox"
                name="authors"
                id="authors"
                checked={formData.authors}
                onChange={handleCheckbox}
              />
            </label>
          </div>

          <button type="submit">Generate ReadMe!</button>
          <button type="button" onClick={handleReset}>Reset fields</button>
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
            ? <Result handleRetry={handleSubmit} readMe={readMe} />
            : <FontAwesomeIcon icon={faGear} size="2xl" style={{ color: '#177E89' }} />}
      </div>
    </div>
  );
}

export default Selector;
