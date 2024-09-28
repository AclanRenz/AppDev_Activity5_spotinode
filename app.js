// Import required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize the Express app
const app = express();

// Set the port number
const port = process.env.PORT || 3000;

// Set up view engine (if you're using one like EJS or Pug)
app.set('view engine', 'ejs'); // Or 'pug', 'hbs' etc.
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define routes
const homeRouter = require('./routes/home'); // Example route
const playlistRouter = require('./routes/playlist'); // For playlist

app.use('/', homeRouter);
app.use('/playlist', playlistRouter);

// Error handling middleware
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render('error', { error }); // Render an error page
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
