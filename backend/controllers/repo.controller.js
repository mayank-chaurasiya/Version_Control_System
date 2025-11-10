const createRepository = (req, res) => {
  res.send("Repository created");
};

const getAllRepositories = (req, res) => {
  res.send("All Repository fetched");
};

const fetchRepositoryById = (req, res) => {
  res.send("Repository Details fetched");
};

const fetchRepositoryByName = (req, res) => {
  res.send("Repository Details fetched with name");
};

const fetchRepositoriesForCurrentUser = (req, res) => {
  res.send("Repository Details fetched for logged in user fetched");
};

const updateRepositoryById = (req, res) => {
  res.send("Repository updated");
};

const toggleVisibilityById = (req, res) => {
  res.send("Repository public / private");
};

const deleteRepositoryById = (req, res) => {
  res.send("Repository deleted");
};

module.exports = {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoriesForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
};
