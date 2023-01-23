import React, { useContext, useState } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-hot-toast";

const Login = () => {
  const { GoogleSignIn, setUser, emailSignIn, forgetPassword } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const [show, setShow] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [userInfo, setuserInfo] = useState({
    email: "",
    password: "",

  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo.email, userInfo.password);
    emailSignIn(userInfo.email, userInfo.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        toast("Login Successful");
        console.log(from);
        navigate(from, { replace: true });

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        const er = `${errorCode} ${errorMessage}`;
        toast.error(er);
        // ..
      });
  }

  const handleGoogle = () => {
    GoogleSignIn(userInfo.email)
      .then((result) => {
        console.log(result);
        setUser(result.user);
        toast("Login Successful");
        console.log(from);
        navigate(from, { replace: true });
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        const er = `${errorCode} ${errorMessage}`;
        toast.error(er);
      });
  }
  const handleforgetPassword = () => {
    if (userInfo.email) {
      forgetPassword(userInfo.email)
        .then(() => {
          toast.success("Password reset email sent!");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
    else {
      toast.error("write your mail first");
    }
  }
  const handlebuttonshow = () => {

    setShow(!show);
  }
  const handlemail = (e) => {
    const test = /\S+@\S+\.\S+/.test(e.target.value);
    if (!test) {
      setErrors({
        ...errors, email: "please give correct mail"
      })
      setuserInfo({
        ...userInfo, email: ""
      })
      return;
    }
    else {
      setuserInfo({
        ...userInfo, [e.target.name]: e.target.value
      });
      setErrors({
        ...errors, email: ""
      })
    }
  }
  const handlePass = (e) => {

    if (!/(?=.{8,})/.test(e.target.value)) {
      setErrors({
        ...errors, password: "password must be 8 character"
      })
      setuserInfo({
        ...userInfo, password: ""
      })
      return;
    }
    if (!/(?=.*[a-zA-Z])/.test(e.target.value)) {
      setErrors({
        ...errors, password: "password should have Upper letter!!"
      })
      setuserInfo({
        ...userInfo, password: ""
      })
      return;
    }
    if (!/(?=.*[!#@$%&? "])/.test(e.target.value)) {
      setErrors({
        ...errors, password: "password should have special character!!"
      })
      setuserInfo({
        ...userInfo, password: ""
      })
      return;
    }
    setErrors({
      ...errors, password: ""
    })
    setuserInfo({
      ...userInfo, password: e.target.value
    })
  }

  return (
    <div className="login-container">
      <div className="login-title">
        Login
        <BiLogInCircle />
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <input onBlur={handlemail} className="stylebox" type="text" name="email" placeholder="Your Email" />
          {errors.email && <p className="error-message">
            {errors.email ? errors.email : ""}
          </p>}
        </div>
        <div className="relative ">
          <input className="stylebox"
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="password"
            // value={userInfo.password}
            onChange={handlePass}
          />
          <div className="absolute right-5 top-8" onClick={() => setShowPass(!showPass)}>
            {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        {/* <div className="flex items-center p-1 justify-center mt-2 mb-4">
          <input onChange={handlebuttonshow}
            className="check-box"
            type="checkbox"
          />
          <span className="ml-1">accept term & condition</span>
        </div> */}
        <button disabled={show} type="submit" className={!show ? "hover:shadow-none hover:bg-[#1b80bf]" : "blur-sm"}>Login</button>


        <p className="flex justify-between my-2">
          <span style={{ cursor: "pointer" }} onClick={handleforgetPassword}>Forget Password?</span> <Link to="/signup">Sign up first</Link>
        </p>
      </form>

      <button onClick={handleGoogle} disabled={show} className={!show ? "hover:shadow-none hover:bg-[#1b80bf] mt-3" : "blur-sm mt-3"}>Google</button>
    </div>
  );
};

export default Login;
