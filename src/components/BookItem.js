import React from 'react';
import PropTypes from 'prop-types';

function BookItem({ book, toggleRead, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={book.read}
        onChange={toggleRead}
      />
      {book.title}
      <button onClick={onDelete} type="button">Remover</button>
    </li>
  );
}

BookItem.defaultProps = {
  book: 'Not selected',
};

BookItem.propTypes = {
  book: PropTypes.object,
  toggleRead: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookItem;