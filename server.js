const express = require('express');
const mongodb = require('./data/connect');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', require('./routes/clientRoutes'));


// Error handling middleware for other errors
app.use((err, req, res, next) => {
  console.log(err.message);
  return res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
  });
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => console.log(`Database is listening and noder running on port ${port}`));
  }
});