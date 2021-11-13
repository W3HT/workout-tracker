const router = require("express").Router();
const Workouts = require("../../models/Workout");
const mongojs = require("mongojs");

// gest - last
router.get("/", (req, res) => {
  Workouts.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercies.duration",
        },
      },
    },
  ])
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

// post - new workout
router.post("/", (req, res) => {
  Workouts.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});
// gets - combined weight / total duration - limit 7 - aggregate
router.get("/", (req, res) => {
  Workouts.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercies.duration",
        },
      },
    },
  ])
    .limit(7)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

// put - new exercise - /:id
router.put("/:id", (req, res) => {
    console.log(req.params.id)
    Workouts.updateOne({
    _id: mongojs.ObjectId(req.params.id),
  });
  if (err) {
    res.send(err);
  } else {
    res.send(data);
  }
});

module.exports = router;
