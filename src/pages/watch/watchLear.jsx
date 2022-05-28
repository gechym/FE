import { useState,useCallback, useEffect } from "react"
import {useParams} from "react-router-dom"
// import LoadingElement from "../../components/loading/loading"
import {ArrowBackIos} from '@material-ui/icons'
import Player from "./player2"
import LoadingBar from 'react-top-loading-bar'
import Navbar from "../../components/Navbar/Navbar"
// import SubList from "./SubList"
import {useNavigate} from "react-router-dom"
import axios from "axios"


const WatchLean = () => {
    const navigate = useNavigate();
    const {id2} = useParams()
    const [showLoading , setShowLoading] = useState(true)
    const [progress, setProgress] = useState(0)
    const [dataSub, setDataSub] = useState([]) 
    const [dataSubEn, setDataSubEn] = useState([]) 

    

    useEffect(() => {
        async function fetchData() {
            await axios.get(`http://localhost:8000/sub/film-${id2}.vtt`)
                .then((res) => {
                    const sub = res.data.split('\r\n\r\n').map((line) => {

                            const timeBetween = line.split("\r\n")[0].split(' --> ').map((time) => {
                                const [hours, minutes, seconds] = time.split(':');
                                const totalSeconds = (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds);
                                return totalSeconds
                            })

                            return {
                                time : timeBetween, 
                                sub : line.split("\r\n").slice(1).join(' ')
                            }
                        }
                    )
                    setDataSub(sub.slice(1))
                    console.log(sub.slice(1))
                })
                .catch((e) => {
                    alert("Hiện tại flim chưa có trong chế độ xem hd")
                })
            await axios.get(`http://localhost:8000/sub/film-${id2}-en.vtt`)
                .then((res) => {
                    const sub = res.data.split('\r\n\r\n').map((line) => {

                            const timeBetween = line.split("\r\n")[0].split(' --> ').map((time) => {
                                const [hours, minutes, seconds] = time.split(':');
                                const totalSeconds = (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds);
                                return totalSeconds
                            })

                            return {
                                time : timeBetween, 
                                sub : line.split("\r\n").slice(1).join(' ')
                            }
                        }
                    )
                    setDataSubEn(sub.slice(1))
                    console.log(sub.slice(1))
                })
                .catch((e) => {
                    alert("Hiện tại flim chưa có trong chế độ xem hd")
                })
        }

        fetchData()
    }, [id2])
    
   


    const handleSuccess = useCallback((number) => {
        setProgress(prev => prev + number)
    },[])

    const handleSetLoading = useCallback((boolean) => {
        setShowLoading(boolean)
    }, [])

    
    return(
        <>
        <Navbar/>
        <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                height={4}
        />
        <div className="modeWatchLearn">
            {/* {
                showLoading &&
                <div className="loadingComponent">
                    <LoadingElement/>
                </div>
            } */}
            <span>
                <div onClick={() => navigate(-1)} className="back-icon">
                    <ArrowBackIos/>
                </div>
            </span>
            <Player 
                handleSuccess={handleSuccess} 
                handleSetLoading={handleSetLoading}
                id={id2}
                dataSub={dataSub}
                dataSubEn={dataSubEn}
            />
            {/* <SubList handleChangeTime={handleChangeTime} dataSub={dataSub} time={currentTime}/> */}
        </div>  
        </>      
    )
}


export default WatchLean