import React from "react";
import "./Contact.css"
import Footer from "./Footer"

const Contact = () => {
    const DATA = () => [
        console.log("shahid")
    ]
    return (
        <div className="">
            <div className="container">            
                <ul className="nav col-md-6 col-sm-6 justify-content-end list-unstyled d-flex" id="icons">
                    <a href="https://api.whatsapp.com/send?phone=7760454812&text=Hii BelCake Terdal">
                        <li className="bi bi-whatsapp ms-3" id="footer-icon"></li>
                    </a>
                    <a href="https://www.facebook.com/shakur.mujawar">
                        <li className="bi bi-facebook ms-3" id="footer-icon"></li>
                    </a>
                    <a href="https://www.instagram.com/belcakes_terdal">
                        <li className="bi bi-instagram ms-3" id="footer-icon"></li>
                    </a>
                </ul>
                <div className="contact-form">
                    <h2>Contact Us</h2>
                    <form action="#" >
                        <label id="labels" htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" placeholder="belcaketerdal" />

                        <label id="labels" htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="belcaketerdal123@gmail.com" />
                        <label id="labels" htmlFor="inquiry">Select your inquiry:</label>
                        <select id="inquiry" name="inquiry" defaultValue="">
                            <option value="" disabled>Select an option</option>
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Technical Support">Online Support</option>
                            <option value="Billing and Payments">Price - Payments</option>
                            <option value="Feedback and Suggestions">Feedback and Suggestions</option>
                        </select>
                    
                        <label id="labels" htmlFor="message">Message:</label>
                        <textarea id="message" name="message" ></textarea>
                    
                        <button  id="submit" type="submit" onClick={DATA} > SUBMIT </button>
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