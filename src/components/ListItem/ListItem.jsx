import './ListItem.scss'
import {PlayArrow} from "@material-ui/icons"

const ListItem = ({toggleShow, film}) => {
    return(
        <div 
            onClick = {() => {toggleShow()}} 
            className="listItem">
            <img alt="" src={`https://image.tmdb.org/t/p/w300${film ? film.poster_path : '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg' }`}/>
            <div className="itemInfo">
                <div className="btn-play">
                    <PlayArrow/>
                </div>
            </div>
        </div>
    )
}

export default ListItem