import { React, useState } from "react";
import "./ForgotPassword.css";
import Footer from "./Footer";
import { useParams, Link } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

const ForgotPassword = () => {
    const {id , token} = useParams()

    //password check box  
    function newPassword_chacked() {
        const passwd = document.getElementById("newPassword");
        const chack = document.getElementById("newPassword_check");
        passwd.type = chack.checked ? "text" : "password";

    }

    //new password function handle
    const [newPassword, setNewPassword] = useState("");
    const [emptyPass, setEmptyPass] = useState(false);

    const PasswordRegex=/^(.*?[a-zA-Z\d\W]){3,}.*$/ 

    const handleNewPassword = async() => {
        if(!newPassword) {
            setEmptyPass(true)
            return false;
        }
        else{

            if(!PasswordRegex.test(newPassword)) {
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
                    title: 'password is not valid form'
                })
                setNewPassword("")
            }
            else {
            
                let result = await fetch(`https://belcakeback.vercel.app/newPassword/${id}/${token}`, {
                    method: 'post',
                    body: JSON.stringify({ newPassword }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                result = await result.json()
                if (result.status === "tokenExpired") {
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
                        title: 'Link expired. try again..!'
                    })
                    setNewPassword("")
                }
                else {
                    if (result.status === "updated successfully") {
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
                            title: 'successfully..! Updated'
                        })

                        var dissableBtn = document.getElementById("FPassLoginbtn")
                        dissableBtn.style.display="block"
                        setNewPassword("")
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
            <div className="container-sm" id="FPassPage">
                <div class="modal-body">
                    <hr></hr>
                    <div class="card  mb-3" id="Description">
                        <div class="card-header">Description !</div>
                        <div class="card-body">
                            <p class="card-text">1) Set Your New Password and Click On Submit.<br />
                                2) Click On (Go To Login Page) button.<br />
                                3) Then Login with Your New Password.
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
                        <h4>Enter your new password :</h4>
                        <input className="input" id="newPassword" value={newPassword} type="password" 
                            onChange={(e) => { setNewPassword(e.target.value)}}
                            placeholder="Enter your new password "
                        />
                        <br></br>
                        <input type="checkbox" onChange={newPassword_chacked} id="newPassword_check" />
                        {emptyPass && !newPassword && <span id="emptyEmail">! Please enter password</span>}
                        <br></br>
                        <button type="button" class="btn btn-outline-success" onClick={handleNewPassword} > Submit </button>
                        <hr></hr>
                        <Link className="navbar-brand" to="/">
                            <button class="btn" id="FPassLoginbtn" >  Go To Login Page </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="footer">
                <Footer />
            </div>
            <ToastContainer />
        </div>
    )
}

export default ForgotPassword;