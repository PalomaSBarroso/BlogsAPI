const express = require('express');
const router = require('./router');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/login', router.login);
app.use('/user', router.user);
app.use('/categories', router.category);
app.use('/post', router.post);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
