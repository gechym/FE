import './Comments.scss'
import {Star} from '@material-ui/icons'
import {useEffect, useState} from 'react'
import axios from 'axios'
import _ from 'lodash'
import {toast} from 'react-toastify'

const Comments = ({user, idFilm}) => {
    const [dataComment,setDataComment] = useState([])
    const [vote, setVote] = useState(0)
    const [comment, setComment] = useState('')

    useEffect(() => {
        async function fetchData() {
            axios.get(`http://localhost:8000/api/v1/rating?filmId=${idFilm}`)
                .then((res) => {
                    console.log(res.data.ratings)
                    setDataComment(res.data.ratings)
                })
        }
        fetchData()
        console.log(user.id)
    }, [user, idFilm])


    const handleSubmit = async () => {
        if(!comment || vote === 0){
            toast.info("Ơi kìa ! thiếu ròi")
            return
        }

        await toast.promise(
            new Promise(async (thanhCong, thatbai) => {
              axios.post(`http://localhost:8000/api/v1/rating`,{
                filmId:idFilm,
                user:user.id,
                rating : `${vote}`,
                comment : comment
              })
                .then(function (res) {
                    axios.get(`http://localhost:8000/api/v1/rating?filmId=${idFilm}`)
                    .then((res) => {
                        setDataComment(res.data.ratings)
                        setComment('')
                        setVote(0)
                    })

                    thanhCong()
                })
                .catch(function (error) {
                  console.log(error);
                  thatbai();
                });
            }),
            {
              pending: "Đang gửi",
              success: "Cảm ơn bạn đã đánh giá!",
              error: "Err",
            }
          );
    }

    const handleUpdate = async () => {
        if(!comment || vote === 0){
            toast.info("Ơi kìa ! thiếu ròi")
            return
        }

        await toast.promise(
            new Promise(async (thanhCong, thatbai) => {
              axios.patch(`http://localhost:8000/api/v1/rating`,{
                filmId:idFilm,
                user:user.id,
                rating : `${vote}`,
                comment : comment
              })
                .then(function (res) {
                    axios.get(`http://localhost:8000/api/v1/rating?filmId=${idFilm}`)
                    .then((res) => {
                        setDataComment(res.data.ratings)
                        setComment('')
                        setVote(0)
                    })

                    thanhCong()
                })
                .catch(function (error) {
                  console.log(error);
                  thatbai();
                });
            }),
            {
              pending: "Đang gửi",
              success: "cập nhật thành công",
              error: "Err",
            }
          );
    }

    return(
        <div className="comments">
            {
                !_.isEmpty(user) ? 
                <div className='commentForm'>
                    <textarea 
                        value={comment}
                        onChange={(e) => {setComment(e.target.value)}}
                        style={{resize:'none'}}  
                        name="" id="" cols="100" rows="5"
                    ></textarea>
                    <div className='rating'>
                        <span className={vote >= 1 ? 'isVote' : ''}
                            onClick={() =>{
                                setVote(1)
                            }}
                        ><Star/></span>
                        <span className={vote >= 2 ? 'isVote' : ''}
                            onClick={() =>{
                                setVote(2)
                            }}
                        ><Star/></span>
                        <span className={vote >= 3 ? 'isVote' : ''}
                            onClick={() =>{
                                setVote(3)
                            }}
                        ><Star/></span>
                        <span className={vote >= 4 ? 'isVote' : ''}
                            onClick={() =>{
                                setVote(4)
                            }}
                        ><Star/></span>
                        <span className={vote >= 5 ? 'isVote' : ''}
                            onClick={() =>{
                                setVote(5)
                            }}
                        ><Star/></span>
                        {
                            dataComment.find(data => data.user.id === user.id) ? 
                            <button onClick={() => {handleUpdate()}}>Sửa lại đánh giá</button> : <button onClick={() => {handleSubmit()}}>Đánh Giá</button>
                        }
                    </div>
                </div> : <h2>Đăng nhập để có thể bình luận</h2>
            }
            {
                dataComment.length > 0 ? dataComment.map(comment => {
                    return <div className="commentItem">
                                    <img src={`http://localhost:8000/avata/${comment.user.avt}`} alt="" /> 
                                <div className="infoComment">
                                    <h4>{comment.user.name}{comment.user.membership && <span> Menbership</span>} </h4>
                                        {
                                            [1,2,3,4,5].map((item) => item <= (+comment.rating) && <span><Star/></span>)
                                        }
                                    <p>{comment.comment}</p>    
                                </div>
                            </div>
                }) : <p>Chưa có đánh giá nào </p>
            }
        </div>
    )
}

export default Comments 