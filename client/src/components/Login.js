import React from "react";
import "./Login1.css";
import logo from "../logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    try {
      dispatch(showLoading())
      e.preventDefault();
      const response = await axios.post("/api/user/login", {
        email: e.target.email.value,
        password: e.target.password.value
      })
      dispatch(hideLoading())

      if(response.data.success){
        toast.success(response.data.message)
        toast("Redirected to homes")
        localStorage.setItem("token", response.data.token)
        navigate('/homePage')
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      dispatch(hideLoading())
      toast.error("Something went wrong")
    }
  };

  return (
    <>
      <div className="login__wrapper">
        <div className="loginForm__container">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="text-center mb-3">Login </h2>

          <form
            className="d-flex flex-column  align-items-center"
            onSubmit={handleLogin}
          >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label ">
                
              </label>
              <input
                type="email"
                placeholder="Email address"
                className="form-control me-5"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                
              </label>
              <input
                type="password"
                placeholder="Password"
                className="form-control me-5"
                id="exampleInputPassword1"
                name="password"
              />
            </div>
            <button type="submit" className="btn btn-primary ">
              Login
            </button>
          </form>

          <Link to="/register" className="text-white mt-2">
            Not A User ?
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
