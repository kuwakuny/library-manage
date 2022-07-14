import React from 'react';
import Register from './manager/Register';
import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom'
import Test from './manager/Test';


function App() {
  return (
    <Router>
      <Routes>
        <Route index path='' element={<Register />} />
        <Route exact path='/user' element={<Test />} />
      </Routes>

    </Router>
  );
}

export default App;
