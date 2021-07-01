module.exports = (req, res, next) => {
  if (
    !req.session.user &&
    !(
      req.originalUrl.startsWith("/login") ||
      req.originalUrl.startsWith("/create-account")
    )
  )
    res.redirect("/login");
  else next();
};
