const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// parse application/json
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.static('public'));


// Import routes and give the server access to them.
const loginRoutes = require("./routes/login-routes.js");
const stress_scores_routes = require('./routes/stress_scores_routes.js')
app.use(loginRoutes);
app.use(stress_scores_routes)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
// Define any API routes before this runs
})

  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });

