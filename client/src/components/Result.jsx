import React from 'react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Result({ readMe, handleRetry }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(readMe);
    toast.success('You copied your ReadMe to your clipboard');
  };

  return (
    <div className="read-me">
      <h1>See your ReadMe Below </h1>
      {readMe.length > 0
        ? (
          <div>
            <button type="button" aria-label="Copy" onClick={copyToClipboard}>
              Copy &nbsp;
              <FontAwesomeIcon icon={faPaperclip} />
            </button>
            <button type="button" onClick={handleRetry}>Retry</button>
            <ReactMarkdown>{readMe}</ReactMarkdown>
          </div>
        )
        : null}
    </div>
  );
}

export default Result;
