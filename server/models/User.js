const mongoose = require ("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')){   
        return next(); // skip if unchanged
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to verify at login time
userSchema.methods.matchPassword = async function(entered) {
    return await bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("User", userSchema);