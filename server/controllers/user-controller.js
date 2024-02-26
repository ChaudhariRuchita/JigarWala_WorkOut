const { User } = require("../models");
const { signToken } = require("../utils/auth");

module.exports = {
  // Get a single user by id or username
  async getSingleUser({ user = null, params }, res) {
    try {
      const foundUser = await User.findOne({
        $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
      }).select("-__v")
        .populate("cardio")
        .populate("resistance");

      if (!foundUser) {
        return res.status(400).json({ message: 'Cannot find a user with this id!' });
      }

      res.json(foundUser);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Create a user, sign a token, and send it back to sign up page
  async createUser({ body }, res) {
    try {
      // Check if required fields are provided
      if (!body.username || !body.password || !body.email) {
        return res.status(400).json({ message: "Fields cannot be empty. Please provide username, password, and email." });
      }

      const user = await User.create(body);
      const token = signToken(user);
      res.json({ token, user });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.username) {
        return res.status(400).json({ message: "User already exists with this username." });
      } else if (error.code === 11000 && error.keyPattern.email) {
        return res.status(400).json({ message: "User already exists with this email." });
      } else {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  // Login a user, sign a token, and send it back to login page
  async login({ body }, res) {
    try {
      const user = await User.findOne({
        $or: [{ username: body.username }, { email: body.email }],
      });
      
      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }

      const correctPw = await user.isCorrectPassword(body.password);

      if (!correctPw) {
        return res.status(400).json({ message: "Wrong password!" });
      }
      
      const token = signToken(user);
      res.json({ token, user });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
