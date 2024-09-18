// npm run dev
// npx nodemon server.js
// https://cloud.mongodb.com/v2/66e3f3fa14eeaf422af4a013#/metrics/replicaSet/66e3f4adac00343391eba3ce/explorer/test/users/find 



import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./Navbar.css";

export const Navbar = () => {

  const { isLoggedIn } = useAuth();
  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">WELLNESS विवेक</NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>
              <li>
                <NavLink to="/about"> About </NavLink>
              </li>
              <li>
                <NavLink to="/service"> Services </NavLink>
              </li>
              <li>
                <NavLink to="/contact"> Contact </NavLink>
              </li>
              {isLoggedIn ? <li>
                <NavLink to="/logout"> Logout </NavLink>
              </li>
              : (<>
              <li>
                <NavLink to="/register"> Register </NavLink>
              </li>
              <li>
                <NavLink to="/login"> Login </NavLink>
              </li>
              </>)
              }
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};