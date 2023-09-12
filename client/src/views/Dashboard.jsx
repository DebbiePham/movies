import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';


const Dashboard = () => {
    const [movieList, setMovieList] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const deleteHandler = (id, title) => {

        if (window.confirm(`Are you sure you want to remove \n${title} movie?`)) {
            axios
            .delete(`http://localhost:8000/api/movies/${id}`)
            .then(() => {
                setLoaded(!loaded)})
            .catch((err) => console.log(err))
        }
        
    };

    const fetchMovies = () => {
        axios
            .get("http://localhost:8000/api/movies")
            .then((res) => {
                setMovieList(res.data);
                setLoaded(!loaded);
            })
            .catch((err) => console.error(err));
    };

    useEffect(fetchMovies, [loaded]); // Pass an empty dependency array to run the effect one 


    return (
        <div className='container'>
            <MovieList 
                movieList={movieList} 
                deleteHandler={deleteHandler} 
            />
        </div>
    );
};

export default Dashboard;