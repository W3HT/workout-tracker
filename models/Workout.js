const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({

    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: true,
            },
            name: {
                type: String,
                trim: true,
                required: true,
            },
            duration: {
                type: Number,
                required: true,
            },
            weigth: {
                type: Number,
                required: true,
            },
            reps: {
                type: Number,
                required: true,
            },
            sets: {
                type: Number,
                required: true,
            },
            distance: {
                type: Number,
                required: false,
            },
        }
    ]
})

const Workout = mongoose.model("workouts", WorkoutSchema);
module.exports = Workout;