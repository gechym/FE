import { configureStore } from '@reduxjs/toolkit' //! tạo store 
import userReducer from './reducer/userSlice'


// Store
const store = configureStore({
    reducer : {
        userReducer : userReducer
    }
})




export default store