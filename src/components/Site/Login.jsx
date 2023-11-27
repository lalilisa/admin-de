import { Alert, Stack } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [isLogin, setIsLogin] = useState(true)
  const [isLogout, setIsLogout] = useState(false)
  const [auth, setAuth] = useState(false)
  const navigative = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notAuthorized,setNotAuthorized] = useState(false);
  const showFormLogin = (event) => {
    document.getElementById("login").style.display = "block";
    document.getElementById("logout").style.display = "none";
    setIsLogin(true);
    setIsLogout(false);
  }

  const showFormLogout = (event) => {
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "block";
    setIsLogin(false);
    setIsLogout(true);
  }

  const userLogin = (event) => {

    // const user = {
    //   username: document.getElementById("username").value,
    //   password: document.getElementById("password").value
    // }
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", "oanh")
    formData.append("password", "123")
    // const json = JSON.stringify(user)
    axios.post("http://localhost:8085/api/auth/login",
      {
        username: username,
        password: password
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
      .then((res) => {
        if (res?.data?.role === 'ADMIN') {
          localStorage.setItem('accessToken', res.data?.accessToken);
          setAuth(true);
          navigative("/admin/home")
        }
        else {
          setNotAuthorized(true);
          console.log("NO ADMIN");
          setTimeout(()=>{
            setNotAuthorized(false);
          },2500)
        }

      })
      .catch((error) => {
        // <Alert variant="filled" severity="error">
        //   Có lỗi trong quá trình xử lý
        // </Alert>
        setNotAuthorized(true);
        setTimeout(()=>{
          setNotAuthorized(false);
        },2500)
 

      })

    if (auth) {
      alert("ok")
      // navigative("/admin/home")
    }

  }

  const userLogout = () => {

  }

  return (
    <>
      { notAuthorized && <Stack sx={{ width: '25%' }} spacing={2} style={{ float: 'right', margin: '20px', backgroundColor: '#adb5bd' }} >
        <Alert variant="filled" severity="error">
          Không có quyền truy cập vào trang này
        </Alert>
      </Stack>
      }
      <div className='background'>
        <div className='form-login'>

          <div className="header-form">
            <h2 onClick={showFormLogin} className={isLogin ? 'title-login active-form' : 'title-login'}>Đăng Nhập</h2>
            <h2 onClick={showFormLogout} className={isLogout ? 'title-login active-form' : 'title-login'}>Đăng Ký</h2>
          </div>

          <form id='login'>
            <div className="form-group">
              <label htmlFor="userName">Tài khoản:</label>
              <input type="text" className="form-control" id="username" name="username"
                value={username}
                onChange={(e) => { setUsername(e.target.value) }} />
            </div>
            <div className="form-group">
              <label htmlFor="userName">Mật khẩu:</label>
              <input type="password" className="form-control"
                id="password" name="password"

                value={password}
                onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            <div className='BtnLogin'>
              <button className='btnLogin' type="submit" onClick={(e) => { userLogin(e) }} >Đăng nhập</button>
            </div>
          </form>

          <form action="" id='logout'>
            <div className="form-group">
              <label htmlFor="userName">Tài khoản:</label>
              <input type="text" className="form-control" id="userName" name="userName" />
            </div>
            <div className="form-group">
              <label htmlFor="userName">Mật khẩu:</label>
              <input type="text" className="form-control" id="userName" name="userName" />
            </div>
            <div className='BtnLogin'>
              <button className='btnLogin' type="submit" onClick={userLogout}>Đăng ký</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login