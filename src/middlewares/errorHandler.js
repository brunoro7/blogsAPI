const errors = {
  invalidField: 400,
  missingField: 400,
  nameLength: 400,
  nameIsRequired: 400,
  passLength: 400,
  invalidId: 401,
  invalidToken: 401,
  tokenNotFound: 401,
  unknownCategory: 404,
  unknownUser: 404,
  duplicatedEmail: 409,
};

const errorHandler = ({ name, message }, _req, res, _next) => {
  const status = errors[name];

  if (!status) return res.status(500).json({ message });

  return res.status(status).json({ message });
};

module.exports = errorHandler;

// foi refatorado por causa do tamanho;
// const errorHandler = (error, _req, res, _next) => {
//   switch (error.name) {
//     case 'missingField':
//       res.status(400).json({ message: error.message });
//       break;
//     case 'invalidField':
//       res.status(400).json({ message: error.message });
//       break;
//     case 'invalidToken':
//       res.status(401).json({ message: error.message });
//       break;
//     case 'tokenNotFound':
//       res.status(401).json({ message: error.message });
//       break;
//       case 'invalidId':
//         res.status(401).json({ message: error.message });
//         break;
//     default:
//       res.status(500).json({ message: error.message });
//   }
// };
