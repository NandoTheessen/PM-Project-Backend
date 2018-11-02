module.exports = {
  flagRequest(req, res, next) {
    req.admin = true;
    next();
  }
}