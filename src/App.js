import * as React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Typography } from '@mui/material';

import "./App.css";
import Layout from './components/Layout';
import Book from './components/Book';
import Books from './components/Books';
import Character from './components/Character';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="books" element={<Books/>}/>
          <Route path="book" element={<Outlet />}>
            <Route path=":id" element={<Book />}/>
          </Route>
          <Route path="character" element={<Character/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
