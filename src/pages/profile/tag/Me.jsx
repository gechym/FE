import React, { useState, useRef } from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { userSelect,login } from '../../../store/reducer/userSlice'
import axios from 'axios'
import {toast} from 'react-toastify'

const Me = () => {
    const user = useSelector(userSelect)
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const fileRef = useRef();
    const dispatch = useDispatch()
    

    const handleOnChangeFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpdate = async () => {
        let formData = new FormData();
    
        formData.append("name", name);
        if (file) {
          formData.append("avt", file);
        }
    
        await toast.promise(
          new Promise(async (thanhCong, thatbai) => {
            axios
              .patch(
                `http://localhost:8000/api/v1/users/updateMe/${user.id}`,
                formData
              )
              .then(function (response) {
                console.log(response);
                
                fileRef.current.value = null;
                dispatch(login(response.data.user))
                thanhCong()
              })
              .catch(function (error) {
                console.log(error);
                thatbai();
              });
          }),
          {
            pending: "Đang cập nhật dữ liệu",
            success: "Cập nhật thành công.",
            error: "Err",
          }
        );
      };

    return (
        <>
            <Navbar/>
            <div className="me">
                <img className="avt activate" src={`http://localhost:8000/avata/${user.avt}`} alt="" />
                <div className="infoProfile">
                    <span>Name/nick name :
                        <br />
                        <h4>{user.name}</h4>
                    </span>

                    <span>Email :
                        <br />
                        <h4>{user.email}</h4>
                    </span>
                </div>
                <div className="editProfile">
                    <h3>Cập nhập thông tin</h3>
                    <div className="input">
                        <input 
                            value={name} 
                            onChange={(e) => {setName(e.target.value)}}
                            placeholder="Tên" type="text" name="" id="" 
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="">Avata</label>

                        <input ref={fileRef} onChange={handleOnChangeFile} type="file" name="" id=""/>
                    </div>                    
                    <button onClick={handleUpdate}>cập nhật</button>
                </div>
            </div>
        </>
    )
}

export default Me
