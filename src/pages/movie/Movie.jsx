import './Movie.scss'
import {Routes, Route} from 'react-router-dom'
import Detail from './detail'
import Home from '../home/home'
import WatchLean from '../watch/watchLear'

const Movie = () => {
    return(
        <>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path=":id" element={<Detail/>}/>
                <Route path="test/:id2" element={<WatchLean/>}/>
            </Routes>
        </>
    )
}

export default Movie