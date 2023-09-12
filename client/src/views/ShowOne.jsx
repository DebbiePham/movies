import React, {useEffect, useState} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShowOne = () => {

  const [movie, setMovie] = useState({});
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));
  }, []);


  const deleteMovie = (id) => {
    axios
        .delete(`http://localhost:8000/api/movies/${id}`)
        .then(() => navigate('/'))
        .catch((err) => console.log(err));
  };

  
  return (
    <div className='container p-5'>
            <div class="card shadow">
                <div className='card-header'>
                    <h1>Movie Details</h1>
                </div>
                <div className="card-body">
                    <h3>{movie.title} {movie.favorite? '💖' : '🤍'}</h3> 
                    <p>released in {movie.releaseYear}</p>
                    <img 
                            style={{ width: "350px" }}
                            src={movie.imageUrl}
                            alt={movie.title}
                        />
                    <p>{movie.description}</p>
                </div>
                <div className='card-footer text-start'>
                    <Link to ={"/"} className='btn btn-success m-2'> Back Home </Link>
                    <Link to={`/movies/${movie._id}/edit`} className='btn btn-warning m-2'>Edit</Link>
                    <button className='btn btn-danger m-2' onClick={() => deleteMovie(movie._id)}>Delete</button>
                </div>
            </div>
        </div>
  );
};

export default ShowOne