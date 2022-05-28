import { useEffect, useState, memo } from 'react'
import axios from 'axios'
import {PlayArrow,CloseOutlined,MovieFilter} from "@material-ui/icons"
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination,Navigation } from 'swiper';
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import { userSelect } from '../../../store/reducer/userSlice';
// Import Swiper styles
import 'swiper/swiper.scss'; // core Swiper
import '../../../components/list/navigation.scss';
import '../../../components/list/pagination.scss';
import '../../../components/ListItem/ListItem.scss';
import '../../../components/list/list.scss';

import loadingImg from './loading.PNG'
SwiperCore.use([Pagination,Navigation]);

const SectionSlider = ({title , url, onSuccess}) => {
    const [ data , setData ] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isShow, setIsShow] = useState(true)
    const [info, setInfo] = useState({})
    const user = useSelector(userSelect)

    const toggleShowInfo = (data) => {
        setInfo(data)
        setIsShow(false)
    }   
    
    const handleSetDetail = () => {
        setIsShow(true)
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    }

    const handleAddMyList = async () => {
        axios.post('http://localhost:8000/api/v1/film', {
            ...info,
            idUser : user.id
        })
            .then((res) => {
                axios.post('http://localhost:8000/api/v1/users/addMyListAndDb', {
                    idFilm:res.data.film._id,
                    idUser : user.id
                }).then((res) => {
                    toast.success('Thêm thành công vào danh sách cá nhân')
                })
            }).catch(err => {
                axios.post('http://localhost:8000/api/v1/users/addMyList', {
                    idFilmTmdb:info.id,
                    idUser : user.id
                }).then((res) => {
                    toast.success('Thêm thành công vào danh sách cá nhân')
                }).catch(err => {
                    toast.error('Vui Lòng Đăng nhập để thực hiện chức năng này')
                })
            })
    }

    useEffect(  () => {
        async function fetchData() {
            axios.get(url)
                .then(function (res) {
                    const filterData = res.data.results.map(film => {
                        const valuefilter = ['backdrop_path' ,'id' ,'original_title' ,'overview' ,'poster_path' ,'release_date']
                        const newFilm = {}
                        valuefilter.forEach(value => {
                            newFilm[value] = film[value]
                        });
                        return newFilm
                    })
                    setIsLoading(false)
                    setData(filterData)

                    if(onSuccess){
                        onSuccess(20)
                    }
                })
        }
        fetchData();
    },[onSuccess, url])
    // console.log("slider ren reder " + title)
    return(
        <div className='list'>
            <span className="listTitle">{title}</span>
            <div className="wrapper">
                    <div className="container">
                        <Swiper 
                            slidesPerView={7} 
                            spaceBetween={10} 
                            slidesPerGroup={1} 
                            loop={true} 
                            loopFillGroupWithBlank={true} 
                            pagination={{
                                "clickable": true 
                            }} 
                            navigation={true}
                            className="mySwiper"
                        >
                            {
                                isLoading ? 
                                    <>
                                        <SwiperSlide>
                                            <div 
                                                className="listItem">
                                                <img alt="" src={loadingImg}/>
                                                <div className="itemInfo">
                                                    <div className="btn-play">
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div 
                                                className="listItem">
                                                <img alt="" src={loadingImg}/>
                                                <div className="itemInfo">
                                                    <div className="btn-play">
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div 
                                                className="listItem">
                                                <img alt="" src={loadingImg}/>
                                                <div className="itemInfo">
                                                    <div className="btn-play">
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </>
                                    :
                                    data.map(film => {
                                        return(
                                            <SwiperSlide>
                                            <div 
                                                onClick = {() => {toggleShowInfo(film)}} 
                                                className="listItem">
                                                <img alt="" src={`https://image.tmdb.org/t/p/w185${film ? film.poster_path : '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg' }`}/>
                                                <div className="itemInfo">
                                                    <div className="btn-play">
                                                        <PlayArrow/>
                                                    </div>
                                                </div>
                                            </div>
                                            </SwiperSlide>
                                        )
                                    })
                            }
                        </Swiper>
                    </div>
            </div>
            <div className={isShow ?'item-info hide':'item-info'}>
                <img src={`https://image.tmdb.org/t/p/original${info.backdrop_path}`} alt="" />
                <div className="info">
                    <h2 className="name">{info.original_title}</h2>
                    <span className="desc">
                        {info.overview}
                    </span>
                    <Link to={`/movie/${info.id}`}>
                        <button>
                            <PlayArrow/>
                            <span onClick={handleSetDetail}>Xem Thông Tin</span>
                        </button>    
                    </Link>
                    <div>
                        
                    </div>
                    {
                        !user.isAdmin ? 
                        <button style={{marginTop:'20px'}}>
                            <MovieFilter/>
                            <span onClick={() => handleAddMyList()}>Thêm vào My List</span>
                        </button> : 
                        <button style={{marginTop:'20px'}}>
                            <MovieFilter/>
                            <span onClick={() => handleAddMyList()}>thêm vào Database</span>
                        </button>          
                    }
                </div>
                {/* <div className="trailer">
                    <iframe 
                        width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/ORFWdXl_zJ4?controls=0" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                </div> */}
                <div className="btnClose">
                    <button onClick={() => {
                        setIsShow(true)
                        setInfo({})
                    }}>
                        <CloseOutlined/>
                    </button>
                </div>
            </div>
        </div>
    )
}


export default memo(SectionSlider)