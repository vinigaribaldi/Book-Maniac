import React from 'react';
import BookList from '../../components/BookList';

function Home({ history }) {
  return (
    <div className="Home">
      <h1>Book Maniac</h1>
      <BookList />
      <button onClick={() => history.push('/report')}>REPORT</button>
    </div>
  );
}

export default Home;