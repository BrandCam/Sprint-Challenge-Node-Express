const express = require("express");

const router = express.Router();

const projects = require("../data/helpers/projectModel");

//Create

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
//Update

//Destroy

module.exports = router;
