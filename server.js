require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const mongodb = require('./data/connect');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

// app.get('/', (req, res) => {
//   res.send('Hello');
// });

app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();
// });
app.use(cors());
app.use('/', require('./routes/clientRoutes'));

// GitHub OAuth routes
app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


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