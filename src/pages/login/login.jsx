import { Facebook } from '@material-ui/icons'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from '../../store/reducer/userSlice'
import useLocalStorage from '../../utils/useLocalStorage'
import { toast } from 'react-toastify';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import './login.scss'

const Login = () => {
    const [email, setEmail] = useState('bao@dev.io')
    const [password, setPassword] = useState('bao1662002')
    const dispatch = useDispatch()
    const [, setToken] = useLocalStorage("jwt", localStorage.getItem("jwt") || "");
    const navigate = useNavigate();

    const handleLogin = async () => {
        await toast.promise(
            new Promise(async (thanhCong, thatbai) => {
                axios.post('http://localhost:8000/api/v1/users/login', {
                    email,
                    password
                })
                    .then(function (response) {
                        console.log(response);
                        dispatch(login(response.data.data.user))
                        setToken(response.data.token)
                        navigate('/home')
                        thanhCong()
                    })
                    .catch(function (error) {
                        dispatch(logout())
                        setToken('')
                        thatbai()
                    });
            }),
            {
                pending: 'Kiểm tra đăng nhập',
                success: 'Đăng nhập thành công.',
                error: 'Mật khẩu hoặc password không đúng'
            }
        )
    }



    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <Link to="/">
                        <img className="logo" src="https://iconape.com/wp-content/files/pt/64713/svg/google-play-movies-tv.svg" alt="" />
                    </Link>
                </div>
            </div>
            <div className="container">
                <h1>ĐĂNG NHẬP</h1>
                <div className="inputs">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>
                <button onClick={handleLogin}>Đăng nhập</button>
                <div className="option">
                    <div className="help">
                        <span>Bạn cần trợ giúp?</span>
                    </div>
                </div>
                <div className="moreLogin">
                    <Facebook /> <span>Đăng nhập bằng tài khoảng Facebook</span>
                </div>
                <div className="join">
                    <p className="joinNetfitl">
                        Bạn mới tham gia Netflix ?<Link to="/register"><span>Đăng ký Ngay</span></Link>
                    </p>
                    <p className="term">
                        Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không phải là robot
                        <br />
                        <span >Tìm hiểu ngay</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login