// Define a DB structure with our models. Like an ERD in MySQL

//! 1 import Mongoose
const mongoose = require("mongoose");

//? 2 Define the schema with keys + validations
const MovieSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [2, 'Title must has at least 2 characters'],
    },
    releaseYear: {
        type: Number,
        required: [true, 'Movie must have a release year'],
        min: [1900, 'Release year must be after 1900'],
    },
    imageUrl: {
        type: String,
    },
    description:{
        type:String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description must has at least 10 characters'],
    },
    favorite: {
        type: Boolean,
        default: false
    },
}, {timestamps:true});

//* 3 Create a model with the schema and export
const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;