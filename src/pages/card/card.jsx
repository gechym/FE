import Navbar from '../../components/Navbar/Navbar'
import './card.scss'
import {userSelect} from '../../store/reducer/userSlice'
import {useSelector} from 'react-redux'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Card = () => {
    const user = useSelector(userSelect)
    const [link, setLink] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/users/getCheckOutSession/${user.id}`)
        .then((res) => {
            setLink(res.data.url)
        })
    },[user])

    return (
        <>
        <Navbar/>
        <div className="card">
            <div id="container">	
                    <div class="product-details">
                        <h1>Membership </h1>
                        <span class="hint-star star">
                        </span>
                        <p class="information">
                            
                            Đăng ký Gói Thành viên 
                            <br/>
                            Xem mọi nội dung bạn muốn. Không có quảng cáo.
                            <br/>
                            Đề xuất dành riêng cho bạn.
                            <br/>
                            Thay đổi hoặc hủy gói dịch vụ của bạn bất cứ khi nào.
                        </p>
                        <div class="control">
                            <button class="btn">
                                <span class="price">200$ / year</span>
                                <span class="buy">
                                    <a href={link}>
                                        Buy Now
                                    </a>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div class="product-image">
                        <img src="data:image/jpeg;base64,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" alt="Omar Dsoky"/>
                        <div class="info">
                            <h2>Đặc Quyền</h2>
                            <ul>
                                <li><strong>Xem Phim: </strong>Full sub, 4k</li>
                                <li><strong>Đa thiết bị: </strong>TV, SmartPhone, samsung TV</li>
                                <li><strong>Nội dung đa dạng: </strong>Xem trước phim mới</li>
                                <li><strong>Quảng cáo: </strong>Không có bất kỳ QC nào xuất hiện</li>
                            </ul>
                        </div>
                    </div>
            </div>
        </div>
        </>
    )
}


export default Card