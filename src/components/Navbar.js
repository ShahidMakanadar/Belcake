import React, { useState ,} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../img/logo.png"
import "./Navbar.css";



const Navbar = () => {

    //Register input field and Api

    const [userName, setuserName] = useState("")
    const [mobileNum, setmobileNum] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [error,setErrore] = useState('');
    const navigate = useNavigate();

    const Register = async() => {
        if(!userName || !mobileNum || !email || !password)
        {
            setErrore(true);
            return false;
        }
        console.log("User Clicked On Register Button");

        let data = await fetch('http://localhost:10000/register',{
            method:'post',
            body: JSON.stringify({userName,mobileNum,email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        })

        data = await data.json()
        if(data.data){
            localStorage.setItem('user',JSON.stringify(data.data));
            navigate('/Order')
            alert("Hii "+userName+", Your Registration Is Successful....!")
        }

    }   


    
   //Login input field and Api
  
    const [L_email , setL_email] = useState("")
    const [L_password , setL_password] = useState("")
    const [L_error , setL_Errore] = useState("")

    const Login = async()=>{
        if(!L_email || !L_password)
        {
            setL_Errore(true);
            return false;
        }
        console.log("clicked on Login ")

        const email = L_email;
        const password = L_password;
        let data = await fetch('http://localhost:10000/login',{
            method:'post',
            body: JSON.stringify({email,password}),
            headers:{
                "Content-Type" : "application/json"
            }
        })

        data = await data.json()
        if(data.user)
        {
            localStorage.setItem('user',JSON.stringify(data.user));
            alert("LOged in successful....!")
            navigate("/Order")
        }
        else{
            alert("User not Found")
        }
 


    }



    //check box of password input field    
    function chacked() {
        // login check box
        const passwd = document.getElementById("passwd");
        const chack = document.getElementById("chack");
        passwd.type = chack.checked ? "text" : "password";

    }

    //Register check box  for
    function R_chacked() {     
        const R_passwd = document.getElementById("R_passwd");
        const R_chack = document.getElementById("R_chack");
        R_passwd.type = R_chack.checked ? "text" : "password";

    }

    return (
        <div className="container">
            <div className="topNav">
                <h1 className="topText">
                    <svg id="call-logo" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-forward-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0
                         .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.
                         634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zm10.761.135a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L14.293
                          4H9.5a.5.5 0 0 1 0-1h4.793l-1.647-1.646a.5.5 0 0 1 0-.708z" />
                    </svg> --- Belcake Terdal - 7760454812</h1>
            </div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" width="95" height="40" className="d-inline-block align-text-top" />
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
                                <Link className="nav-link active" data-bs-toggle="modal" data-bs-target="#loginModal">
                                    Login
                                </Link>
                            </li>
                        </ul>
                        <div className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
      
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" id="loginPopUP">
                        <div className="modal-body">
                            <form>
                                <div className="main-123">
                                    <input type="checkbox" id="chk" aria-hidden="true" />
                                    <div className="login-123">
                                        <div className="form-123">
                                            <label htmlFor="chk" aria-hidden="true">Log in</label>
                                            <input className="input" value={L_email} type="email"  onChange={(e)=>{setL_email(e.target.value)}}  autoComplete="current-email" placeholder="Email"/>
                                            {L_error && !L_email && <span id="err"> Enter valid email</span>}
                                            <input className="input" value={L_password}  onChange={(e)=>{setL_password(e.target.value)}} id="passwd" type="password" autoComplete="current-password" placeholder="Password" />
                                            {L_error && !L_password && <span id="err"> Enter valid passwd</span>}
                                            <input type="checkbox" onChange={chacked} id="chack" />

                                            <Link  className="nav-link active" data-bs-toggle="modal" data-bs-target="#loginModal">
                                                Forgot Password
                                            </Link>
                                            <button onClick={Login} type="button">Log in</button>
                                        </div>
                                    </div>

                                    <div className="register-123" >
                                         <div className="form-123">
                                            <label  htmlFor="chk"  aria-hidden="true">Register</label>
                                            <input className="input" type="text" value={userName} onChange={(e) => { setuserName(e.target.value) }} autoComplete="current-userName" placeholder="userName"/>
                                            {error && !userName && <span id="err"> Enter valid name </span>}
                                            <input className="input" type="text" value={mobileNum} onChange={(e) => { setmobileNum(e.target.value) }} placeholder="Mobile Number"/>
                                            {error && !mobileNum && <span id="err"> Enter valid mobileNum </span>}
                                            <input className="input" type="email" value={email} onChange={(e) => { setemail(e.target.value) }} autoComplete="current-email" placeholder="Email"/>
                                            {error && !email && <span id="err"> Enter valid email </span>}
                                            <input className="input" id="R_passwd" type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} autoComplete="current-password" placeholder="Password"/>
                                            {error && !password && <span id="err"> Enter valid password </span>}
                                            <input type="checkbox" onChange={R_chacked} id="R_chack" />

                                            <button type="button" id="registerBtn" onClick={Register}>Register</button>
                                        </div>
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
