import React from "react";
import { useEffect } from "react";
import "./Home.css"
import Footer from "./Footer";

import banner1 from "../img/banner1.jpg";
import banner2 from "../img/banner2.jpg";
import banner3 from "../img/banner3.jpg";
import banner4 from "../img/banner4.jpg";

import cake from "../img/cake-types/cake.jpg"
import pestries from "../img/cake-types/pastries.jpg"
import desert from "../img/cake-types/desert.jpg"

import main_banner from "../img/main_banner.jpg"

import cake1 from "../img/cake1.jpg";
import cake2 from "../img/cake2.jpg"

import prod1 from "../img/products/prod1.png"
import prod2 from "../img/products/prod2.png"
import prod3 from "../img/products/prod3.png"
import prod4 from "../img/products/prod4.png"
import prod5 from "../img/products/prod5.png"
import prod6 from "../img/products/prod6.png"
import prod7 from "../img/products/prod7.png"
import prod8 from "../img/products/prod8.png"


const Home = () => {

    let scrollBtn;
    useEffect(() => {
        scrollBtn = document.getElementById("scroll")
        window.onscroll = function () {
            scrollfun();
        };
    }, []);
    function scrollfun() {
        if (document.body.scrollTop > 35 || document.documentElement.scrollTop > 35) {
            scrollBtn.style.display = "block";
        }
        else {
            scrollBtn.style.display = "none";
        }
    }
    function topscrollfun() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <div className="main">

            {/* belcake terdal titel */}

            <div className="container" id="tdl">
                <h2> <span>B</span>elcake ~<span>T</span>erdal</h2>
            </div>

            {/* carousel imags */}

            <div className="container">
                <div id="carouselExampleIndicators" class="carousel slide  carousel-fade" >
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src={banner2} class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src={banner3} class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src={banner1} class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src={banner4} class="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            {/* scrolling functioin */}

            <div>
                <i class="bi bi-arrow-up-circle-fill" onClick={topscrollfun} id="scroll"></i>
            </div>



            {/* types of cakes */}

            <div class="container text-center">
                <div class="row">
                    <div class="col-12 col-sm-4" id="card1">
                        <img src={cake} id="card-img" alt="..." />
                        <h3>Cake</h3>
                        <p id="passage">Our delicious cake is a form of sweet food made from flour, sugar, and other ingredients, that is usually baked.</p>
                    </div>



                    <div class="col-12 col-sm-4" id="card2">
                        <img src={pestries} id="card-img" alt="..." />
                        <h3>Pestries</h3>
                        <p id="passage">Our pestries collection brings together all of the delicious individual treats that showcase the pestries art.</p>
                    </div>



                    <div class="col-12 col-sm-4" id="card3">
                        <img src={desert} id="card-img" alt="..." />
                        <h3>Desert</h3>
                        <p id="passage">Our desert cakes all make the perfect final to a meal served with lashing of cream for even more indulgence.</p>
                    </div>
                </div>
            </div>

            {/* main banner */}

            <div className="container" >
                <img src={main_banner} id="main-banner" class="img-fluid w-100" alt="..."></img>
            </div>

            {/* two cakes */}
            <div className="container text-center" id="cake">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <img src={cake1} class="img-fluid" width="450px" id="cake1" alt="..." />
                        <h3 id="titel1">Quality Premium Cake</h3>
                    </div>
                    <div className="col-12 col-sm-6">
                        <img src={cake2} class="img-fluid" width="450px" id="cake2" alt="..." />
                        <h3 id="titel2">Sweet & Creamy Cup-Cake</h3>
                    </div>
                </div>
            </div>

            {/* aur products  */}

            <div className="container" >
                <div className="container-fluid">
                    <h1 id="product-head">Our Products</h1>
                </div>

                <div class="card-group">
                    <div class="card">
                        <img src={prod1} class="card-img-top" id="product-imgs" alt="..." />
                    </div>
                    <div class="card">
                        <img src={prod2} class="card-img-top" id="product-imgs" alt="..." />
                    </div>
                    <div class="card">
                        <img src={prod3} class="card-img-top" id="product-imgs" alt="..." />
                    </div>
                    <div class="card">
                        <img src={prod4} class="card-img-top" id="product-imgs" alt="..." />
                    </div>
                </div>
                <div class="card-group">
                    <div class="card">
                        <img src={prod5} class="card-img" id="product-imgs" alt="..." />
                    </div>
                    <div class="card">
                        <img src={prod6} class="card-img" id="product-imgs" alt="..." />
                    </div>
                    <div class="card">
                        <img src={prod7} class="card-img" id="product-imgs" alt="..." />
                    </div>
                    <div class="card">
                        <img src={prod8} class="card-img" id="product-imgs" alt="..." />
                    </div>
                </div>

            </div>

            <div>
              < Footer/>
            </div>
          
        </div>
    )
}

export default Home;