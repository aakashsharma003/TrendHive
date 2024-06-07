const { User } = require("../models/schema");
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user profile" });
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.remove();

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user account" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
};
