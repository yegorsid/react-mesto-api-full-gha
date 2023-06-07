const allowedCors = [
  'https://skavr.nomoredomains.rocks',
  'http://skavr.nomoredomains.rocks',
  'localhost:3000',
  'https://api.skavr.nomoredomains.rocks',
  'http://api.skavr.nomoredomains.rocks',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};
