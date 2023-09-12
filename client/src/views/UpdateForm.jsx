import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";

const UpdateForm = (props) => {
  const { id } = useParams();
  const [newTitle, setNewTitle] = useState('');
  const [newReleaseYear, setNewReleaseYear] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newFavorite, setNewFavorite] = useState();
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/movies/${id}`)
      .then(res => {
        console.log(res.data)
        setNewTitle(res.data.title);
        setNewReleaseYear(res.data.releaseYear);
        setNewImageUrl(res.data.imageUrl);
        setNewDescription(res.data.description);
        setNewFavorite(res.data.favorite);
      })
      .catch((err) => {
        console.log('Error with axios get', err)
      })
  }, []);

  const updateMovie = e => {
    e.preventDefault();
    axios.patch(`http://localhost:8000/api/movies/${id}`, {
      title: newTitle,
      releaseYear: newReleaseYear,
      imageUrl: newImageUrl,
      description: newDescription,
      favorite: newFavorite,
    })
      .then(res => {
        console.log(res)
        navigate(`/movies/${id}`)
      })
      .catch((err) => {
        const errorResponse = err.response.data.errors;
        const errorArr = [];

        for (const key in errorResponse) {
          errorArr.push(errorResponse[key].message);
        }
        setError(errorArr);
      });
  }

  return (
    <div className='contanier p-5'>
      <div class="card shadow">
        <div class="card-header">
          <h1>Update Movie Details</h1>
        </div>
        <div className="card-body text-center">
          <form onSubmit={updateMovie}>
            <p className='d-flex gap-3'>
              <label htmlFor='update-title' className='fw-bold'>Update Title: </label><br />
              <input id='update-title' type="text" onChange={(e) => setNewTitle(e.target.value)} value={newTitle} />
            </p>
            <p className='d-flex gap-3'>
              <label htmlFor='update-releaseYear' className='fw-bold'>Update Price: </label><br />
              <input id='update-releaseYear' type="number" onChange={(e) => setNewReleaseYear(e.target.value)} value={newReleaseYear} />
            </p>
            <p className='d-flex gap-3'>
              <label htmlFor='update-imageUrl' className='fw-bold'>Update Description: </label><br />
              <input id='update-imageUrl' type="text" onChange={(e) => setNewImageUrl(e.target.value)} value={newImageUrl} />
            </p>
            <div className='d-flex gap-2'>
              <label htmlFor='imageUrl' className='fw-bold'>Description:</label><br />
              <textarea
                rows='5'
                cols='25'
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}>{newDescription}
                </textarea>
            </div>
            <div>
              <label htmlFor='update-favorite' className='fw-bold'>Favorite?</label>
              <input id='update-favorite' type='checkbox' checked={newFavorite} onChange={(e) => setNewFavorite(e.target.checked)} className='m-2' />
            </div>
            <div className='card-footer text-start'>
              <input type="submit" className='btn btn-success m-3' />
              <Link to='/' className='btn btn-primary'>Home Page</Link>
            </div>
          </form>
          {
            error.map((err, idx) => {
              return (
                <p className='text-danger' key={idx}>{err}</p>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default UpdateForm