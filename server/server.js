const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// connect to mongodb 
const mongoURI = 'mongodb://localhost/solo-project';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, '../client')));

/**
 * route handlers
 */
app.use('/api', apiRouter);

/**
 * route handler to serve routes via react-router ?
 */

/**
 * route handler for any requests to an unknown route
 */
app.use((req, res) => res.status(404).send('Page not found.'));

/**
 * global error handler
 */
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught an unknown middleware error.',
    status: 500,
    message: { err: 'An error occurred' },
  }
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.satus(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;