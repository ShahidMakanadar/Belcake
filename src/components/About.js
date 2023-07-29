import React from "react";
import "./About.css"
import Footer from "./Footer"

const About = () => {
    return (    
            <div className="container">
                <main>
                    <section class="hero">
                        <div class="hero-content">
                            <h1>Welcome to Belcake~Terdal</h1>
                            <p>Your Trusted Baking Partner</p>
                        </div>
                    </section>

                    <section class="about-section">
                        <div class="contain">
                            <h2>About Us</h2>
                            <p>Belcake is a passionate team of bakers dedicated to creating delicious and visually stunning cakes and pastries for all occasions. With a blend of creativity and expertise, we turn your sweetest dreams into reality.</p>
                            <p>Our mission is to bring joy to your celebrations with our mouthwatering treats. Whether it's a birthday, wedding, anniversary, or any other special event, our cakes are designed to make your moments even more memorable.</p>
                        </div>
                    </section>
                </main>

                <div className="footer">
                    <Footer />
                </div>
            </div>



            )
}

            export default About;