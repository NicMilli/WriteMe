require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');
const router = require('./Routers');
const db = require('./db');

db();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(compression());

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.use('/api/writeme', router.form);
app.use('/api/badges', router.badges);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
