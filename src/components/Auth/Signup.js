import { SiGnuprivacyguard } from "react-icons/si";
import "../../styles/login.css";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { toast } from "react-hot-toast";
import { AuthContext } from "../Context/AuthProvider";


const Signup = () => {
  const { GoogleSignIn, signup, setUser, verifymail, user, updateProfileName } = useContext(AuthContext);
  const [show, setShow] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  // console.log(from);
  const [userInfo, setuserInfo] = useState({
    name: "",
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
    signup(userInfo.email, userInfo.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setUser(user);
        toast("please verify your email!!");
        console.log(userInfo.name);
        nameUpdate();
        letsverify();
        console.log(from);
        navigate(from, { replace: true });
        // ...
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
    console.log(userInfo.name);
    console.log(userInfo);
    GoogleSignIn()
      .then((result) => {
        console.log(result);
        // const user = userCredential.user;
        setUser(result.user);
        // toast("please verify your email!!");
        // nameUpdate();
        // letsverify();
        // console.log(from);
        // navigate(from, { replace: true });
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        const er = `${errorCode} ${errorMessage}`;
        toast.error(er);
      });
  }

  const nameUpdate = () => {
    console.log(userInfo.name);
    updateProfileName({
      displayName: userInfo.name
    })
      .then(() => {
        console.log("profile updated");
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        const er = `${errorCode} ${errorMessage}`;
        toast.error(er);
      });
  }

  const letsverify = () => {
    verifymail()
      .then(() => {
        toast("check your inbox and get verified");
        console.log(user);
      }

      )
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        const er = `${errorCode} ${errorMessage}`;
        toast.error(er);
      }
      );
  }

  const handlebuttonshow = () => {

    setShow(!show);
  }
  const handleName = (e) => {
    setuserInfo({
      ...userInfo, name: e.target.value
    })
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
      <div className="login-title">Sign up <SiGnuprivacyguard /></div>
      <form onSubmit={handleSubmit} className="login-form">
        <input defaultValue={userInfo.name} onChange={handleName} className="stylebox" type="text" name="name" placeholder="Your Name" />

        <div>
          <input defaultValue={userInfo.email} onChange={handlemail} className="stylebox" type="text" name="email" placeholder="Your Email" />
          {errors.email && <p className="error-message">
            {errors.email ? errors.email : ""}
          </p>}
        </div>
        <div className="relative ">
          <input className="stylebox"
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="password"
            defaultValue={userInfo.password}
            onChange={handlePass}
          />
          <div className="absolute right-5 top-8" onClick={() => setShowPass(!showPass)}>
            {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="flex items-center p-1 justify-center mt-2 mb-4">
          <input onChange={handlebuttonshow}
            className="check-box"
            type="checkbox"
          />
          <span className="ml-1">accept term & condition</span>
        </div>
        <button disabled={show} type="submit" className={!show ? "hover:shadow-none hover:bg-[#1b80bf]" : "blur-sm"}>Sign Up</button>


        <p className="my-2">
          <span>Already Have an Account? </span> <Link to="/login" className="font-bold text-green-800">Log in</Link>
        </p>
      </form>

      <button onClick={handleGoogle} disabled={show} className={!show ? "hover:shadow-none hover:bg-[#1b80bf] mt-3" : "blur-sm mt-3"}>Google</button>
    </div>
  );
};

export default Signup;
