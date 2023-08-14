import {React,useEffect } from "react";
import "./OrderCake.css"
import Footer from "./Footer"


import save_icon from "../img/cards/save-icon.svg"
import wp from "../img/cards/whatsapp.jpg"

import card1 from "../img/cards/card1.jpg"
import card2 from "../img/cards/card2.jpg"
import card3 from "../img/cards/card13.jpg"
import card4 from "../img/cards/card14.jpg"
import card5 from "../img/cards/card15.jpg"

const OrderCake = () => {

    // scrolling function
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

    // dynamic cards display

    const CardDetails = [
        {title: "black-forest",price: 100,image: card1},
        {title:"white-forest",price: 200,image: card2},
        {title: "black-chocholate",price: 300,image: card3},
        {title:"rass-malayee",price: 400,image: card4},
        {title:"stroberry",price: 500,image: card5}

    ]

    return (
        <div className="container">
                <section class="baner">
                    <div class="hero-content">
                        <h1 id="heade">Order Your Quality Premium Cake</h1>
                        <p id="pass">Your Trusted Baking Partner BELCAKE TERDAL</p>
                    </div>
                </section>

             {/* scrolling functioin */}

                <div>
                    <i class="bi bi-arrow-up-circle-fill" onClick={topscrollfun} id="scroll"></i>
                </div>
                        
             {/* display cards  */}
                <div class="row">
                    {CardDetails.map(items => {

                            // const img = "https://i.postimg.cc/ZqS9p4kk/card1.jpg";  
                            //static image not showing in whats app
                            //  image must hosted then only it shows in whats app and must be url contain img-name.jpg or png
                            const img = items.image;
                            const titl = items.title;
                            const prz = items.price;

                            const wpLink = [img,titl,prz]
                         
                            return(
                                <div class="col-12 col-sm-4">
                                    <div class="carde">
                                        <div class="img" >
                                            <img id="card-imgs" src={img} alt="..." ></img>
                                            <p id="save-logo">
                                                <img id="save-icon" src={save_icon}  alt="..." ></img>                               
                                            </p>
                                        </div>

                                        <div class="text">
                                            <p class="h3">{titl}</p>
                                            <h5> Rs : {prz}</h5>
                                        </div>
                                        <div className="order-btn">

                                            <a  href={`https://api.whatsapp.com/send?phone=7760454812&text=${encodeURIComponent(wpLink)}`}>
                                                <img id="wp_icon" src={wp} alt="....."></img>
                                            </a>
                                            
                                            <button class="cta">
                                                <span>Order</span>
                                                <svg viewBox="0 0 13 10" height="10px" width="15px">
                                                    <path d="M1,5 L11,5"></path>
                                                    <polyline points="8 1 12 5 8 9"></polyline>
                                                </svg>
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            );
                        } )
                    }
                </div>

                
            <div className="footer">
                <Footer />
            </div>
        </div>
    

    )
}

export default OrderCake;