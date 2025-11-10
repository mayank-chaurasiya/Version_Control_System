const getAllUsers = (req, res) => {
  res.send("all users fetched!!");
};

const getUserProfile = (req, res) => {
  res.send("Profile fetched");
};
const updateUserProfile = (req, res) => {
  res.send("Profile updated");
};
const deleteUserProfile = (req, res) => {
  res.send("Profile deleted");
};

module.exports = {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
