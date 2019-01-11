const express = require("express");

const router = express.Router();

const projects = require("../data/helpers/projectModel");

//Create

router.post("/", (req, res) => {
  const project = req.body;
  if (project.name && project.description) {
    if (project.name.length < 129) {
      projects
        .insert(project)
        .then(projectInfo => {
          res.status(200);
          res.json({ projectInfo });
        })
        .catch(() => {
          res.status(500);
          res.json({ message: "Failed to add project" });
        });
    } else {
      res.status(400);
      res.json({
        message: "Project name can not be longer than 128 characters"
      });
    }
  } else {
    res.status(400);
    res.json({
      message: "Please make sure your project has a name and description"
    });
  }
});
//Read

router.get("/", (req, res) => {
  projects
    .get()
    .then(project => {
      res.status(200);
      res.json(project);
    })
    .catch(() => {
      res.status(500);
      res.json({ message: "Projects could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  projects
    .get(id)
    .then(project => {
      res.status(200);
      res.json(project);
    })
    .catch(() => {
      res.status(500);
      res.json({ message: "Projects could not be retrieved." });
    });
});

router.get("/:id/actions", (req, res) => {
  const { id } = req.params;
  projects
    .getProjectActions(id)
    .then(project => {
      if (project) {
        res.json(project);
      } else {
        res.status(404);
        res.json({ message: "No actions are associated with this project" });
      }
    })
    .catch(() => {
      res.status(500);
      res.json({ message: "Actions info could not be retrieved" });
    });
});

//Update

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const project = req.body;
  if (project.name && project.description) {
    if (project.name.length < 129) {
      projects
        .update(id, project)
        .then(updatedProject => {
          res.status(200);
          res.json(updatedProject);
        })
        .catch(() => {
          res.status(500).json({ message: "The project could not be updated" });
        });
    } else {
      res.status(400);
      res.json({
        message: "The project name can not be longer than 128 characters"
      });
    }
  } else {
    res.status(400);
    res.json({
      message:
        "Please provide either a new name or description to update the project."
    });
  }
});

//Destroy
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  projects
    .remove(id)
    .then(count => {
      if (count) {
        res.status(200);
        res.json({ message: "Project was deleted" });
      } else {
        res.status(404);
        res.json({ message: "Project not found" });
      }
    })
    .catch(() => {
      res.status(500);
      res.json({ message: "Project could not be removed" });
    });
});
module.exports = router;
