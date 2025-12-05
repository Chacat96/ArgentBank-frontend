import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

export const store = configureStore({
    // Enregistre tous les slices de l'application,'user' sera accessible dans les composants via useSelector((state) => state.user)
  reducer: {
    user: userReducer
  }
})