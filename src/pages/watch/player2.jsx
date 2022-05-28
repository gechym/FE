import React, { memo, useLayoutEffect, useRef, useState } from 'react';
import {FastRewind,FastForward,PlayArrow,Pause,Subtitles} from '@material-ui/icons'
// import { useNavigate } from 'react-router';
import Plyr from 'plyr';
import Hls from 'hls.js';
import 'plyr/dist/plyr.css';
import './player2.scss'
import {toast} from 'react-toastify'
import axios from 'axios';

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}


var hls = new Hls({
    maxBufferLength: 120,//! test
});

const Watch = ({handleSuccess, handleSetLoading, id, dataSub, dataSubEn}) => {
    let dataFilm = null
    var videoPlayerRef = useRef(null);
    const playerInstance = useRef(null);
    const subView = useRef(null)
    const subNoView = useRef(null)
    const [poster,setPoster] = useState('')
    const [sub,setSub] = useState('')
    const [currentTime, setCurrentTime] = useState(0)
    const [mode, setMode] = useState('vnen') 
    //BẬT TẮT SUB
    const [toggleSub, setToggleSub] = useState(false)
    const [togglePlay, setToggleSPlay] = useState(false)

    useLayoutEffect(() => {
        async function fetchData() {
            await axios.get(`http://localhost:8000/api/v1/film/${id}`)
                .then((res) => {
                    console.log(res)
                    if(!res.data.film){
                       return dataFilm = null
                    }
                    setPoster(res.data.film.backdrop_path)
                    setSub(res.data.film.sub)
                    dataFilm = res.data.film
                })
                .catch(() => {
                    dataFilm = null
                    toast.info('Hiện tại phim này chưa được hổ trợ vui lòng xem phim khác', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        icon : '😂'
                    });
                })
            let source = dataFilm ? dataFilm.link : 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
            playerInstance.current = new Plyr(videoPlayerRef.current, {
                controls : ['play-large', 'progress','volume'],
                captions : { active: false, language: 'auto', update: false },
            });
            handleSuccess(100)
            
            // // console.log([videoPlayerRef.current])
            // // videoPlayerRef.current.plyr.on('error', (e) => {
            // //     console.log("Lỗi Rồi" , e)
            // // })
            videoPlayerRef.current.plyr.on('canplay', () => {
                console.log("tải xong")
            })
            
            videoPlayerRef.current.plyr.on('timeupdate', () => {
                scrollIntoViewSub()
                setCurrentTime(videoPlayerRef.current.currentTime)
            })

            videoPlayerRef.current.plyr.on('seeking', () => {
                console.log("tìm")
                handleSetLoading(true)
            })
            videoPlayerRef.current.plyr.on('seeked', () => {
                console.log("tìm xong")
                handleSetLoading(false)
            })
            
            hls.loadSource(source);
            hls.attachMedia(videoPlayerRef.current);
            window.hls = hls;
        }
        fetchData()
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });

        


        return () => {
            playerInstance.current.pause();
            playerInstance.current.src = "";
            playerInstance.current.destroy();
            hls.stopLoad()
        };
    }, [handleSuccess, handleSetLoading, id, dataFilm])

    const scrollIntoViewSub = () => {
        // console.log(subView)
        if(subView.current){
            subView.current.scrollIntoView({block: "center", inline: "center" , behavior:"smooth"});
        }
    }

    return (
    <>
    <div className="boxVideo">
        <video
            crossOrigin="anonymous"
            onLoadedMetadata={
                function myFunction() {
                    // toast.success('Chúc bạn xem phim vui vẻ', {
                    //     position: "top-center",
                    //     autoClose: 5000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    //     icon : '😂'
                    // });
                    handleSetLoading(false)
                    // alert("Meta data for video loaded");
                }
            }
            ref={videoPlayerRef}
            autoPlay={true}
            preload="auto"
            data-poster={`https://image.tmdb.org/t/p/original${poster}`}
        >
            <track kind="captions" label="English" srcLang="en" src={`http://localhost:8000/sub/${sub}`} or default />
            <track kind="captions" label="English" srcLang="en" src={'http://localhost:8000/sub/film-568160-en.vtt'}/>
        </video>
        <div className="subListContainer">
            <h1>
                <button
                    className={mode === 'vnen' ? 'activeMode' : ''}
                    onClick={() => {
                        setMode('vnen')
                    }}
                >Việt-Anh</button>
                <button
                    className={mode === 'vn' ? 'activeMode' : ''}
                    onClick={() => {
                        setMode('vn')
                    }}
                >Việt</button>
                <button
                    className={mode === 'en' ? 'activeMode' : ''}
                    onClick={() => {
                        setMode('en')
                    }}
                >Anh</button>
            </h1>
            <ul>
                {
                    dataSub.map((data, index) => {
                        return(
                            <li 
                                className={
                                    currentTime >= data.time[0] && currentTime <= data.time[1]
                                    ? 'active' : ''
                                }
                                onClick={() => {
                                    videoPlayerRef.current.currentTime = data.time[0]
                                }}
                                ref={currentTime >= data.time[0] && currentTime <= data.time[1] ? subView : subNoView}
                            >
                                <h4>{`${data.time[0]}`.toHHMMSS()} - {`${data.time[1]}`.toHHMMSS()}</h4>
                                {
                                    mode === 'vnen' && <>
                                        <h4>{dataSubEn[index] && dataSubEn[index].sub}</h4>
                                        <span>{data.sub}</span>
                                    </>
                                }
                                {
                                    mode === 'vn' && <>
                                        <span>{data.sub}</span>
                                    </>
                                }
                                {
                                    mode === 'en' && <>
                                        <h4>{dataSubEn[index] && dataSubEn[index].sub}</h4>
                                    </>
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    </div>
    <div className="controlsBtn">
        <button
            onClick={() => {
                playerInstance.current.rewind(10)
            }}
        >
            <FastRewind/>
        </button>
        <button
            onClick={() => {
                playerInstance.current.togglePlay(togglePlay)
                setToggleSPlay(!togglePlay)
            }}
        >{togglePlay ? <PlayArrow/> : <Pause/>}</button>
        <button
            onClick={() => {
                playerInstance.current.forward(10)
            }}
        ><FastForward/></button>
        <button
            onClick={() => {
                playerInstance.current.toggleCaptions(toggleSub)
                setToggleSub(!toggleSub)
            }}
        >{toggleSub ? <Subtitles/> : <Subtitles/>}</button>
    </div>
    </>
    )
}

export default memo(Watch)
