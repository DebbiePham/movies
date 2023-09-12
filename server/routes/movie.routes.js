const MovieController = require('../controllers/movie.controller');


module.exports = function(app){
    app.get('/api/movies', MovieController.findAllMovies);
    app.get('/api/movies/:id', MovieController.findOneMovie);
    app.post('/api/movies', MovieController.createNewMovie);
    app.patch('/api/movies/:id', MovieController.updateMovie);
    app.delete('/api/movies/:id', MovieController.deleteMovie);
    app.get('/api/movie/random', MovieController.getRandomMovie);
}



