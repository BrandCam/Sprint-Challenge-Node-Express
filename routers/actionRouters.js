const express = require("express");

const router = express.Router();

const actions = require("../data/helpers/actionModel");
const projects = require("../data/helpers/projectModel");
// Create
router.post("/", (req, res) => {
  const action = req.body;
  projects
    .get(action.project_id)
    .then(() => {
      if (action.description.length < 129) {
        if (action.description && action.notes) {
          actions
            .insert(action)
            .then(() => {
              res.status(200);
              res.json({ message: "Action was successfully added!" });
            })
            .catch(() => {
              res.status(400);
              res.json({ message: "Could not add the action." });
            });
        } else {
          res.status(400);
          res.json({
            message:
              "Please make sure your action has an appropriate description or notes"
          });
        }
      } else {
        res.status(400);
        res.json({
          message:
            "Please make sure your action description is less than 128 characters."
        });
      }
    })
    .catch(() => {
      res.status(404);
      res.json({
        message: "The project you're trying to add actions to does not exist."
      });
    });
});
//Read

router.get("/", (req, res) => {
  actions
    .get()
    .then(actions => {
      res.status(200);
      res.json(actions);
    })
    .catch(() => {
      res.status(500);
      res.json({ message: "Actions could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  actions
    .get(id)
    .then(action => {
      res.status(200);
      res.json(action);
    })
    .catch(err => {
      res.status(500);
      res.json({
        message:
          "The action associated with the requested ID couldn't be retrieved"
      });
    });
});

//Update

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const action = req.body;
  if (action.description && action.notes) {
    if (action.description.length < 129) {
      actions
        .update(id, action)
        .then(() => {
          res.status(200);
          res.json({ message: "Action updated" });
        })
        .catch(() => {
          res.status(404).json({
            message: "The action with the specified ID does not exist"
          });
        });
    } else {
      res.status(400);
      res.json({
        message: "Description length must be less than 128 characters."
      });
    }
  } else {
    res.status(400);
    res.json({
      message: "Please enter a description and notes to update the action"
    });
  }
});

//Destroy
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  actions
    .remove(id)
    .then(action => {
      if (action) {
        res.status(200);
        res.json({ message: "Action deleted" });
      } else {
        res.status(404);
        res.json({ message: "Action with specified ID not found" });
      }
    })
    .catch(() => {
      res.status(500);
      res.json({ message: "Action could not be removed" });
    });
});
module.exports = router;
