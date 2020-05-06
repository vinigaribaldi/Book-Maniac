import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

function BookItem({ book, toggleRead, onDelete }) {
  const renderTooltip = (props) => {
    return (
      <Tooltip id='button-tooltip' {...props}>
        {book.read
          ? moment(book.readOn).fromNow()
          : 'Check to mark the book as read.'}
      </Tooltip>
    );
  };

  return (
    <Row>
      <Col xs={2} sm={1} className={'read'}>
        <OverlayTrigger
          placement='top'
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <input type='checkbox' checked={book.read} onChange={toggleRead} />
        </OverlayTrigger>
      </Col>
      <Col xs={4} sm={6}>
        {book.title}
      </Col>
      <Col xs={4} sm={4}>
        {book.author}
      </Col>
      <Col xs={2} sm={1}>
        <Button variant='link' size='sm' onClick={onDelete}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </Col>
    </Row>
  );
}

BookItem.propTypes = {
  book: PropTypes.object,
  toggleRead: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookItem;
