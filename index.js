const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const applyRoutes = require('./routes');

require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })
console.log("ENV `.env.${process.env.NODE_ENV}`", `.env.${process.env.NODE_ENV}`)

app.use(cors());
app.use(bodyParser.json({
  limit: '10mb'
}));
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true
}));
applyRoutes(app)
/**
 *
 * @description This function is used as a global exceptional handling
 */
app.use(function (err, req, res, next) {
  console.error(err);
  var error = {
    status: false,
    status_code: 500,
    message:
      "Something bad happened. Please contact system administrator or try again",
  };
  res.send(error);
});

/**
 * @description This is the health check API.
 */
app.get('/api/health-check', (req, res) => {
  res.json(`Yes, I am alive!`);
});


// Create a service (the app object is just a callback).
// Create an HTTP service.
http.createServer(app).listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
