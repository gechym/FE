import {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import LoadingBar from 'react-top-loading-bar'

import Navbar from '../../components/Navbar/Navbar'
import Featured from '../../components/featured/Featured'
import SectionSlider from './sections/SectionSlider'
import './home.scss'


import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper.scss'; // core Swiper
import './effect-fade.scss'
// import '../components/list/navigation.scss';
// import '../components/list/pagination.scss';



import SwiperCore, {
} from 'swiper';
SwiperCore.use([]);

const Home = () => {
    const [data, setData] = useState([])
    const [progress, setProgress] = useState(0)

    
    // console.log("render lại")

    const handleSuccess = useCallback((number) => {
        setProgress(prev => prev + number)
    },[])

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=6d9553f6d964292a13b91bf8b1fbbf74')
            .then(function (res) {
                const filterData = res.data.results.map(film => {
                    const valuefilter = ['backdrop_path' ,'id' ,'original_title' ,'overview' ,'poster_path' ,'release_date']
                    const newFilm = {}

                    valuefilter.forEach(value => {
                        newFilm[value] = film[value]
                    });

                    return newFilm
                })
                // console.log(filterData)
                window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
                setProgress(prev => prev + 40)
                setData(filterData)
            })
    },[])

    return (
        <div className="home">
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                height={4}
            />
            <Navbar/>

            <Swiper 
                spaceBetween={0} 
                centeredSlides={true} 
                pagination={
                    {
                        "clickable": true
                    }
                } 
                navigation={false} 
                className="mySwiper">
                    {
                        data.map((film) => {
                            return(
                                <SwiperSlide>
                                    <Featured film={film} img={`https://image.tmdb.org/t/p/original${film.backdrop_path}`} />
                                </SwiperSlide>
                            )
                        }) 
                    }
            </Swiper>
            <SectionSlider
                onSuccess={handleSuccess}
                title="Top thịnh hành"
                url="https://api.themoviedb.org/3/trending/movie/week?api_key=6d9553f6d964292a13b91bf8b1fbbf74" 
            />
            <SectionSlider
                onSuccess={handleSuccess}
                title="Phổ biến trong năm 2021"
                url="https://api.themoviedb.org/3/movie/popular?api_key=6d9553f6d964292a13b91bf8b1fbbf74&language=en-US&page=6&append_to_response=images,videos" 
            />
            <SectionSlider
                onSuccess={handleSuccess}
                title="Phim Hoạt hình điện ảnh"
                url="https://api.themoviedb.org/3/discover/movie?api_key=6d9553f6d964292a13b91bf8b1fbbf74&with_genres=16&page=2" 
            />
            <SectionSlider
                // onSuccess={handleSuccess}
                title="Anime movie"
                url="https://api.themoviedb.org/3/movie/372058/recommendations?api_key=6d9553f6d964292a13b91bf8b1fbbf74&language=en-US&page=1" 
            />
        </div>
    )
}

export default Home