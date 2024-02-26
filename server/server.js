const express = require("express");
const path = require("path");
const routes = require("./routes");
const db = require("./config/connection");
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use(routes);

// Error handler middleware
app.use((err, req, res, next) => {
  if (err.name === 'MongoServerError' && err.code === 11000) {
    // Handle duplicate key error
    const duplicatedField = Object.keys(err.keyValue)[0]; // Get the field causing the duplicate key error
    const errorMessage = `${duplicatedField} already exists.`;
    res.status(400).json({ message: errorMessage });
  } else {
    // For other errors, forward to default Express error handler
    next(err);
  }
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
