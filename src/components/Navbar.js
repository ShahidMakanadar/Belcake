import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png"
import "./Navbar.css";


const Navbar = () => {

    // const passwd = document.getElementById("passwd");
    // const chack = document.getElementById("chack");

   function chacked(e){
    
    const passwd = document.getElementById("passwd");
    const chack = document.getElementById("chack");
        passwd.type = chack.checked ? "text" : "password";
    }


    return (
        <div className="container">
            <div class="topNav">
                <h1 class="topText">
                    <svg id="call-logo" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-forward-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zm10.761.135a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L14.293 4H9.5a.5.5 0 0 1 0-1h4.793l-1.647-1.646a.5.5 0 0 1 0-.708z" />
                    </svg> --- Belcake Terdal - 7760454812</h1>
            </div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" width="95" height="40" class="d-inline-block align-text-top" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" ></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto ml-auto mb-0 mb-lg-0 ">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/Order">
                                    Order
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/About">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/Contact">
                                    Contact
                                </Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link active" to="/SignUp">
                                    Sign-Up
                                </Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link active"  data-bs-toggle="modal" data-bs-target="#loginModal">
                                    Login
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>


            <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content" id="loginPopUP">
                        <div class="modal-body">
                            <form>
                                <div class="main-123">
                                    <input type="checkbox" id="chk" aria-hidden="true" />
                                    <div class="login-123">
                                        <form class="form-123">
                                            <label for="chk" aria-hidden="true">Log in</label>
                                            <input class="input" type="email" name="email" placeholder="Email" required="" />
                                            OR
                                            <input class="input" type="number" name="mobileNum" placeholder="Mobile Number" required="" />
                                            <input class="input" id="passwd" type="password" name="pswd" placeholder="Password" required="" />
                                            <input type="checkbox" onChange={chacked} id="chack" />

                                            <Link className="nav-link active"  data-bs-toggle="modal" data-bs-target="#loginModal">
                                                    Forgot Password
                                            </Link>
                                            <button>Log in</button>
                                        </form>
                                    </div>

                                    <div class="register-123">
                                        <form class="form-123">
                                            <label for="chk" aria-hidden="true">Register</label>
                                            <input class="input" type="text" name="txt" placeholder="Username" required="" />
                                            <input class="input" type="number" name="mobileNum" placeholder="Mobile Number" required="" />
                                            <input class="input" type="email" name="email" placeholder="Email" required="" />
                                            <input class="input" type="password" name="pswd" placeholder="Password" required="" />
                                            <button>Register</button>
                                        </form>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Navbar;
