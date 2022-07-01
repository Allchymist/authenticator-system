const express = require('express');
require('dotenv/config');

const routes = require('./routes/index');
require('./database/index').Connect();

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, async () => console.log(`Server iniciado na porta: ${process.env.PORT}`));