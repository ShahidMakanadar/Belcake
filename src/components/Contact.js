import React from "react";
import "./Contact.css"

const Contact = () => {
    return (
        <div className="contact">
            <div className='container'>
                <h2>Contact us:</h2>
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control" placeholder="name@example.com" />
                    <br></br>
                    <label  class="form-label">Phone number</label>
                    <input type="number" class="form-control" placeholder="phone number" />
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label class="form-check-label" for="flexRadioDefault1">
                        Are you a Member
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                    <label class="form-check-label" for="flexRadioDefault2">
                        New User
                    </label>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Elaborate your concern</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                    <br></br>
                    <button className='btn btn-primary '>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Contact;