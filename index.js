const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = require('./router');
const config = require('./config');
const db = require('./model');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:3000', 'ec2-18-223-184-157.us-east-2.compute.amazonaws.com'],
  credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Custom middleware
app.use(async (req, res, next) => {
  res.db = db;
  res.endWithMessage = (statusCode, message) => {
    res.status(statusCode).end(message);
  };
  next();
});

app.use(session(config.session));

app.use('/', router);

app.listen(PORT, () => {
  console.log(`app started listening from PORT ${PORT}`);
});
