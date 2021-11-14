const router = require("express").Router();
const Workouts = require("../../models/Workout");
const mongojs = require("mongojs");


// gest - last - aggregate $sum
router.get("/", (req, res) => {
  Workouts.aggregate([
    {
      $addFields: {
        totalDuration: {$sum: "$exercies.duration"},
      },
    },
  ])
  .then((data) => res.json(data))
  .catch((err) => res.status(400).json(err))
});

// post - new workout
router.post("/", (req, res) => {
  Workouts.create(req.body)
  .then((data) => res.json(data))
  .catch((err) => res.status(400).json(err))
});
// gets - combined weight / total duration - limit 7 - aggregate $sum
router.get("/range", (req, res) => {
  Workouts.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercies.duration"
        },
      },
    },
  ])
    .limit(7)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
})

// put - new exercise - /:id
router.put("/:id", (req, res) => {
    Workouts.findOneAndUpdate(
        {_id: req.params.id}, 
        { $set: {exercies: req.body}}, 
        {new: true})
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err))
})

module.exports = router;
