import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
 name: 'notification',
 initialState: initialState,
 reducers: {
  setNotification(state,action) {
    return action.payload
  },
  removeNotification() {
    return initialState
  }
 }
})

export const { setNotification,removeNotification } = notificationSlice.actions

export default notificationSlice.reducer