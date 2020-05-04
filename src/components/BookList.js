import React, { Component } from 'react';
import { debounce } from 'lodash';
import { ListGroup, Card, Container, Row, Col } from 'react-bootstrap';

import BookItem from './BookItem';
import Api from '../Api';
import './BookList.scss';

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
      read: false,
      readOn: null
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
    const newBook = {...book, read: !book.read, readOn: !book.read ? new Date() : null};
    
    this.handleDelete(book);
    this.handleAdd(newBook);
  }

  render() {
    return (
      <div>
        <Container className="bookList">
          <Row>
            <Col xs={2} sm={1}><b>Read</b></Col>
            <Col xs={4} sm={6}><b>Title</b></Col>
            <Col xs={4} sm={4}><b>Author</b></Col>
            <Col xs={2} sm={1}><b>Remove</b></Col>
          </Row>
          {this.state.books.sort((a, b) => a.title < b.title ? -1 : 1).map(book => (
            <BookItem
              key={book}
              book={book}
              toggleRead={() => this.handleRead(book)}
              onDelete={() => this.handleDelete(book)}
            />
          ))}
        </Container>
        
        <div className="bookSearch">
          <Container>
            <Row>
              <Col>
                <input
                  type="text"
                  placeholder="Search book by title"
                  onChange={this.handleInputChange}
                  value={this.state.searchString}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <ListGroup>
                  {this.state.searchResult.map(book => (
                    <ListGroup.Item action onClick={() => this.handleAdd(book)} key={book.id}>
                      {`${book.title} - ${book.author && book.author.join(', ')}`}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default BookList;