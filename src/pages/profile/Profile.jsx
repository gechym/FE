import React from 'react'
import {Route, Routes} from 'react-router-dom'



import './Profile.scss'
import Siderbar from './Siderbar'
import Me from './tag/Me'
import MyList from '../myList/myList'
import Search from '../search/search'

const Profile = () => {
    return (
        <>
            <Siderbar/>
            <div className="profileUser">
                <Routes>
                    <Route index element={<Me/>}/>
                    <Route path="myList" element={<MyList/>}/>
                    <Route path="search" element={<Search/>}/>
                </Routes>
            </div>
        </>
    )
}

export default Profile
