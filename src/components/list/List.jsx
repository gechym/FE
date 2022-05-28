import { PlayArrow,CloseOutlined } from '@material-ui/icons'
import ListItem from '../ListItem/ListItem'
import './list.scss'

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination,Navigation } from 'swiper';


// Import Swiper styles
import 'swiper/swiper.scss'; // core Swiper
import './navigation.scss';
import './pagination.scss';
import { useState } from 'react';
SwiperCore.use([Pagination,Navigation]);

const List = ({titleList,data}) => {
    const [isShow, setIsShow] = useState(true)

    const toggleShowInfo = () => {
        setIsShow(false)
    }

    return(
        <div className='list'>
            <span className="listTitle">{titleList}</span>
            <div className="wrapper">
                    <div className="container">
                        <Swiper 
                            slidesPerView={6} 
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
                                data ? data.map((film, index) => {
                                    return(
                                        <SwiperSlide>
                                            <ListItem  film={film}  toggleShow={toggleShowInfo} />
                                        </SwiperSlide>
                                    )
                                }) : 
                                <>
                                    <SwiperSlide>
                                        <ListItem toggleShow={toggleShowInfo} />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <ListItem toggleShow={toggleShowInfo} />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <ListItem toggleShow={toggleShowInfo} />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <ListItem toggleShow={toggleShowInfo} />
                                    </SwiperSlide>
                                </>
                            }
                        </Swiper>
                    </div>
            </div>
            <div className={isShow ?'item-info hide':'item-info'}>
                <img src="https://d23.com/app/uploads/2019/05/1180w-600h_052919_up-anniversary-facts.jpg" alt="" />
                <div className="info">
                    <h2 className="name">Ups</h2>
                    <span className="desc">
                    The modern bundle can be found under the /modern folder. It targets the latest released versions of evergreen browsers (Chrome, Firefox, Safari, Edge). This can be used to make separate bundles targeting different browsers.
                    </span>
                    <button>
                        <PlayArrow/>
                        <span>Play</span>
                    </button>    
                </div>
                <div className="trailer">
                    <iframe 
                        width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/ORFWdXl_zJ4?controls=0" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                </div>
                <div className="btnClose">
                    <button onClick={() => {setIsShow(true)}}>
                        <CloseOutlined/>
                    </button>
                </div>
            </div>
        </div>
    )
}


export default List