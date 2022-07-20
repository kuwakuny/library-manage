import React from 'react';
import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom'
import Register from './manager/Register';
import Manager from './manager/Manager';
import Edit from './manager/Edit';


function App() {
  return (
    <Router>
      <Routes>
        <Route index path='/' element={<Register />} />
        <Route exact path='/manager' element={<Manager />} />
        <Route exact path='/editor' element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
