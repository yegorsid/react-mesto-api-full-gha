const allowedCors = [
  'https://skavr.nomoredomains.rocks',
  'http://skavr.nomoredomains.rocks',
  'localhost:3000',
  'https://api.skavr.nomoredomains.rocks',
  'http://api.skavr.nomoredomains.rocks',
  'https://api.nomoreparties.co',
  'http://api.nomoreparties.co',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Origin', origin);
    return res.end();
  }

  return next();
};
