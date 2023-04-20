import React from 'react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Result({ readMe }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(readMe);
    toast.success('You copied your ReadMe to your clipboard');
  };

  return (
    <>
      <h1>ReadMe</h1>
      {readMe.length > 0
        ? (
          <div>
            <button type="button" aria-label="Copy" onClick={copyToClipboard}>
              Copy <FontAwesomeIcon icon={faPaperclip} />
            </button>
            <ReactMarkdown>{readMe}</ReactMarkdown>
          </div>
        )
        : null}
    </>
  );
}

export default Result;
