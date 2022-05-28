import { useEffect, useState } from "react"
import SkeletonUser from '../components/skeleton/skeletonUser'
const User = () => {

    const  [profile, setProfile] = useState(null)

    useEffect(() => {
        setTimeout( async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
            const data = await res.json()
            setProfile(data)
        }, 5000)
    })

    return (
        <div>
            <h2>User</h2>
            <SkeletonUser theme="dark"/>
            <SkeletonUser />
            {profile ? (
                <div className="profile">
                    <h3>{profile.username}</h3>
                    <p>{profile.email}</p>
                    <a href={profile.website}>{profile.website}</a>
                </div>
            ) : <span>loading......</span> } 
        </div>
    )
}


export default User