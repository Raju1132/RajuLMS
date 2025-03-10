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
  RequieredStar, // Typo: should be RequiredStar
} from "../../style/login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { setRole } from "../../features/RoleSlice";
import { LoginUser, isAuthenticated } from "../../utils/authService";

const Login = () => {
  const dispatch = useDispatch();
  const currentRole = useSelector((state) => state.role);
  const [showPassword, setShowPassword] = useState(false);
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
    // Add a check to prevent unnecessary navigation if already on the correct page
    if (isAuthenticated()) {
      const targetRoute = currentRole === "Admin" ? "/home" : "/student-dashboard";
      navigate(targetRoute);
    }
  }, [navigate, currentRole]);

  // Set initial userType from Redux state - only run once at component mount
  useEffect(() => {
    setCredentials((prev) => ({
      ...prev,
      userType: currentRole === "Admin" ? "admin" : "user",
    }));
  }, [currentRole]);

  const validateForm = () => {
    const formErrors = {};
    if (!credentials.userType) formErrors.userType = "User Type is required";
    if (!credentials.userId.trim()) formErrors.userId = "User ID is required";
    if (!credentials.password.trim())
      formErrors.password = "Password is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setCredentials((prevState) => ({ ...prevState, userType: selectedRole }));
    
    // Clear userType error when role is selected
    if (errors.userType) {
      setErrors((prev) => ({ ...prev, userType: "" }));
    }
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
      
      // Use the response's role type rather than the currentRole from state
      // which might not have updated yet due to Redux state update timing
      response.roleType === "Admin"
        ? navigate("/home")
        : navigate("/student-dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.error ??
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
              <label htmlFor="userType">
                User Type <RequieredStar>*</RequieredStar>
              </label>
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
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={credentials.password}
                  placeholder="Enter Your Password"
                  onChange={handleChanges}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  disabled={loading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <img
                    src={showPassword ? hidePasswordIcon : seePasswordIcon}
                    alt={showPassword ? "Hide password" : "Show password"}
                    className="eye"
                  />
                </button>
              </div>
              {errors.password && <Error>{errors.password}</Error>}
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