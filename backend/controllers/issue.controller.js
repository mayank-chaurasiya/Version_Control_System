const createIssue = (req, res) => {
  res.send("Issue Create!!");
};

const updateIssueById = (req, res) => {
  res.send("Issue update!!");
};

const getAllIssues = (req, res) => {
  res.send("Issue fetched!!");
};

const getIssueById = (req, res) => {
  res.send("Issue fetched by id!!");
};

const deleteIssueById = (req, res) => {
  res.send("Issue deleted!!");
};

module.exports = {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssues,
  getIssueById,
};
