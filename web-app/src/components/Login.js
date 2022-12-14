// Importing necessary libraries
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "./functions/login";
import { browserSessionPersistence, setPersistence } from "firebase/auth";
import { auth } from "../firebaseConfig";
import backDrop from "./static/images/login.png";
import "./static/css/login.css";

function Login() {
  let history = useHistory();
  const [user, setUser] = useState(null); // Allowing react state to track the user variable
  const [password, setPassword] = useState(null); // Allowing react state to track the password variable
  const [businessName, setBusiness] = useState(null); // Allowing react state to track the business variable

  const pageLogin = async () => {
    setPersistence(auth, browserSessionPersistence) // Setting the persistence to browser session so if the browser closes the user is automatically logged out
      .then(() => {
        login(history, user, password, businessName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handles the events of then a Username input is changing
  const handleUser = (event) => {
    setUser(event.target.value);
  };

  // Handles the events of then a Password input is changing
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  // Handles the events of then a Business input is changing
  const handleBusiness = (event) => {
    setBusiness(event.target.value);
  };

  return (
    <div className="hero is-fullheight" style={{backgroundImage:`url(${backDrop})`, backgroundPosition:"center",backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form className="box">
                <h1 className="title is-1">Login</h1>
                <div className="field">
                  <label htmlFor="username" className="label">
                    Username
                  </label>
                  <div className="control has-icons-left">
                    <input
                      type="email"
                      id="userEmail"
                      className="userEmail input is-small"
                      onChange={handleUser} // onChange uses the React handleUser function above
                      placeholder="Enter Your Email"
                      autoComplete="off"
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="password" className="label">
                    Password
                  </label>

                  <div className="control has-icons-left">
                    <input
                      type="password"
                      id="userPassword"
                      className="userPassword input is-small"
                      placeholder="Enter Your Password"
                      onChange={handlePassword} // onChange uses the React handlePassword function above
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="BusinessName" className="label">
                    Business Name
                  </label>
                  <div className="control has-icons-left">
                    <input
                      type="text"
                      id="businessName"
                      className="businessName input is-small"
                      placeholder="Enter Your Business Name"
                      onChange={handleBusiness} // onChange uses the React handleBusiness function above
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-building"></i>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="button is-link m-1 is-fullwidth loginButton"
                  onClick={pageLogin}
                >
                  {/*onClick uses the React login function above*/}
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
