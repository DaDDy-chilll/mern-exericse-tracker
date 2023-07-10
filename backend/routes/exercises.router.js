const exerciseRouter = require("express").Router();
let Exercise = require("../models/exercise.model");

exerciseRouter.route("/").get((req, res) => {
  Exercise.find()
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json(err));
});

exerciseRouter.route("/add").post((req, res) => {
  const { username, description, duration, date } = req.body;
  const createExercise = {
    username,
    description,
    duration: Number(duration),
    date: Date.parse(date),
  };
  const newExercise = new Exercise(createExercise);

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json(err));
});

exerciseRouter.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      res.json(exercise);
    })
    .catch((err) => res.status(400).json(err));
});

exerciseRouter.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then((_) => {
      res.json("Exercise deleted");
    })
    .catch((err) => res.status(400).json(err));
});
exerciseRouter.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then((_) => res.json("Exercise updated!"))
        .then((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = exerciseRouter;
