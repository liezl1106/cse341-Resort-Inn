// const ensureAuthenticated = (req, res, next) => {
//     if (req.session.user === undefined){
//       return res.status(401).json("You do not have access.");
//   }
//   next();
// };


// module.exports = ensureAuthenticated;

const ensureAuthenticated = (req, res, next) => {
  // Check for session authentication
  if (req.session && req.session.user) {
    return next();
  }

  // Check for Bearer token in header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    // Verify GitHub token here
    if (token) {
      // You might want to verify the token with GitHub
      return next();
    }
  }

  return res.status(401).json("You do not have access.");
};

module.exports = ensureAuthenticated;