import {createSlice} from '@reduxjs/toolkit' //! tạo trạng thái ban đầu của store
const userSlice = createSlice({ 
    name : 'todos',
    initialState : {
        user : {}
    },
    reducers : {
        login (state, action) {
            state.user = action.payload
        },
        logout (state, action) {
            state.user = {}
        }
    }
})
const userReducer = userSlice.reducer



export const userSelect = state => state.userReducer.user // todoReducer khác với trên

export const {login, logout} = userSlice.actions



export default userReducer