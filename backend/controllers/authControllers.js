const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/schema");

const signInController = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return token and user details
    res
      .status(200)
      .json({ token, user, message: "User loggedin Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const signupController = async (req, res) => {
  // console.log(req.headers);
  const { name, email, password, phoneNo, address } = req.headers;
  try {
    // Checking if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Creating a new user with hashed password
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone_number: phoneNo,
      address,
    });
    await newUser.save();

    // Generating JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .json({ token, user: newUser, message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signInController, signupController };
