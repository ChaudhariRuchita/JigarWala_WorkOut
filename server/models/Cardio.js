
const { Schema, model } = require("mongoose");

const CardioSchema = new Schema(
  {
    type: {
      type: String,
      default: "cardio",
      required: true
    },
    name: {
      type: String,
      required: true,
      maxlength: 30
    },
    distance: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          // Ensure the date is not in the past
          return value >= new Date();
        },
        message: "Date cannot be in the past"
      }
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }
);

const Cardio = model("Cardio", CardioSchema);

module.exports = Cardio;
