const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware.js');
const connectDB = require('./config/db.js');
const port = process.env.PORT || 5001;

// Set up
connectDB();
const app = express();

// JSON-formatted responses
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// CORS
app.use(cors());

// Serve client
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

// Error middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
