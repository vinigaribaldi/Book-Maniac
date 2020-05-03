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

    const { data } = await Api.get(`search.json?title=${title}&limit=10`);

    const result = data.docs.filter((doc) => doc.isbn && doc.isbn.length).map((doc) => ({
      title: doc.title,
      author: doc.author_name,
      id: doc.isbn[0],
      read: false
    }))

    this.setState({ searchResult: result });
  }, 350);

  handleInputChange = e => {
    this.setState({ searchString: e.target.value });
    this.searchTitle(e.target.value);
  }

  handleAdd = (book) => {
    this.setState((prevState) => ({
      books: [...prevState.books, {...book}],
      searchResult: [],
      searchString: ''
    }));
  }

  handleDelete = (book) => {
    this.setState((prevState) => ({ books: prevState.books.filter(b => b.id !== book.id) }));
  }

  handleRead = (book) => {
    const newBook = {...book, read: !book.read};

    this.handleDelete(book);
    this.handleAdd(newBook);
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.books.sort((a, b) => a.title < b.title ? -1 : 1).map(book => (
            <BookItem
              key={book}
              book={book}
              toggleRead={() => this.handleRead(book)}
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
              {`${book.title} - ${book.author && book.author.join(', ')}`}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default BookList;