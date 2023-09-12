import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from './views/Dashboard';
import CreateForm from './views/CreateForm';
import UpdateForm from './views/UpdateForm';
import ShowOne from './views/ShowOne';

function App() {
  return (
    <div className="App">
      <nav className='navbar p-3 bg-success'>
        <div class="container">
          <h1>My Favorite Movies</h1>
          <div>
            <Link to='/' className='btn btn-success btn-hover'>Dashboard</Link>
            <Link to='/movies/new' className='btn btn-success btn-hover m-3'>Add an movie</Link>
          </div>
        </div>
      </nav>
      <hr />

      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/movies/new' element={<CreateForm />} />
        <Route path='/movies/:id/edit' element={<UpdateForm />} />
        <Route path='/movies/:id' element={<ShowOne />} />
      </Routes>
    </div>
  );
}

export default App;
