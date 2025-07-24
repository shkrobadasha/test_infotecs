import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen: false,
    selectedUser: null,
}

const modalWindowReducer = createSlice({
    name:'modalWindow',
    initialState,
    reducers:{
        setOpenWindow:(state, {payload}) => {
            state.isOpen = payload
        },
        setSelectedUser:(state, {payload}) => {
            state.selectedUser = payload
        }
    }
})

export const {setOpenWindow, setSelectedUser} = modalWindowReducer.actions
export default modalWindowReducer.reducer
