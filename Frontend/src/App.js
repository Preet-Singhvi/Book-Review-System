// // App.js
// import React, { useState, useEffect } from 'react';
// import BookList from './components/BookList';
// import BookDetails from './components/BookDetails';
// import SearchBar from './components/SearchBar';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <SearchBar />
//         <Switch>
//           <Route exact path="/" component={BookList} />
//           <Route path="/book/:id" component={BookDetails} />
//         </Switch>
//       </div>
//     </Router>
//   );
// };

// export default App;
import { Routes ,Route } from 'react-router';
import { useState } from 'react';
import React from 'react';
import './App.css';
import Sign from './Sign-In/Login';
import Register from './Sign-Up/Register';
import Home from './Home/HomePage';
import BookDetails from './BookDetail';
// import EditProfile from './Edit/EditProfile';
function App() {

 const [pro, setpro] = useState({});

  return (
    <Routes>
      <Route path='/' element={<Sign/>} />
      <Route path='/register' element={<Register/>} />
      <Route exact path='/books' element={<Home/> } />
      <Route exact path="/books/:id" element={<BookDetails />} />
    </Routes>
  );
}

export default App;
