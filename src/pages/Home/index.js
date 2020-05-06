import React from 'react';
import BookList from '../../components/BookList';
import ReportButton from '../../components/ReportButton';

function Home({ history }) {
  return (
    <div className='Home'>
      <div>
        <h1>Book Maniac</h1>
        <ReportButton history={history} />
      </div>
      <BookList />
    </div>
  );
}

export default Home;
