const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Constants
const PORT = process.env.PORT || 3000;

// Global middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files
app.use('/assets', express.static(path.resolve(__dirname, './client/public')));

// Route handlers
const authRouter = require('./routes/auth');

// Routes
app.use('/auth', authRouter);

// Bootstrap server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
