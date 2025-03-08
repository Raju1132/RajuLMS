import React, { useEffect, useState } from "react";
import "../../css/login.css";
import Logo from "../../assets/images/logo.png";
import seePasswordIcon from "../../assets/images/icons/eye.png";
import hidePasswordIcon from "../../assets/images/icons/eye1.png";
import { Link, useNavigate } from "react-router-dom";
import {
  Error,
  LoginContain,
  LoginFooter,
  RequieredStar,
} from "../../style/login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux';
import { setRole } from '../../features/RoleSlice';
import { LoginUser, isAuthenticated } from '../../utils/authService';

const Login = () => {
  const dispatch = useDispatch();
  const currentRole = useSelector((state) => state.role);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({
    userType: "",
    userId: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // Check if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/home');
    }
  }, [navigate]);

  // Set initial userType from Redux state
  useEffect(() => {
    setCredentials(prev => ({ ...prev, userType: currentRole === 'Admin' ? 'admin' : 'user' }));
  }, [currentRole]);

  const validateForm = () => {
    let formErrors = {};
    if (!credentials.userType) formErrors.userType = "User Type is required";
    if (!credentials.userId.trim()) formErrors.userId = "User ID is required";
    if (!credentials.password.trim()) formErrors.password = "Password is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setCredentials((prevState) => ({ ...prevState, userType: selectedRole }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // Call login service
      const response = await LoginUser({ payload: credentials });
      
      // Dispatch role to Redux
      dispatch(setRole(response.roleType));
      
      toast.success("Login successful!");
      navigate('/home');
    } catch (error) {
      toast.error(error?.response?.data?.error ?? "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

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
              <select 
                name="userType" 
                id="userType" 
                value={credentials.userType}
                onChange={handleRoleChange}
                disabled={loading}
              >
                <option value="">Please Select</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
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
                disabled={loading}
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
                  disabled={loading}
                />
                {errors.password && <Error>{errors.password}</Error>}
                <button type="button" onClick={() => setOpen(!open)} disabled={loading}>
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
              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
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