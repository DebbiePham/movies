// 1 import the model
const Movie = require('../models/movie.model');

// Server Test:

module.exports.apiTest = (req, res) => {
    res.json({message: 'Server is working!'});
};

// 2 export all functions with placeholder

module.exports.findAllMovies = (req, res) => {
    Movie.find()
        .then((allMovies) => res.json( allMovies ))
        .catch((err) => res.status(400).json(err));
};

module.exports.findOneMovie = (req, res) => {
    Movie.findOne({ _id : req.params.id })
        .then((oneMovie) => res.json( oneMovie ))
        .catch((err) => res.status(400).json(err));
};

module.exports.createNewMovie = (req, res) => {
    Movie.create(req.body)
        .then((newMovie) => res.json(newMovie))
        .catch((err) => res.status(400).json(err));
}

module.exports.updateMovie = (req, res) => {
    Movie.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then((updatedMovie) => res.json(updatedMovie ))
        .catch((err) => res.status(400).json(err));
};

module.exports.deleteMovie = (req, res) => {
    Movie.deleteOne({ _id: req.params.id })
        .then((status) => res.json(status))
        .catch((err) => res.status(400).json(err));
};

// function to get a random movie
module.exports.getRandomMovie = (req, res) => {
    Movie.find()
    .then((allMovies) => {
        const moviesLength = allMovies.length;
        const randomIndex = Math.floor(Math.random() * moviesLength);
        const randomMovie = allMovies[randomIndex];
        res.json({ movie: randomMovie })
    })
    .catch((err) => {
        res.json(err)
    });
}