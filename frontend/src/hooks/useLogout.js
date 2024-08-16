import { useAuthContext } from "./useAuthContext"
import { useWorkoutContext } from "./useWorkoutContext"

export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: workoutdispatch } = useWorkoutContext()

    const logout = () => {
        // remove useer from storage 
        localStorage.removeItem('user')

        // call the dispatch function to update the global context 
        dispatch({type: 'LOGOUT'})
        workoutdispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return {logout}
}