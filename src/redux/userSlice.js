import { createSlice } from '@reduxjs/toolkit'

//Etat initial de l'utilisateur
const initialState = {
  user: null,
  token: null,
  isLoggedIn: false
}

// Création du slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isLoggedIn = false
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
  }
})
//Export des actions pour pouvoir les utiliser dans les composants
export const { loginSuccess, logout, updateUser } = userSlice.actions

//Export du reducer pour l'utiliser dans le store
export default userSlice.reducer
