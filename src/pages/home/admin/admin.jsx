import {Routes, Route} from 'react-router-dom'
import ManageMovie from './manageMovie'
import ManageUser from './manageUser'
import Navbar from '../../../components/Navbar/Navbar'
const Admin = () => {
    return(
        <>
            <Navbar/>
            <Routes>
                <Route path="manageMovie" element={<ManageMovie/>}/>
                <Route path="manageUser" element={<ManageUser/>}/>
            </Routes>
        </>
    )
}

export default Admin