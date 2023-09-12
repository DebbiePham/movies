// 1 import dependencies
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

// 2 configure express
require('./config/mongoose.config');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3 routes
require('./routes/movie.routes')(app);

// 4 Listen to Port
app.listen(port, () => console.log(`Listening on port: ${port}`) );
