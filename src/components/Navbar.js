import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png"
import "./Navbar.css";


const Navbar = () => {
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
                                <Link className="nav-link active" to="/Login" data-bs-toggle="modal" data-bs-target="#loginModal">
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
  



            {/* Login modal */}


            <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="loginModalLabel">Belcake ~ Terdal</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <form>
                                <div class="mb-3">
                                    <label for="loginInputEmail1" class="form-label">Email address</label>
                                    <input type="email" class="form-control" placeholder="belcaketerdal123@gmail.com" id="loginInputEmail1" aria-describedby="emailHelp" />
                                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div class="mb-3">
                                    <label for="loginInputPassword1" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="loginInputPassword1" />
                                </div>
                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="loginCheck1" />
                                    <label class="form-check-label" for="loginCheck1">Check me out</label>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                            <button className='btn btn-success btn-sm ' data-bs-toggle="modal" data-bs-target="#signUpModal">SignUp</button>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* SignUp modal */}


            <div class="modal fade" id="signUpModal" tabindex="-1" aria-labelledby="signUModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="signUModalLabel">Belcake ~ Terdal</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <form>
                                <div class="mb-3">
                                    <label for="signUInputEmail1" class="form-label">Email address</label>
                                    <input type="email" placeholder="belcaketerdal123@gmail.com" class="form-control" id="signUInputEmail1" aria-describedby="emailHelp" />
                                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div class="mb-3">
                                    <label for="signUInputPassword1"class="form-label">Password</label>
                                    <input type="password" class="form-control" id="signUInputPassword1" />
                                </div>
                                <div class="mb-3">
                                    <label for="signUInputPassword1" class="form-label">confirm Password</label>
                                    <input type="password"  class="form-control" id="signUInputPassword1" />
                                </div>
                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="loginCheck1" />
                                    <label class="form-check-label" for="loginCheck1">Check me out</label>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


        </div >
    );
};

export default Navbar;
