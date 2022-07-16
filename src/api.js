const express = require('express');
require('express-async-errors');

const errorHandler = require('./middlewares/errorHandler');
const loginRoute = require('./routes/loginRoute');

const app = express();
app.use(express.json());
// require('dotenv').config();

// verificador de requisições, p/ acompanhar body e params;
// app.use((req, _res, next) => {
//   console.log('req.method:', req.method);
//   console.log('req.path:', req.path);
//   console.log('req.params:', req.params);
//   console.log('req.query:', req.query);
//   console.log('req.headers:', req.headers);
//   console.log('req.body:', req.body);
//   next();
// });

app.use('/login', loginRoute);
app.use('/user', loginRoute);

app.use(errorHandler);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
