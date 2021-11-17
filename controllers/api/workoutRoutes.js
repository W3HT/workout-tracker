const router = require("express").Router();
const Workouts = require("../../models/Workout");
const mongojs = require("mongojs");


// gest - last - aggregate $sum
router.get("/", (req, res) => {
  Workouts.aggregate([
    {
      $addFields: {
        totalDuration: {$sum: "$exercises.duration"},
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
          $sum: "$exercises.duration"
        },
      },
    },
  ])
    .limit(7)
    .then((data) => {
      console.log(data)
    res.json(data)
  })
    .catch((err) => res.status(400).json(err));
})

// put - new exercise - /:id
router.put("/:id", (req, res) => {
  console.log(req.body)
    Workouts.findOneAndUpdate(
        {_id: req.params.id}, 
        { $push: {exercises: req.body}}, 
        {new: true})
    .then((data) => {
      console.log(data)
      res.json(data)
    })
    .catch((err) => res.status(400).json(err))
})

module.exports = router;
