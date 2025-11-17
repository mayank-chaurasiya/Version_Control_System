const mongoose = require("mongoose");
const Repository = require("../models/repo.model.js");
const User = require("../models/user.model.js");

async function createRepository(req, res) {
  const { owner, name, issues, content, description, visibility } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: "Repository Name is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Repository Owner is required" });
    }

    const newRepository = new Repository({
      name,
      description,
      // ensure visibility is boolean
      visibility: visibility === true || visibility === "true",
      owner,
      content,
      issues,
    });

    const result = await newRepository.save();

    // push repository id into user's repositories array and return updated user
    const updatedUser = await User.findByIdAndUpdate(
      owner,
      { $push: { repositories: result._id } },
      { new: true }
    );

    if (!updatedUser) {
      console.warn(`Repository created but owner ${owner} not found to update repositories array`);
    }

    res.status(201).json({
      message: "Repository created",
      repositoryID: result._id,
      repositoryName: result.name,
      ownerUpdated: !!updatedUser,
    });
  } catch (error) {
    console.error("Error creating Repository : ", error.message);
    res.status(500).send("Server error");
  }
}

async function getAllRepositories(req, res) {
  try {
    const repositories = await Repository.find({})
      .populate("owner")
      .populate("issues");

    res.json(repositories);
  } catch (error) {
    console.error("Error fetching Repository List: ", error.message);
    res.status(500).send("Server error");
  }
}

async function fetchRepositoryById(req, res) {
  const { id } = req.params;
  try {
    const repository = await Repository.find({ _id: id })
      .populate("owner")
      .populate("issues");

    if (!repository) {
      res.status(400).json({ message: "No repository found !!" });
    }

    res.json(repository);
  } catch (error) {
    console.error("Error fetching Repository by ID : ", error.message);
    res.status(500).send("Server error");
  }
}

async function fetchRepositoryByName(req, res) {
  const { name } = req.params;
  try {
    const repository = await Repository.find({ name: name })
      .populate("owner")
      .populate("issues");

    if (!repository) {
      res.status(400).json({ message: "No match results !!" });
    }

    res.json(repository);
  } catch (error) {
    console.error("Error fetching Repository by ID : ", error.message);
    res.status(500).send("Server error");
  }
}

async function fetchRepositoriesForCurrentUser(req, res) {
  // Support two ways of specifying the user:
  // - authenticated requests with `req.user` set by auth middleware
  // - direct requests with `:userID` route param (frontend usage)
  const userID = req.user || req.params.userID;

  try {
    if (!userID) {
      return res.status(400).json({ error: "user id is required" });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ error: "invalid user id" });
    }

    const repositories = await Repository.find({ owner: userID }).populate("owner");

    // return empty array (200) if user has no repositories
    if (!repositories || repositories.length === 0) {
      return res.json({ message: "No repositories found for user", repositories: [] });
    }

    res.json({ message: "Repositories Found!!", repositories });
  } catch (error) {
    console.error("Error fetching user's repositories : ", error.message);
    res.status(500).send("Server error");
  }
}

async function updateRepositoryById(req, res) {
  const { id } = req.params;
  const { content, description } = req.body;
  try {
    const repository = await Repository.findById(id);

    if (!repository) {
      return res.status(404).json({ error: "Repository not found!!" });
    }

    repository.content.push(content);
    repository.description = description;

    const updatedRepository = await repository.save();

    res.json({
      message: "Repository updated successfully!!",
      repository: updatedRepository,
    });
  } catch (error) {
    console.error("Error updating repository : ", error.message);
    res.status(500).send("Server error");
  }
}

async function toggleVisibilityById(req, res) {
  const { id } = req.params;

  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ error: "Repository not found!!" });
    }

    repository.visibility = !repository.visibility;

    const updatedRepository = await repository.save();

    res.json({
      message: "Visibility toggled successfully!!",
      repository: updatedRepository,
    });
  } catch (error) {
    console.error("Error toggling visibility of repository : ", error.message);
    res.status(500).send("Server error");
  }
}

async function deleteRepositoryById(req, res) {
  const { id } = req.params;
  try {
    const deleteRepo = await Repository.findByIdAndDelete(id);

    if (!deleteRepo) {
      return res
        .status(404)
        .json({ message: "Repository not found or error deleting" });
    }

    res.json({
      message: "Repository Deleted!!",
      deletedRepoName: deleteRepo.name,
    });
  } catch (error) {
    console.error("Error Deleting repository : ", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

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
