import { Link } from 'react-router-dom';
import React from 'react';

const MovieList = (props) => {
    const {deleteHandler, movieList} = props;


    return (
        <div className="container">
            <div className='card shadow'>
                {movieList.map((movie, idx) => {
                    return (
                        <div className='card-body' key={movie._id}>
                            <h4>Movie Title: {movie.title} {movie.favorite? '💖' : '🤍'}</h4>
                            <p>Release Year: {movie.releaseYear}</p>
                            <img
                                style={{ width: "350px" }}
                                src={movie.imageUrl}
                                alt={movie.title}
                            />
                            <div>
                                <Link to={`/movies/${movie._id}/edit`} className='btn btn-warning m-3'>Edit</Link>
                                <Link to={`/movies/${movie._id}`} className='btn btn-primary m-3'>View</Link>
                                <button onClick={() => deleteHandler(movie._id, movie.title)} className='btn btn-danger m-3'>Delete</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MovieList