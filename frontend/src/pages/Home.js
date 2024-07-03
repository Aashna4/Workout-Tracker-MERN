import { useEffect} from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext"

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutsForm from "../components/WorkoutsForm"

const Home = () => {
    // const [workouts, setWorkouts] = useState()

    const {workouts, dispatch} = useWorkoutContext()

    useEffect(() => {
        // to make the function async we define another function which can be called
        const fetchWorkouts = async() => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if (response.ok){
                // setWorkouts(json)
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }   

        fetchWorkouts()

    }, [dispatch]) //[] - makes sure that it will fire only once when the component renders

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>(
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutsForm />
        </div>
        
    )
}

export default Home