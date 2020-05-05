import React, { Component } from 'react';
import moment from 'moment';
import BookDetail from './BookDetail';

class BookReport extends Component {
  state = {
    readBooks: [],
  };

  componentDidMount() {
    const books = localStorage.getItem('books');

    if (books) {
      this.setState({
        readBooks: JSON.parse(books)
          .filter(book => book.read)
          .sort((a, b) => a.readOn < b.readOn ? -1 : 1)
          .map(book => ({...book, readDate: new Date(book.readOn)}))
        });
    }
  }

  render() {
    const months = this.state.readBooks.reduce((months, book) => {
      const bookMonth = new Date(book.readDate.getFullYear(), book.readDate.getMonth(), 1);

      if (!months.length || bookMonth.getTime() !== months[months.length -1].getTime()) {
        return [...months, bookMonth];
      }

      return months;
    }, []);
    console.log(months);
    return (
      <div className="bookReport">
        <h3>Total Books Read: <span>{this.state.readBooks.length}</span></h3>
        
        {months.map(m => {
          const filteredBooks= this.state.readBooks.filter(book => book.readDate.getFullYear() === m.getFullYear() && book.readDate.getMonth() === m.getMonth());
          
          return (
          <>
            <h3>{`${moment(m).format('MMMM YYYY')}: ${filteredBooks.length} book(s) read this month`}</h3>
            {filteredBooks.map(book => (
              <BookDetail book={book} />
            ))}
          </>
          )}
        )}
      </div>
    );
  }
}

export default BookReport;