const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: "Username is Required",
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    minlength: 6,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true, // Ensure email is stored in lowercase
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  cardio: [{
    type: Schema.Types.ObjectId,
    ref: "Cardio"
  }],
  resistance: [{
    type: Schema.Types.ObjectId,
    ref: "Resistance"
  }]
});

// Hash user password before saving
UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Custom method to compare and validate password for logging in
UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", UserSchema);

module.exports = User;
