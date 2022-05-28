import './search.scss'
import {useState, useLayoutEffect} from 'react'
import axios from 'axios'
import NavBar from '../../components/Navbar/Navbar'
import {Link} from 'react-router-dom'
const Search = () => {

    const [key, setKey] = useState('')
    const [films, setFilms] = useState([])
    useLayoutEffect(() => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=6d9553f6d964292a13b91bf8b1fbbf74&language=en-US&query=${key}&page=1&include_adult=false`)
            .then(res => {
                setFilms(res.data.results)
            })

        if(!key){
            setFilms([])
        }
    },[key])
    
    // const handleSearch = e => {
    //     e.preventDefault()
    //     setKey('')
    // }

    return(
        <>
        <NavBar/>

        <div className="search">
            <h2>Nhập tên phim bạn muốn tìm</h2>    
                <input 
                    type="text" 
                    onChange={e => setKey(e.target.value)}
                    value={key}
                />
            {/* <form onSubmit={handleSearch}>
            </form> */}
            <div className="films">
                {
                    films.map(film => {
                        return(
                            <div className="film">
                                <Link to={`/movie/${film.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w185${film.poster_path}`} alt=""/>
                                </Link>    
                            </div>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}


export default Search