const Issue = require("../models/issue.model.js");

async function createIssue(req, res) {
  const { title, description } = req.body;
  const { id } = req.params;
  try {
    const issue = new Issue({
      title,
      description,
      repository: id,
    });

    await issue.save();

    res.status(201).json(issue);
  } catch (error) {
    console.error("Error creating Issue : ", error.message);
    res.status(500).send("Server error");
  }
}

async function updateIssueById(req, res) {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ error: "Issue not found!!" });
    }
    issue.title = title;
    issue.description = description;
    issue.status = status;

    const updatedIssue = await issue.save();

    res.json({
      message: "Issue Updated successfully",
      issue: updatedIssue,
    });
  } catch (error) {
    console.error("Error updating issue : ", error.message);
    res.status(500).send("Server error");
  }
}

async function getAllIssues(req, res) {
  const { id } = req.params;
  try {
    const issues = await Issue.find({ repository: id });

    if (!issues) {
      res.status(400).json({ message: "No Issues found !!" });
    }

    res.json(issues);
  } catch (error) {
    console.error("Error fetching Issue List: ", error.message);
    res.status(500).send("Server error");
  }
}

async function getIssueById(req, res) {
  const { id } = req.params;
  try {
    const issue = await Issue.findById(id);
    if (!issue) {
      res.status(400).json({ message: "No Issue found !!" });
    }

    res.json(issue);
  } catch (error) {
    console.error("Error fetching Issue by ID : ", error.message);
    res.status(500).send("Server error");
  }
}

async function deleteIssueById(req, res) {
  const { id } = req.params;
  try {
    const deleteIssue = await Issue.findByIdAndDelete(id);

    if (!deleteIssue) {
      return res
        .status(404)
        .json({ message: "Issue not found or error deleting" });
    }

    res.json({
      message: "Issue Deleted",
      deletedIssueTitle: deleteIssue.title,
    });
  } catch (error) {
    console.error("Error Deleting Issue : ", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssues,
  getIssueById,
};
