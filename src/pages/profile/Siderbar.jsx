import React from 'react'
import { Link } from 'react-router-dom'
import './Siderbar.scss'
import {PermIdentity, PlaylistPlay, Search} from '@material-ui/icons'

const Siderbar = () => {
    return (
        <div className="sidebar">
            <Link to='/'>
                <img src="http://localhost:3000/static/media/logo.4a9d8652.png" alt="" />
            </Link>
            <h3>Menu</h3>
            <ul>
                <li>
                    <PermIdentity/>
                    <Link to="/profile">  Profile </Link> 
                </li>
                <li>
                    <PlaylistPlay/>
                    <Link to="/profile/myList"> MyList </Link> 
                </li>
                <li>
                    <Search/>
                    <Link to="/profile/search"> Search </Link> 
                </li>
            </ul>
        </div>
    )
}

export default Siderbar
