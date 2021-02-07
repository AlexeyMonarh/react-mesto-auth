const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const router = require('./routes');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '60101925a3d0e07c95f46cf1',
  };

  next();
});
app.use('/', router);

app.listen(PORT, () => {
});
