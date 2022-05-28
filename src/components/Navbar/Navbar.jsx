import { useEffect, useState, memo } from 'react'
import './Navbar.scss'
import {Search,ArrowDropDown} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {userSelect} from '../../store/reducer/userSlice'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/reducer/userSlice'
import useLocalStorage from '../../utils/useLocalStorage'
import _ from 'lodash'
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [, setToken] = useLocalStorage("jwt", localStorage.getItem("jwt") || "");
    const user = useSelector(userSelect)
    const dispatch = useDispatch()
    useEffect(() =>{
        const hanhleScroll = () => {
            setIsScrolled(window.pageYOffset === 0 ? false : true)
        }
        window.addEventListener('scroll', hanhleScroll)

        return () => {
            window.removeEventListener('scroll', hanhleScroll)
        }
    },[])

    return(
        <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
            <div className="container">
                <div className="left">
                    <Link to='/'>
                        <img src="https://iconape.com/wp-content/files/pt/64713/svg/google-play-movies-tv.svg" alt=""  />
                    </Link>
                </div>
                {
                    !user.membership &&
                    <marquee width="60%" direction="right" height="100%">
                        <h4 style={{color:'#D91921'}}>
                            Đăng ký gói thành viên để có được các dịch vụ cao cấp nhất chỉ với 200$ năm
                        </h4>
                    </marquee>
                }
                <div className="right">
                    {
                        !_.isEmpty(user) ? 
                            <>  
                                <Link to='/search'>
                                    <Search/>
                                </Link>
                                <Link to='/profile'>
                                    <img width="100%" src={`http://localhost:8000/avata/${user.avt}`} alt=""  />
                                </Link>
                                {user.membership ? 
                                    <mark>{`${user.name && user.name}`}</mark>
                                                :
                                                <div style={{textAlign:'center'}}>
                                                    <h4>{`${user.name && user.name}`}</h4>      
                                                    <Link to="/membership">
                                                        <h6>(Đăng ký Thành viên nào)</h6>
                                                    </Link>
                                                </div>
                                }
                                <div className={`profile`}>
                                    <ArrowDropDown/>
                                    <div className="options">
                                        <span>
                                            <Link to="/profile">
                                                <span>Settings</span>
                                            </Link>
                                        </span>
                                        <span onClick={() => {
                                            dispatch(logout())
                                            setToken('')  
                                        }}>logout</span>
                                        {
                                            user.isAdmin && 
                                            <>
                                        <span>
                                            <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">TRANG QUẢN TRỊ</a>
                                        </span>
                                            <Link to="/admin/manageUser">
                                                <span>Quản lý user</span>
                                            </Link>
                                            </>
                                        }
                                    </div>
                                </div>
                            </>
                            : 
                            <div className="profile">
                                <Link to={'/login'}>
                                    <button>Đăng nhập</button>
                                </Link>
                            </div>
                            

                    }
                </div>
            </div>
        </div>
    )
}

export default memo(Navbar)