import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateForm = () => {
  //keep track of what is being typed via useState hook
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [favorite, setFavorite] = useState();
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  //handler when the form is submitted
  const submitHandler = e => {

    //prevent default behavior of the submit
    e.preventDefault();

    //make a post request to create a new product
    axios.post('http://localhost:8000/api/movies', {
      title,
      releaseYear,
      imageUrl,
      description,
      favorite,
    })
      .then(() => navigate('/'))
      .catch((err) => {
        const errorResponse = err.response.data.errors;
        const errorArr = [];

        for (const key in errorResponse) {
          errorArr.push(errorResponse[key].message);
        }
        setError(errorArr);
      });

  };
  return (
    <div className="container">
      <div className='card shadow'>
        <div className='card-header'>
          <h2>Create New Movie</h2>
        </div>
        <div className='card-body text-center'>
          <form className='form-control' onSubmit={submitHandler}>
            <p>
              <label htmlFor='title' className='fw-bold'>Movie Title:</label><br />
              <input id='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='m-2' />
            </p>
            <p>
              <label htmlFor='releaseYear' className='fw-bold'>Movie Release Year:</label><br />
              <input id='releaseYear' type='number' value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} className='m-2' />
            </p>
            <p>
              <label htmlFor='imageUrl' className='fw-bold'>Image Url:</label><br />
              <input id='imageUrl' type='text' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className='m-2' />
            </p>
            <div>
              <label htmlFor='imageUrl' className='fw-bold'>Description:</label><br />
              <textarea
                rows='5'
                cols='25'
                onChange={(e) => setDescription(e.target.value)}>{description}</textarea>
            </div>
            <p>
              <label htmlFor='favorite'>Favorite?</label>
              <input type='checkbox' checked={favorite} onChange={(e) => setFavorite(e.target.checked)} className='m-2' />
            </p>
            <button className='btn btn-success'>Create</button>
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

export default CreateForm