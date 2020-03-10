const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");

// Constants
const PORT = process.env.PORT || 3000;

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Passport JWT
app.use(passport.initialize());
require("./config/passport")(passport);

// Global middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files
app.use("/public", express.static(path.resolve(__dirname, "./client/public")));

// Route handlers
const index = require("./routes/index");
const authRouter = require("./routes/auth");
const apiRouter = require('./routes/api');

// Routes
app.use("/", index);
app.use("/auth", authRouter);
app.use("/api", apiRouter);

// Serve main entry point for all unknown route requests
app.get('/*', function(req, res) {
  res.render(path.join(__dirname, 'views', 'index.ejs'));
});

// Global Error Handler:
app.use(  (err, req, res, next) => {
  console.log('Global error handler: ', err.stack);
  res.status(500).send('Oops, there was a server  error');
});

// Bootstrap server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
