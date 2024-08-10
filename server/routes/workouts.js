const express = require('express')
const {
    getWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWokrout
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

// require auth before all other workouts
const router = express.Router(requireAuth)

// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', getSingleWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWokrout)


module.exports = router