import './myList.scss'
import Navbar from '../../components/Navbar/Navbar'
import { useSelector } from 'react-redux'
import { userSelect } from '../../store/reducer/userSlice'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
const MyList = () => {
    const user = useSelector(userSelect) 
    const [list, setList] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/users/${user.id}`)
        .then((res) => {
            setList(res.data.user.list)
        }).catch((error) => {
            
        })
    },[user.id])
    return(
        <>
            <Navbar/>
            <div className="myList">
                <h1>My list</h1>
                <div className="list">
                    {
                        list.map(film => {
                            return(
                                <Link to={`/movie/${film.id}`}>
                                    <div className="item">
                                        <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt="" />
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                <br />
                <h1>Vừa Xem Vừa Học</h1>
                <div className="list">
                    {
                        list.map(film => {
                            return(
                                <Link to={`/watchLearn/${film.id}`}>
                                    <div className="item">
                                        <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt="" />
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}


export default MyList