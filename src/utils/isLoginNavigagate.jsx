import {Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {userSelect} from '../store/reducer/userSlice'
import _ from 'lodash'

const IsLoginNavigagate =({ children }) => {
    const user = useSelector(userSelect)
    
    if(!_.isEmpty(user)){
        return <Navigate to="/home" />
    }
    
    return children
}

export default IsLoginNavigagate