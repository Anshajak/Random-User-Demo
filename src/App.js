import React from 'react';
import {  BrowserRouter,  Routes,  Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './screens/Home';
import Records from './screens/Records';
import UserModels from './screens/UserModels';

import "./assets/css/App.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/main.css";
function App() {
const pages = ['records', 'persons'];
  return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Navbar pages={pages}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/records' element={<Records/>}/>
          <Route path='/persons' element={<UserModels/>}/>
         </Routes>
         </BrowserRouter>
  );
}

export default App;
