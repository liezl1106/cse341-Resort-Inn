const ensureAuthenticated = (req, res, next) => {
<<<<<<< HEAD
   if (req.session.user === undefined) {
      return res.status(401).json('You do not have access');
    }
    next();
=======
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/github');
>>>>>>> 2a65e62536e3077c9f5e8da29e2bb28b6ddc0862
};

module.exports = ensureAuthenticated;