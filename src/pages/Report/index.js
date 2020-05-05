import React from 'react';
import BookReport from '../../components/BookReport';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Report({ match, history }) {
  return (
    <div className="Report">
      <h1>Book Maniac Report</h1>
      <BookReport year={match.params.year}/>
      <Button variant="primary" size="md" onClick={() => history.push('/')}>
          <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
    </div>
  );
}

export default Report;