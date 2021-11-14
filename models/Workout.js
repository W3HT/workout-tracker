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
                
            },
            weigth: {
                type: Number,
                
            },
            reps: {
                type: Number,
                
            },
            sets: {
                type: Number,
                
            },
            distance: {
                type: Number,
                
            },
        }
    ]
})

const Workout = mongoose.model("workouts", WorkoutSchema);
module.exports = Workout;