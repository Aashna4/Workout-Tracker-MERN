import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {

    const { dispatch } = useAuthContext()

    const logout = () => {
        // remove useer from storage 
        localStorage.removeItem('user')

        // call the dispatch function to update the global context 
        dispatch({type: 'LOGOUT'})

    }

    return {logout}
}