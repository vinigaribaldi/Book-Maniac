import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';
import BookReport from '../../components/BookReport';

function Report({ match, history }) {
  return (
    <div className='Report'>
      <h1>Book Maniac Report</h1>
      <BookReport year={match.params.year} />
      <Button variant='primary' size='md' onClick={() => history.push('/')}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
    </div>
  );
}

export default Report;
