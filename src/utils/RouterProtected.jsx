import {Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {userSelect} from '../store/reducer/userSlice'
import { toast} from 'react-toastify';
import _ from 'lodash'

const PrivateRoute =({ children }) => {
  const user = useSelector(userSelect)
  if(_.isEmpty(user)){
    toast.error('Vui lòng đăng nhập để sử dụng tài nguyên này')
  }
  return !_.isEmpty(user) ? children : <Navigate to="/login" />;
}

export default PrivateRoute