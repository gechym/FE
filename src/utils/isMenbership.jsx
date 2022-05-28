import {Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {userSelect} from '../store/reducer/userSlice'
import { toast} from 'react-toastify';

const IsMenbership =({ children }) => {
  const user = useSelector(userSelect)
  if(!user.membership){
    toast.info('Chứ năng dành Cho Menbershipr, Bạn hãy đăng ký để được sử dụng dịch vụ này')
    }
  return user.membership ? children : <Navigate to="/membership" />;
}

export default IsMenbership