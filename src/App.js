import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import BookList from './components/BookList';

function App() {
  return (
    <div className="App">
      <h1>Book Maniac</h1>
      <BookList />
    </div>
  );
}

export default App;
