import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";

import logo from "../img/logo.png";
import profilePic from "../img/pf-logp.png"
import "./Navbar.css";

import PulseLoader from "react-spinners/PulseLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import BarLoader from "react-spinners/BarLoader";




const Navbar = () => {
    //Register input field and Api
    const [loading1, setLoading1] = useState(false)
    const [userName, setuserName] = useState("");
    const [mobileNum, setmobileNum] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setErrore] = useState('');
    const navigate = useNavigate();

    //phone number regular expression checking
    const phoneRegex = /^\d{10}$/;
    //phone number regular expression checking
    const emailRegex = /.+@gmail\.com$/;
    const passwordRegex = /^(.*?[a-zA-Z\d\W]){3,}.*$/;
    // const params = useParams();

    const Register = async () => {
        if (!userName || !mobileNum || !email || !password) {
            setErrore(true);
            return false;
        }
        else {
            if (!emailRegex.test(email)) {
                toast.warn('Email is not valid form.!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });
                setemail("")
            }
            else if (!phoneRegex.test(mobileNum)) {
                toast.warn('Number is not valid form.!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });
                setmobileNum("")
            }
            else if (!passwordRegex.test(password)) {
                toast.warn('Pasword atleast 3 characters', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });
                setpassword("")
            }
            else {
                setLoading1(true)
                let data = await fetch('https://belcake-ux-git-main-shahidmakanadar.vercel.app/register', {
                    method: 'post',
                    body: JSON.stringify({ userName, mobileNum, email, password }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                data = await data.json()
                setLoading1(false)
                if (data.data) {

                    if (data.data.email === process.env.REACT_APP_OWNER_EMAIL) {

                        localStorage.setItem('user', JSON.stringify(data.data));
                        localStorage.setItem('token',JSON.stringify(data.authKey)); 

                        toast.success("Owner register successful.!", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: "dark",
                        });

                        setTimeout(() => {
                            window.location.reload();
                        }, 2500);
                    }
                    else {
                        localStorage.setItem('user', JSON.stringify(data.data));
                        localStorage.setItem('token',JSON.stringify(data.auth)); 
                        
                        toast.success("🦄Registration is successful..!", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: "dark",
                        });

                        setTimeout(() => {
                            window.location.reload();
                        }, 2500);
                    }
                }
                else {
                    toast.warn('This email already registered...!', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "dark",
                    });

                }
                navigate('/')
                setuserName("")
                setmobileNum("")
                setemail("")
                setpassword("")
            }
        }
    }



    //Login input field and Api
    const [loading2, setLoading2] = useState(false)
    const [L_email, setL_email] = useState("")
    const [L_password, setL_password] = useState("")
    const [L_error, setL_Errore] = useState("")

    const Login = async () => {

        if (!L_email || !L_password) {
            setL_Errore(true);
            return false;
        }

        const email = L_email;
        const password = L_password;
        setLoading2(true)
        let data = await fetch('https://belcake-ux.vercel.app/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        data = await data.json()
        setLoading2(false)

        if (data.user) {
            if (data.user.email === process.env.REACT_APP_OWNER_EMAIL) {

                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token',JSON.stringify(data.auth)); 

                toast.success("Owner login successful.!", {
                    position: "top-center", 
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                })

                setTimeout(() => {
                    window.location.reload();
                }, 2500);
            }
            else {
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token',JSON.stringify(data.auth)); 

                toast.success('🦄 Login Successful....!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });

                setTimeout(() => {
                    window.location.reload();
                }, 2500);
            }
        }
        else {
            toast.error('Invalide emial/password', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });

        }
        navigate("/")
        setL_password("")
        setL_email("")

    }
    const auth = localStorage.getItem('user') || null;

    const Ownerauth = JSON.parse(localStorage.getItem('user')) || " ";
    const userEmail = Ownerauth ? Ownerauth.email : '';


    const ClearUser = () => {
        localStorage.clear();
        navigate('/')
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



    //profile update handleSubmit 
    const [postImage, setPostImage] = useState({ profileImage: "" })

    const handleSubmit = async (id) => {

        if (postImage.profileImage === "") {

            toast.error('Please select image..........!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
        else {

            var base64WithPrefix = postImage.profileImage; // Assuming this includes the data URI prefix
            var base64String = base64WithPrefix.split(',')[1]; // Remove the prefix

            // Remove whitespace and line breaks from the string
            var cleanedBase64String = base64String.replace(/\s/g, '');

            // Decode the cleaned base64 string
            try {
                var bytes = atob(cleanedBase64String);

                // Get the length of the byte array
                var sizeInBytes = bytes.length;

                // Convert bytes to kilobytes (1 KB = 1024 bytes)
                var sizeInKB = sizeInBytes / 1024;
            }
            catch (error) {
                console.error("Error decoding base64:", error);
            }



            if (sizeInKB > 60) {
                toast.warn('Image should be less then 60kb', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });
            }
            else {
                const profileImage = postImage

                let data = await fetch(`https://belcake-ux.vercel.app/profileUpdate/${id}`, {
                    method: 'put',
                    body: JSON.stringify(profileImage),
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

                    }
                })
                data = await data.json()
                if (data.UpdatedData) {
                    localStorage.setItem('user', JSON.stringify(data.UpdatedData));

                    toast.success('Image Uploaded Successful..!', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "dark",
                    });

                    const Ownerauth = JSON.parse(localStorage.getItem('user')) || null;
                    const userEmail = Ownerauth ? Ownerauth.email : '';
                    if (userEmail) {
                        navigate('/');
                    }
                }
                else{
                    alert("please..! login again for security purpose")
                }

            }

        }
    }
    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        const base64 = await converToBase64(file)
        setPostImage({ ...postImage, profileImage: base64 })
    }


    //forgot password function 
    const [forgotEmail, setForgotEmail] = useState("")
    const [emptyEmail, setEmptyEmail] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        if (!forgotEmail) {
            setEmptyEmail(true)
            return false;
        }
        else {
            if (!emailRegex.test(forgotEmail)) {
                toast.warn('Email is not valid form.!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });
                setForgotEmail("")
            }
            else {
                setLoading(true)
                let result = await fetch('https://belcake-ux.vercel.app/forgotPassword', {
                    method: 'post',
                    body: JSON.stringify({ forgotEmail }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                result = await result.json()
                setLoading(false)
                if (result.status === "invalidEmail") {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'error',
                        title: 'This email is not active'
                    })
                }
                else if (result.status === "This email is not existed") {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'error',
                        title: 'This email is not existed'
                    })
                }
                else {
                    if (result.status === "Success") {
                        // successfull alert box
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                        Toast.fire({
                            icon: 'success',
                            title: 'Link send successfully..!'
                        })

                        setForgotEmail("");
                        // navigate('/');
                    }
                    else {
                        console.log("somthing is wrong")
                    }

                }
            }
        }
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

                    <button className="navbar-toggler"
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
                            {
                                !auth ?
                                    <li className="nav-item">
                                        <Link className="nav-link active" data-bs-toggle="modal" data-bs-target="#loginModal">
                                            Login
                                        </Link>
                                    </li>
                                    :
                                    null
                            }
                            {
                                userEmail === process.env.REACT_APP_OWNER_EMAIL ?
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/AddCake">
                                                Add-Cakes
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/ViewAllOrders">
                                                View-Orders
                                            </Link>
                                        </li>
                                    </>
                                    :
                                    null

                            }

                        </ul>

                        <div className="d-flex" >
                            <div class="input-wrapperSearch">
                                <button class="iconSearch">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25px" width="25px">
                                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#fff" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"></path>
                                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#fff" d="M22 22L20 20"></path>
                                    </svg>
                                </button>
                                <input placeholder="search.." class="inputSearch" name="text" type="text" />
                            </div>
                            <div className="profileDiv">
                                <Link className="me-auto ml-auto mr-20" id="pf-portion">
                                    <a class="bi bi-person-lines-fill" href="/" id="prfIcon" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"> </a>
                                </Link>
                            </div>


                        </div>
                    </div>
                </div>
            </nav>

            {/* login modal */}

            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content" id="loginPopUP">
                        <div className="modal-body" id="model-body" >
                            <form>
                                <div className="main-123">
                                    <div class="modal-header" id="LOginHeader">
                                        <img src={logo} width="95" height="40" id="pf-belcake-logo" alt=".."></img>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <input type="checkbox" id="chk" aria-hidden="true" />
                                    <div className="login-123">
                                        <div className="form-123">
                                            <label htmlFor="chk" aria-hidden="true">Log in</label>
                                            <input className="input" value={L_email} type="email" onChange={(e) => { setL_email(e.target.value) }} autoComplete="current-email" placeholder="Email" />
                                            {L_error && !L_email && <span id="err">! Enter valid email</span>}
                                            <input className="input" value={L_password} onChange={(e) => { setL_password(e.target.value) }} id="passwd" type="password" autoComplete="current-password" placeholder="Password" />
                                            {L_error && !L_password && <span id="err">! Enter valid passwd</span>}
                                            <input type="checkbox" onChange={chacked} id="chack" />

                                            <Link className="">
                                                {/* forgot passwd with second model of bootstrap */}
                                                <li type="none" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">
                                                    Forgot Password
                                                </li>
                                            </Link>

                                            <button onClick={Login} type="button">
                                                {
                                                    loading2 ?
                                                        <div className="loading4">
                                                            <PulseLoader
                                                                color={"#b1ffa7"}
                                                                loading={loading2}
                                                                size={10}
                                                                aria-label="Loading Spinner"
                                                                data-testid="loader"
                                                            />
                                                        </div>
                                                        :
                                                        <>
                                                            Log in
                                                        </>
                                                }
                                            </button>

                                        </div>
                                    </div>

                                    <div className="register-123" >
                                        <div className="form-123">
                                            <label htmlFor="chk" aria-hidden="true">Register</label>
                                            <input className="input" type="text" value={userName} onChange={(e) => { setuserName(e.target.value) }} autoComplete="current-userName" placeholder="userName" />
                                            {error && !userName && <span id="err">! Enter valid name </span>}
                                            <input className="input" type="number" value={mobileNum} onChange={(e) => { setmobileNum(e.target.value) }} placeholder="Mobile Number" />
                                            {error && !mobileNum && <span id="err">! Enter valid mobileNum </span>}
                                            <input className="input" type="email" value={email} onChange={(e) => { setemail(e.target.value) }} autoComplete="current-email" placeholder="Email" />
                                            {error && !email && <span id="err">! Enter valid email </span>}
                                            <input className="input" id="R_passwd" type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} autoComplete="current-password" placeholder="Password" />
                                            {error && !password && <span id="err">! Enter valid password </span>}
                                            <input type="checkbox" onChange={R_chacked} id="R_chack" />

                                            <button type="button" id="registerBtn" onClick={Register}>
                                                {
                                                    loading1 ?
                                                        <div className="loading4">
                                                            <PulseLoader
                                                                color={"#b1ffa7"}
                                                                loading={loading1}
                                                                size={10}
                                                                aria-label="Loading Spinner"
                                                                data-testid="loader"
                                                            />
                                                        </div>
                                                        :
                                                        <>
                                                            Register
                                                        </>
                                                }
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* forgot passwd 2nd podel  */}
            <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header" id="forgotHeader">
                            <img src={logo} width="95" height="40" id="pf-belcake-logo" alt=".."></img>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="card  mb-3" id="Description">
                                <div class="card-header">Description !</div>
                                <div class="card-body">
                                    {/* <h5 class="card-title">Fallow the below steps :</h5> */}
                                    <p class="card-text">1) Enter Your Email and Click On "Submit".<br />2) Check Your Email Inbox.<br />
                                        3) Open the Email and Click the Reset Link. <br />4) Reset Your Password and Click On Submit.<br />
                                        5) Login with Your New Password.
                                    </p>
                                </div>
                            </div>
                            <div class="alert alert-danger d-flex align-items-center" id="alertWorn" role="alert">
                                <i class="bi bi-info-circle-fill" id="warning"> </i>
                                <div>
                                    LINK is only valid for 10 minutes
                                </div>
                            </div>

                            <div id="forgotBody">
                                <h4>Enter your registered email :</h4>
                                <input className="input" value={forgotEmail} type="email" onChange={(e) => { setForgotEmail(e.target.value) }}
                                    autoComplete="current-email" placeholder="Enter your registered Email "
                                />
                                <br></br>
                                {emptyEmail && !forgotEmail && <span id="emptyEmail">! Please enter email id</span>}
                                <br></br>

                                {
                                    loading ? <div className="loadingForgot">
                                        <BarLoader
                                            color={"#b30dee"}
                                            loading={loading}
                                            size={15}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div>
                                        :
                                        <button type="button" class="btn btn-outline-success" onClick={handleForgotPassword}> Submit </button>
                                }

                            </div>
                        </div>
                        <div class="modal-footer" id="forgotFooter">
                            <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#loginModal">Back </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* profile offcanvas (side bar) */}

            <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div class="offcanvas-header">
                    <img src={logo} width="95" height="40" id="pf-belcake-logo" alt=".."></img>
                    <button type="button" class="btn-close" id="closeOfcanvas" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <ul class="offcanvas-body" width="100">

                    <div className="pf-user-pf">
                        <br></br>
                        <img src={Ownerauth.profileImage || profilePic} class="offcanvas-title" width="120" height="120" id="profile-pic" alt=".."></img>
                        <h4 id="pf-username">{Ownerauth.userName}</h4>
                        {
                            auth ?
                                <li type="none" id="pf-edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    <i class="bi bi-pencil-square"></i> Edit Profile</li>
                                :
                                null
                        }

                    </div>

                    <li type="none" id="pf-detailes" data-bs-toggle="collapse" href="#collapseExample123" role="button" aria-expanded="false" aria-controls="collapseExample"><i class="bi bi-caret-down-fill">Profile Detailes</i></li>
                    <div class="collapse" id="collapseExample123">
                        <div id="pf-card">
                            <p>UserName : {Ownerauth.userName}</p>
                            <p>Emal : {Ownerauth.email}</p>
                            <p>Mobile : {Ownerauth.mobileNum}</p>
                        </div>
                    </div>

                    {
                        auth ?
                            <Link className="nav-link active" to="/savedCakes"  >
                                <li type="none" id="wishlist" data-bs-dismiss="offcanvas" >
                                    <i class="bi bi-bag-heart-fill"> My Wishlist</i>
                                </li>
                            </Link>
                            :
                            <Link className="nav-link active" data-bs-toggle="modal" data-bs-target="#loginModal">
                                <li type="none" id="wishlist" data-bs-dismiss="offcanvas" >
                                    <i class="bi bi-bag-heart-fill"> My Wishlist</i>
                                </li>
                            </Link>
                    }

                    {
                        auth ?
                            <Link className="nav-link active" to="/OrderdCakesList"  >
                                <li type="none" id="myOrders" data-bs-dismiss="offcanvas">
                                    <i class="bi bi-cart-check-fill"> My Orders</i>
                                </li>
                            </Link>
                            :
                            <Link className="nav-link active" data-bs-toggle="modal" data-bs-target="#loginModal">
                                <li type="none" id="myOrders" data-bs-dismiss="offcanvas">
                                    <i class="bi bi-cart-check-fill"> My Orders</i>
                                </li>
                            </Link>
                    }

                    <li type="none" id="gift"><i class="bi bi-dropbox"> Rewards</i></li>
                    <Link className="nav-link active" to="/Contact">
                        <li type="none" id="contactUs" data-bs-dismiss="offcanvas">
                            <i class="bi bi-envelope-at-fill" > Contact Us</i>
                        </li>
                    </Link>

                    {
                        auth ?

                            <button id="logout-btn">
                                <a href="/" id="logout-btn-link">
                                    <li onClick={ClearUser} type="none" ><i class="bi bi-box-arrow-left">  Logout</i></li>
                                </a>
                            </button>

                            :
                            null
                    }
                </ul>
            </div>

            {/* profile edit model */}

            <ToastContainer />
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-2" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog" id="mainframe">
                    <div class="modal-content" id="frame">
                        <div class="modal-header" id="frameHeader">
                            <h1 class="modal-title fs-5" id="headerh1">Edit Profile</h1>
                            <button type="button" id="headerbtn" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id="frameBody">
                            <div className="pf-edit">
                                <div class="alert alert-danger d-flex align-items-center" id="warningLayout" role="alert">
                                    <i class="bi bi-info-circle-fill" id="warning"> </i>
                                    <div >
                                        You can only update ~ profile image
                                    </div>
                                </div>
                                <p>Emal : {Ownerauth.email} </p>
                                <p>Mobile : {Ownerauth.mobileNum}</p>
                                <p>UserName : {Ownerauth.userName}</p>
                                <p>Upload Profile Picture : </p>
                                <p id="size-warning">*// Image size should be less then 60kb</p>
                                <label htmlFor="file-upload" className="pf-img-lable">
                                    <img src={postImage.profileImage || Ownerauth.profileImage || profilePic} width="110" height="110" id="pf-pic" alt="..."></img>
                                </label>
                                <input type="file" onChange={(e) => { handleFileUpload(e) }} className="input-pf-pic" label="Image" id="file-upload" accept=" .png, .jpeg, .jpg " />
                            </div>
                        </div>
                        <div class="modal-footer" id="frameFooter">
                            <button type="reset" id="footerbtncl" class="btn btn-secondary" data-bs-dismiss="modal">Cancle</button>
                            <button type="submit" id="footerbtnsubmit" onClick={() => handleSubmit(Ownerauth._id)} class="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;


function converToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}
