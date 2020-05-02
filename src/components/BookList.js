import React, { Component } from 'react';
import { debounce } from 'lodash';

import BookItem from './BookItem';
import Api from '../Api';

class BookList extends Component {
  state = {
    newBook: '',
    books: []
  };

  // Executado assim que o componente aparece em tela
  componentDidMount() {
    const books = localStorage.getItem('books');

    if (books) {
      this.setState({ books: JSON.parse(books) });
    }
  }

  // Executado sempre que houver alterações nas props ou estado (prevProps, prevState)
  componentDidUpdate(_, prevState) {
    if (prevState.books !== this.state.books) {
      localStorage.setItem('books', JSON.stringify(this.state.books));
    }
  }

  // SOMENTE BUSCAR QUANDO DIGITOU MAIS DE 3 CARACTERES
  searchTitle = debounce(async (title) => {
    const { data } = await Api.get(`search.json?title=${title}&limit=5`);

    console.log(title);
    console.log(data.docs);
    console.log(data.docs.length);

    const result = data.docs.filter((doc) => doc.isbn && doc.isbn.length).map((doc) => ({
      title: doc.title,
      author: doc.author_name,
      id: doc.isbn[0]
    }))

    //https://openlibrary.org/api/books?bibkeys=ISBN:9780395595114

    console.log(result);
  }, 500);

  handleInputChange = e => {
    this.searchTitle(e.target.value);

    this.setState({ newBook: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      books: [...this.state.books, this.state.newBook],
      newBook: ''
    });
  }

  handleDelete = (book) => {
    this.setState({ books: this.state.books.filter(b => b !== book) });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
          onChange={this.handleInputChange}
          value={this.state.newBook}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default BookList;