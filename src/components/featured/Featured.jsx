import './Featured.scss'
import { PlayArrow,InfoOutlined } from '@material-ui/icons'
import {Link} from 'react-router-dom'
const Featured = ({type, img, film}) => {
    return(
        <div className="featured">
            {
                type && (
                    <div className="category">
                        <span>{type === 'movies' ? 'Movies' : 'Series'}</span>
                        <select name="genre" id="genre">
                            <option>Genre</option>
                            <option value="adventure">Adventure</option>
                            <option value="comedy">Comedy</option>
                            <option value="crime">Crime</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="historical">Historical</option>
                            <option value="horror">Horror</option>
                            <option value="romance">Romance</option>
                            <option value="dci-fi">Dci-fi</option>
                            <option value="thriller">Thriller</option>
                            <option value="western">Western</option>
                            <option value="animation">Animation</option>
                            <option value="drama">Drama</option>
                            <option value="documentary">Documentary</option>
                        </select>
                    </div>
                )
            }
            <img 
                width="100%" 
                src={img} 
                alt="" 
            />
            <div className="info">
                <span className="desc">
                <h1>{film.original_title}</h1>
                {film.overview}
                </span>
                <div className="buttons">
                    <Link to={`/watch/${film.id}`}>
                        <button className="play">
                            <PlayArrow/>
                            <span>
                                    Play
                            </span>
                        </button>
                    </Link>
                    <Link to={`/movie/${film.id}`}>
                        <button className="more">
                            <InfoOutlined/>
                            <span>More </span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
        
    )
}

export default Featured