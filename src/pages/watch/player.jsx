import React, { memo, useLayoutEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router';
import Plyr from 'plyr';
import Hls from 'hls.js';
import 'plyr/dist/plyr.css';
import {toast} from 'react-toastify'
import axios from 'axios';
import './player.scss'

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours + ':' + minutes + ':' + seconds;
}



var hls = new Hls({
    maxBufferLength: 120,//! test
});

const Watch = ({handleSuccess, handleSetLoading, id}) => {
    let dataFilm = null
    const videoPlayerRef = useRef(null);
    const playerInstance = useRef(null);
    const [poster,setPoster] = useState('')
    const [sub,setSub] = useState('')
    // const navigate = useNavigate()
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
                })
            let source = dataFilm ? dataFilm.link : 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
            playerInstance.current = new Plyr(videoPlayerRef.current, {
                controls : ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'airplay', 'fullscreen'],
                fullscreen : { enabled: true, fallback: true, iosNative: false, container: null }
            });
            // playerInstance.current.play(); // Start playback
            // playerInstance.current.fullscreen.enter(); // Enter fullscreen
            handleSuccess(100)
      
            videoPlayerRef.current.plyr.on('canplay', () => {
                console.log("tải xong")
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

        


        return () => {
            playerInstance.current.pause();
            playerInstance.current.src = "";
            playerInstance.current.destroy();
            hls.stopLoad()
        };
    }, [handleSuccess, handleSetLoading, id, dataFilm])


    return (
        <div className="wrapperVideo">
            <video
                crossOrigin="anonymous"
                onLoadedMetadata={
                    function myFunction() {
                        toast.success('Chúc bạn xem phim vui vẻ', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            icon : '😂'
                        });
                        handleSetLoading(false)
                        // alert("Meta data for video loaded");
                    }
                }
                ref={videoPlayerRef}
                autoPlay={true}
                preload="auto"
                data-poster={`https://image.tmdb.org/t/p/original${poster}`}
            >
                <track kind="captions" label="English" srcLang="en" src={`https://subtitles.netpop.app/subtitles/20211215/1639535027015_th_1638756204081_Entertainment District Arc.E01.EN.srt`} or default />
            </video>
        </div>
    )
}

export default memo(Watch)
