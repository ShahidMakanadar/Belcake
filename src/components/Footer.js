import React from "react";
import "./Footer.css"
import logo from "../img/logo.png"
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div className="container" id="Footer">
            <div class="container">
                <footer class="d-flex flex-wrap justify-content-between align-items-center py-4 my-4 border-top" id="footerLayer">
                    <div class="col-md-6 col-sm-6  d-flex align-items-center" id="footerLogoName">
                    <img src={logo} alt="Logo" width="95" height="40" class="d-inline-block align-text-top" />
                    <span class="mb-3 mb-md-0 text-muted" id="name">© 2023 Belcake ~ Terdal</span>
                    </div>

                    <ul class="nav col-md-6 col-sm-6 justify-content-end list-unstyled d-flex" id="icons">
                        <Link> <li class="bi bi-whatsapp ms-3" id="footer-icon"></li> </Link>
                        <Link  to="https://www.instagram.com/"  > <li class="bi bi-instagram ms-3" id="footer-icon" ></li> </Link>
                        <Link> <li class="bi bi-google ms-3" id="footer-icon"></li> </Link>
                    </ul>
                </footer>
            </div>
        </div>


    )
}

export default Footer;