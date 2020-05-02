import React, { Component } from 'react';
import { debounce } from 'lodash';
import { ListGroup } from 'react-bootstrap';

import BookItem from './BookItem';
import Api from '../Api';

class BookList extends Component {
  state = {
    searchString: '',
    books: [],
    searchResult: []
  };

  componentDidMount() {
    const books = localStorage.getItem('books');

    if (books) {
      this.setState({ books: JSON.parse(books) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.books !== this.state.books) {
      localStorage.setItem('books', JSON.stringify(this.state.books));
    }
  }

  searchTitle = debounce(async (title) => {
    if (title.length < 3) {
      this.setState({ searchResult: [] });
      return;
    }
    const { data } = await Api.get(`search.json?title=${title}&limit=5`);

    const result = data.docs.filter((doc) => doc.isbn && doc.isbn.length).map((doc) => ({
      title: doc.title,
      author: doc.author_name,
      id: doc.isbn[0]
    }))

    this.setState({ searchResult: result });
  }, 350);

  handleInputChange = e => {
    this.setState({ searchString: e.target.value });
    this.searchTitle(e.target.value);
  }

  handleAdd = (book) => {
    this.setState({
      books: [...this.state.books, {...book}],
      searchResult: [],
      searchString: ''
    });
  }

  handleDelete = (book) => {
    this.setState({ books: this.state.books.filter(b => b.id !== book.id) });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.books.map(book => (
            <BookItem
              key={book}
              book={book}
              onDelete={() => this.handleDelete(book)}
            />
          ))}
        </ul>
        <input
          type="text"
          placeholder="Search book by title"
          onChange={this.handleInputChange}
          value={this.state.searchString}
        />
        
        <ListGroup>
          {this.state.searchResult.map(book => (
            <ListGroup.Item action onClick={() => this.handleAdd(book)} key={book.id}>
              {`${book.title} - ${book.author}`}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default BookList;