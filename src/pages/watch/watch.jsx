import { useState,useCallback } from "react"
import { useNavigate ,useParams} from "react-router-dom"
import LoadingElement from "../../components/loading/loading"
import {ArrowBackIos} from '@material-ui/icons'
import Player from "./player"
import LoadingBar from 'react-top-loading-bar'
// import axios from "axios"


const Watch = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    const [showLoading , setShowLoading] = useState(true)
    const [progress, setProgress] = useState(0)
    // const [dataFilm, setDatafilm] = useState( async () => {
    //     await axios.get(`http://localhost:8000/api/v1/film/${id}`)
    //         .then((res) => {

    //             if(!res.data.film){
    //                 return null
    //             }
    //             return res.data.film
    //         })
    // })

    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/v1/film/${id}`)
    //         .then((res) => {
    //             setDatafilm(res.data.film)
    //         })
    // },[id])
    
    const handleSuccess = useCallback((number) => {
        setProgress(prev => prev + number)
    },[])

    const handleSetLoading = useCallback((boolean) => {
        setShowLoading(boolean)
    }, [])
    return(
        <>
        <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                height={4}
        />
        {
            showLoading &&
            <div className="loadingComponent">
                <LoadingElement/>
            </div>
        }
        <span>
            <div onClick={() => navigate(-1)} className="back-icon">
                <ArrowBackIos/>
            </div>
        </span>
        <Player 
            handleSuccess={handleSuccess} 
            handleSetLoading={handleSetLoading}
            id={id}
        />
        </>        
    )
}


export default Watch