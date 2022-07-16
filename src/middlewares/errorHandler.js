const errorHandler = (error, _req, res, _next) => {
  switch (error.name) {
    case 'missingField':
      res.status(400).json({ message: error.message });
      break;
    case 'invalidField':
      res.status(400).json({ message: error.message });
      break;
    case 'invalidToken':
      res.status(401).json({ message: error.message });
      break;
    case 'tokenNotFound':
      res.status(401).json({ message: error.message });
      break;
      // case 'invalidId':
      //   res.status(401).json({ message: error.message });
      //   break;
    default:
      res.status(500).json({ message: error.message });
  }
};

module.exports = errorHandler;
