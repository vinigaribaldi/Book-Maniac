import React from 'react';
import PropTypes from 'prop-types';

function BookItem({ book, onDelete }) {
  return (
    <li>
      {book.title}
      <button onClick={onDelete} type="button">Remover</button>
    </li>
  );
}

BookItem.defaultProps = {
  book: 'Not selected',
};

BookItem.propTypes = {
  book: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

export default BookItem;