const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/fit-track", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, err => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB!');
  }
});

module.exports = mongoose.connection;
