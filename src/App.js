import { React, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/header/Sidebar";
import Footer from "./Components/footer/Footer";
import routes from "./routes";
import { useMatches } from "./style/theme";
import { useSelector } from "react-redux";
import { ParentContain } from "./style/Home";

function App() {
  const Drawer = useSelector((state) => state.drawer);

  const { customMatches } = useMatches();
  const location = useLocation();
  const showHeaderFooter = ![
    "/",
    "/forgot",
    "/get-otp",
    "/send-otp",
    "/new-password",
  ].includes(location.pathname);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_cred"));
    if (userData && location.pathname === "/") {
      navigate("/home");
    }
  }, [navigate]);

  return (
    // <div className="App">
    <>
      {showHeaderFooter && <Sidebar />}

      <ParentContain
        className={showHeaderFooter ? (Drawer ? " " : "DrawerOpen") : ""}
      >
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </ParentContain>
      {/* {customMatches ? (showHeaderFooter && <Footer />) : null} */}
    </>
    // </div>
  );
}

export default App;
