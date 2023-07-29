import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import Home from './components/Home';
import OrderCake from './components/OrderCake';
import Contact from './components/Contact';
import About from './components/About';

function App() {
  return (
    <div>
      <BrowserRouter>
        < Navbar />
        <Routes>
          <Route path='/' element={< Home />}></Route>
          <Route path='/Order' element={< OrderCake />}></Route>
          <Route path='/About' element={< About />}></Route>
          <Route path='/Contact' element={< Contact />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;