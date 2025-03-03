import Login from "./pages/login/Login";
import Home from "./pages/Home";
import Training from "./pages/Training";
import Support from "./pages/support";
import Questionnaire from "./pages/questionnaire";
import Analytics from "./pages/analytics";
import Result from "./pages/result";
import UserRole from "./pages/userrole";

const routes = [
  { path: "/", element: <Login /> },
  { path: "/home", element: <Home /> },
  { path: "/training", element: <Training /> },
  { path: "/questionnaire", element: <Questionnaire /> },
  { path: "support", element: <Support /> },
  { path: "/analytics", element: <Analytics /> },
  { path: "/result", element: <Result /> },
  { path:"/userrole", element: <UserRole/>},
];

export default routes;
