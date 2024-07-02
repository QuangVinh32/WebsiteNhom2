import React, { SyntheticEvent, useState } from 'react';
import "./Login.scss"
import { Link, useNavigate } from 'react-router-dom';

function encodeCredentials(username: string,password: string): string{
  return btoa(`${username}:${password}`);
}
function Login() {
  const [userName, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const navigate = useNavigate()

  function onSubmit(event: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
      event.preventDefault()
      if (!userName?.trim() || !password?.trim()) {
          setError("Please fill in all fields")
          return 
      } else {
         const credentials = encodeCredentials(userName,password);
         fetch("http://localhost:8080/api/v1/user/login",{
          method:"POST",
          headers:{
          "Content-Type": "application/json"
          },
          body:JSON.stringify({userName,password})
         })
         .then(response =>{
          if(response.ok){
            localStorage.setItem("token","asd1e1asdad78asd7cbajdgadgaiysdt711231asda")
            localStorage.setItem("username",userName)
            navigate("/datphong")
          }else{
            setError("invalid username or password ")
          }
         }).catch(error =>{
          setError("an error occurred while login in .Please try again later")
          console.log("error login in ",error)
         })
      }
    }
  return (
    <div className="App-login">
      <h1 style={{fontSize:"35px" ,color:" rgb(0,80,174)",marginTop:"30px"}}>Đăng nhập </h1>
      <form className='form-login' onSubmit={onSubmit}>
        {error && <div className="error-message">{error}</div>}
        <label className='label-login'>
          <h1 style={{fontSize:"22px" ,color:" white"}}>Tên đăng nhập:</h1>
          <input className='input-login'
            type="text"
            value={userName}
            onChange={(e) => setUsername(e.target.value)} placeholder='Nhập Username hoặc Email'
          />
        </label>
        <br />
        <label className='label-login'>
          <h1 style={{fontSize:"22px" ,color:" white"}}>Mật khẩu:</h1>
          <input className='input-login'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} placeholder='Nhập Password'
          />
        </label>
        <br />
        <div className='sign'>
          <b style={{padding:"5px"}}>Need an account?</b>
          <Link to="">Sign up</Link>
        </div>
        <button className='button-login' type="submit">
          Đăng nhập
        </button>
      </form>
    </div>
  );

}
export default Login;
