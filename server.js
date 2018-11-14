const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());



app.use(express.static('public'));


// Import routes and give the server access to them.
const routes = require("./routes/login-routes.js");
app.use(routes);


  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });

