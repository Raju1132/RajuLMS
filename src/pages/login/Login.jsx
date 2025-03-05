import React, { useEffect, useState } from "react";
import "../../css/login.css";
import Logo from "../../assets/images/logo.png";
import seePasswordIcon from "../../assets/images/icons/eye.png";
import hidePasswordIcon from "../../assets/images/icons/eye1.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Error,
  LoginContain,
  LoginFooter,
  RequieredStar,
} from "../../style/login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useUIContext } from "../../context";
// import { LoginUser } from "../../services/authServices";
import { useSelector, useDispatch } from 'react-redux';
import {setRole} from '../../features/RoleSlice';

const Login = () => {
    
  const RoleType = useSelector((state) => state.role); 
  const dispatch = useDispatch();
  const handleRoleChange = (event) => {
    setCredentials((prevState) => ({ ...prevState, "userType": event.target.value }));  // Dispatch the action to update the 'role' state
  };
  const [open, setOpen] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);
  // const { fetchProfileData, loading, setloading } = useUIContext();



  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    userType: RoleType,
    userId: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!credentials.userType) formErrors.userType = "User Type is required";
    if (!credentials.userId.trim())
      formErrors.userId = "Customer ID is required";
    if (!credentials.password.trim())
      formErrors.password = "Password is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // setloading(true);
    try {
      // console.log(credentials)
      // const response = await LoginUser({ payload: credentials });
      // localStorage.setItem('user_cred', JSON.stringify(response))
      // setRole(response.roleType);
      navigate('/home');
      // if(response.roleType === "dealer"){
      //   navigate('/home');
      // }
    } catch (error) {
      // localStorage.clear()
      // toast.error(error?.response?.data?.error ?? "Something went wrong");
    }
  };

  if (redirectToHome) {
  //   console.log("redirectToHome: ", redirectToHome);
  //   if (credentials.userType === "customer") return <Navigate to="/home" />;
  //   if (credentials.userType === "admin") return <Navigate to="/admin/home" />;
  //   if (credentials.userType === "employee")
  //     return <Navigate to="/employee/home" />;
  // }
    // if (userType === "admin") {
    //   return <Navigate to="/admin/home" />;
    // }

    // if (userType === "employee") {
    //   return <Navigate to="/employe/home" />;
    // }
    // return <Navigate to="/" />;
  }

// console.log(RoleType,'RoleType');
  

  return (
    <>
      <ToastContainer />
      <LoginContain>
        <div className="LoginLogo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="LoginCard">
          <div className="LoginTitle">
            <h4>Login</h4>
            <p>LEARNING MANAGEMENT SYSTEM</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="LoginGroup">
              <label htmlFor="userType">User Type <RequieredStar>*</RequieredStar></label>
              <select name="userType" id="userType" onChange={handleRoleChange}>
                <option value="">Please Select</option>
                <option value="employee">Admin</option>
                <option value="dealer">User</option>
              </select>
              {errors.userType && <Error>{errors.userType}</Error>}
            </div>
            <div className="LoginGroup">
              <label htmlFor="userId">
                User ID <RequieredStar>*</RequieredStar>
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={credentials.userId}
                placeholder="Enter Your ID"
                onChange={handleChanges}
              />
              {errors.userId && <Error>{errors.userId}</Error>}
            </div>
            <div className="LoginGroup">
              <label htmlFor="password">
                Password <RequieredStar>*</RequieredStar>
              </label>
              <div className="PasswrdInpt">
                <input
                  type={open ? "text" : "password"}
                  id="password"
                  name="password"
                  value={credentials.password}
                  placeholder="Enter Your Password"
                  onChange={handleChanges}
                />
                {errors.password && <Error>{errors.password}</Error>}
                <button type="button" onClick={() => setOpen(!open)}>
                  <img
                    src={open ? hidePasswordIcon : seePasswordIcon}
                    alt="Toggle visibility"
                    className="eye"
                  />
                </button>
              </div>
            </div>
            <div className="LoginGroup CheckBox">
              <Link to="/forgot">Forgot Password?</Link>
            </div>
            <div className="LoginGroup LoginBtn">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </LoginContain>
      <LoginFooter>
        <p>
          POWERED BY: <span>Manthan IT Solutions</span>
        </p>
      </LoginFooter>
    </>
  );
};

export default Login;
