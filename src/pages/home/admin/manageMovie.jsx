import './manageMovie.scss'
import axios from 'axios'
import {useEffect, useRef, useState} from 'react'
import {toast} from 'react-toastify'
import ReactModal from 'react-modal';

const Modal = ({show, handleShowModal, film}) => {
    const [file, setFile] = useState(null)
    const [name, setName] = useState(() => film.original_title)
    const [link, setLink] = useState(() => film.link)
    const fileRef = useRef()

    useEffect(() => {
        setName(film.original_title)
        setLink(film.link)
    },[film])

    const onRequestClose = () => {
        setFile('')
        setName('')
        setLink('')
        fileRef.current.value = null
        handleShowModal()
        
    }

    const handleOnChangeFile = (e) => {
        setFile(e.target.files[0])
        console.log(e.target.files[0])
    }

    const handleUpdate = async () => {
        let formData = new FormData()

        formData.append('original_title', name)
        formData.append('link', link)
        if(file){
            formData.append('sub', file, `film-${film.id}.vtt`)
        }


        await toast.promise(
            new Promise(async (thanhCong, thatbai) => {
                axios.patch(`http://localhost:8000/api/v1/film/${film.id}`, formData , {
                    headers: {
                      'Content-Type': 'text/vtt'
                    }
                })
                    .then(function (response) {
                        console.log(response)
                        thanhCong()

                        onRequestClose()
                    })
                    .catch(function (error) {
                        console.log(error.response)
                        thatbai()
                    });
            }),
            {
                pending: 'Đang cập nhật dữ liệu',
                success: 'Cập nhật thành công.',
                error: 'Err'
            }
        )
        
    }
    console.log(file,name,link)
    return(
        <div>
            <ReactModal 
                isOpen={show}
                onRequestClose={onRequestClose}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(24, 24, 24, 0.8)'
                    },
                    content: {
                        backgroundColor: '#181818',
                        color: 'lightsteelblue',
                        width:'800px',
                        height:'400px',
                        margin:'100px auto',
                        zIndex: '100',
                        border:'none',
                        alignItems:"center"
                    }
                }}
            >
                <div className="modalUpdate" style={{
                    display: 'flex',
                    gap : '10px'
                }}>
                    <div className="posterPath">
                        <img src={`https://image.tmdb.org/t/p/w185/${film.poster_path}`} alt="" />
                    </div>
                    <div className="info" style={{ marginTop: '30px'}}>
                        <h3>{film.original_title}</h3>
                        <p>{film.overview}</p>
                        <br/>
                        <br/>
                        <label htmlFor="name">Cập nhật tên :</label>
                        <input 
                            type="text" id="name" 
                            value={name} 
                            onChange={(e) => {setName(e.target.value)}}
                        />

                        <br/>
                        <br/>
                        <label htmlFor="fileSub">Đổi file sub :</label>
                        <input accept=".vtt" type="file" id="fileSub" ref={fileRef} onChange={handleOnChangeFile}/>

                        <br/>
                        <br/>
                        <label htmlFor="link">Link streaming :</label>
                        <input 
                            type="text" id="link" 
                            value={link} 
                            onChange={(e) => {setLink(e.target.value)}}
                            style={{
                                width:'400px'
                            }}
                        />
                    </div>
                </div>
                <button style={{float:'right'}} onClick={handleUpdate}>Cập nhật</button>

                
            </ReactModal>
      </div>
    )
}


const ManageMovie = () => {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [film, setFilm] = useState({})

    useEffect(() => {
        async function fetchData() {
            await toast.promise(
                new Promise(async (thanhCong, thatbai) => {
                    axios.get('http://localhost:8000/api/v1/film')
                        .then(function (response) {
                            setData(response.data.films)
                            thanhCong()
                        })
                        .catch(function (error) {
                            console.log(error.response.data.message);
                            thatbai()
                        });
                }),
                {
                    // pending: 'Loading..',
                    // success: 'dữ liệu render thành công.',
                    // error: 'Mật khẩu hoặc password không đúng'
                }
            )
        }
        fetchData();
    }, [show])
    
    const handleShowModal = () => {
        setShow(!show)
    }

    const showModal = (data) => {
        setShow(true)
        setFilm(data)
    }

    const deleteFilm = async (id) => {
        axios.delete(`http://localhost:8000/api/v1/film/${id}`)
            .then(function (response) {
                toast.info('Xóa thành công')
            })
            .catch(function (error) {
                toast.error(error.response.data.message)
                return
            });
    }


    return(
        <div className="manage">
            <Modal 
                handleShowModal={handleShowModal} 
                show={show} 
                film={film}
            />
            <h1>
                <mark>
                    Quản lý Kho phim
                </mark>
            </h1>
            <div className="listFilm">
                {
                    data.map((flim) => {
                        return(
                            <div className="item" key={flim.id}>
                                <img src={`https://image.tmdb.org/t/p/w185/${flim.backdrop_path}`} alt="" />
                                <h3>{flim.original_title}</h3>
                                <h3>{flim.release_date}</h3>
                                <div className="btns">
                                    <button
                                        onClick={() => {showModal(flim)}}
                                    >
                                        <span>Cập nhật</span>
                                    </button>
                                    <button
                                        onClick={() => {deleteFilm(flim._id)}}
                                    >
                                        <span>Xóa</span>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default ManageMovie