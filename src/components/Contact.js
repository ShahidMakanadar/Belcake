import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Contact.css"
import Footer from "./Footer"

import PulseLoader from "react-spinners/PulseLoader";

// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
const Contact = () => {

    //user auth
    const auth = JSON.parse(localStorage.getItem('user')) || null;
    const contactEmail = auth ? auth.email : '';
    const contactName = auth ? auth.userName : '';
    const contactUserId = auth ? auth._id : '';

    const [quiry, setQuiry] = useState("General Inquiry")
    const [message, setMessage] = useState("")
    const [error3, setError3] = useState("")
    const [loading, setLoading] = useState(false)

    const submitMessage = async () => {
        if (!message) {
            setError3(true);
            return false;
        }
        else {

            setLoading(true)
            let result = await fetch('http://localhost:10000/sendEmail', {
                method: 'post',
                body: JSON.stringify({ contactUserId, contactName, contactEmail, quiry, message }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            result = await result.json()

            if (result) {
                setLoading(false)
                setMessage("")

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
                    title: ' Email sent successfully '
                })
            }

        }
    }


    return (
        <div className="">
            <div className="container">
                <ul className="nav col-md-6 col-sm-6 justify-content-end list-unstyled d-flex" id="icons2">
                    <ul class="wrapper">
                        <li class="icon facebook" >
                            <span class="tooltip">whatsapp</span>
                            <span>
                            <a href="https://api.whatsapp.com/send?phone=7760454812&text=Hii BelCake Terdal">
                        <li className="bi bi-whatsapp ms-3" id="footer-icon2"></li>
                    </a>
                            </span>
                        </li>
                        <li class="icon twitter">
                            <span class="tooltip">Instagram</span>
                            <span>
                            <a href="https://www.instagram.com/belcakes_terdal">
                        <li className="bi bi-instagram ms-3" id="footer-icon2"></li>
                    </a>
                            </span>
                        </li>
                        <li class="icon instagram">
                            <span class="tooltip">Facebook</span>
                            <span>
                            <a href="https://www.facebook.com/shakur.mujawar">
                        <li className="bi bi-facebook ms-3" id="footer-icon2"></li>
                    </a>
                            </span>
                        </li>
                    </ul>
                    {/* <a href="https://api.whatsapp.com/send?phone=7760454812&text=Hii BelCake Terdal">
                        <li className="bi bi-whatsapp ms-3" id="footer-icon"></li>
                    </a>
                    <a href="https://www.facebook.com/shakur.mujawar">
                        <li className="bi bi-facebook ms-3" id="footer-icon"></li>
                    </a>
                    <a href="https://www.instagram.com/belcakes_terdal">
                        <li className="bi bi-instagram ms-3" id="footer-icon"></li>
                    </a> */}
                </ul>
                <div className="contact-form">
                    <h2>Contact Us</h2>
                    <form action="#" >
                        <label id="labels" htmlFor="username">Username:</label>
                        <input type="text" id="disabledTextInput" name="username" value={contactName} ></input>

                        <label id="labels" htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={contactEmail} />
                        <label id="labels" htmlFor="inquiry">Select your inquiry:</label>
                        <select id="inquiry" name="inquiry" value={quiry} onChange={(e) => { setQuiry(e.target.value) }} >
                            <option value="" disabled>Select an option</option>
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Technical Support">Online Support</option>
                            <option value="Billing and Payments">Price - Payments</option>
                            <option value="Feedback and Suggestions">Feedback and Suggestions</option>
                        </select>

                        <label id="labels" htmlFor="message">Message:</label>

                        {
                            error3
                            &&
                            !message
                            &&
                            <div class="alert alert-danger d-flex align-items-center" id="warningLayout" role="alert">
                                <i class="bi bi-info-circle-fill" id="warning"> </i>
                                <div >
                                    <span id="error3"> Please write your message here.</span>
                                </div>
                            </div>
                        }
                        <textarea id="message" name="message" value={message} onChange={(e) => { setMessage(e.target.value) }}></textarea>
                        {
                            auth ?
                                loading ?
                                    <div className="loading3">
                                        <PulseLoader
                                            color={"#b30dee"}
                                            loading={loading}
                                            size={15}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div>
                                    :
                                    <button id="submit" type="button" onClick={submitMessage} > SUBMIT </button>
                                :
                                <Link className="nav-link active" data-bs-toggle="modal" data-bs-target="#loginModal">
                                    <button id="submit" type="button"  > SUBMIT </button>
                                </Link>
                        }
                    </form>
                </div>
            </div>
            <div className="footer">
                <Footer />
            </div>

        </div>
    )
}

export default Contact;