import {Link} from 'react-router-dom'
import { Facebook } from '@material-ui/icons'
import { useState } from 'react'
import '../login/login.scss'
import { toast } from 'react-toastify';
import validator from 'validator'
import axios from 'axios';
import { useNavigate } from 'react-router';
import useLocalStorage from '../../utils/useLocalStorage';
import { useDispatch } from 'react-redux';
import { login } from '../../store/reducer/userSlice';

const Register = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const [, setToken] = useLocalStorage("jwt", localStorage.getItem("jwt") || "");
    const navigate = useNavigate();

    const handleRegister = () => {
        if(!name || !email || !password) {
            return toast.error('vui lòng cung cấp đầy đủ thông tin')
        }
        if(!validator.isEmail(email)){
            return toast.error('gmail này không hợp lệ')
        }
        if(password.length < 8){
            return toast.error('Mật khẩu phải từ 8 ký tự trở lên')
        }

        axios.post('http://localhost:8000/api/v1/users/signup', {
            email,
            password,
            name,
        }).then(function (response) {
            setToken(response.data.token)
            dispatch(login(response.data.data.user))
            navigate('/')
            console.log(response);
        })
        .catch(function (error) {
            setMessage('Email này đã được sử dụng từ trước')
        });
    }

    return(
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <Link to="/">
                        <img className="logo" src="https://iconape.com/wp-content/files/pt/64713/svg/google-play-movies-tv.svg" alt="" />
                    </Link>
                </div>
            </div>
            <div className="container">
                <h1>Đăng ký</h1>
                <div className="inputs">
                    <input
                        type="text"
                        placeholder="Tên Người dùng"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            setMessage('')
                        }}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setMessage('')
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setMessage('')
                        }}
                    />
                    <span style={{color:'#D91921',fontSize:'12px'}}>{message}</span>
                </div>
                <button onClick={handleRegister}>Đăng ký</button>
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
                        Bạn Đã có tài khoảng ?<Link to="/login"><span>Đăng nhập</span></Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register