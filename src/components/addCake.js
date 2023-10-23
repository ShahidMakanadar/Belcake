import React, { useState } from "react";
import "./addCake.css"
import Footer from "./Footer";
import upload_icon from "../img/upload-icon.jpg"
// import imgs from "../img/cards/card9.jpg"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropagateLoader from "react-spinners/PropagateLoader";
import Swal from 'sweetalert2'


const AddCake = () => {

    const userAuth = JSON.parse(localStorage.getItem('user')) || "";

    const [Image, setImage] = useState("");
    const [cakeName, setCakeName] = useState("");
    const [price, setPrice] = useState("");
    const [photoCake, setPhotoCake] = useState(null)
    const [true_error, setTrueErrore] = useState("")
    const [loading, setLoading] = useState(false)

    //image converting base64
    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        converImageToBase64(file)
    }
    function converImageToBase64(file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            const base64 = fileReader.result;
            setImage(base64)
        }
    }

    //photo cake cheching 
    function handleCheckboxChange() {
        const checkbox = document.getElementById('_checkbox-26');
        const result = checkbox.checked ? 'yes' : 'no';
        setPhotoCake(result);
    }


    const SubmitProduct = async () => {
        if (Image === "") {
            toast.error('Please select image..........!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            return false;

        }
        else if (!cakeName || !price) {
            setTrueErrore(true);
            return false;
        }
        else {

            var base64WithPrefix = Image; // Assuming this includes the data URI prefix
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

                setLoading(true)

                const cakeImage = Image
                let productData = await fetch('https://belcakeback.vercel.app/addCake', {
                    method: 'post',
                    body: JSON.stringify({ cakeImage, cakeName, price, photoCake }),
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                })
                productData = await productData.json()
                if (productData.JWT_Err) {
                    alert("please..! login again for security purpose")
                }
                else {
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
                        title: ' successfully uploaded '
                    })

                    //clear all input fields
                    setImage("")
                    setCakeName("")
                    setPrice("")
                    setLoading(false)
                }
            }
        }

    }

    return (
        <>
            {
                userAuth.email === process.env.REACT_APP_OWNER_EMAIL ?
                    <div className="container">
                        <ToastContainer />
                        <div className="page">
                            <div class="card" id="AddCake">
                                <label htmlFor="img-upload" className="upload-lable">
                                    <img src={Image || upload_icon} width="100%" height="350" id="upload-img" alt="..."></img>
                                </label>
                                <input type="file" className="inpu-upload-pic" onChange={(e) => { handleImageUpload(e) }} label="Image" id="img-upload" accept=" .png, .jpeg, .jpg " />
                            </div>

                            <div class="input-group flex-nowrap">
                                <span class="input-group-text" id="addon-wrapping">@Cake-Name </span>
                                <input type="text" class="form-control" id="inputeField1" value={cakeName} onChange={(e) => { setCakeName(e.target.value) }} placeholder="Username" />
                                {true_error && !cakeName && <span id="errore"> Please enter valid name</span>}
                            </div>

                            <div class="input-group flex-nowrap">
                                <span class="input-group-text" id="addon-wrapping">$ .Rs </span>
                                <input type="number" class="form-control" id="inputeField2" value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder="price" />
                                {true_error && !price && <span id="errore"> Please enter valid price</span>}
                            </div>

                            {/* chech box */}
                            <br></br>
                            <div class="checkbox-wrapper">
                                <h4 id="checkBox" >Is photo-cake ?</h4>
                                <input id="_checkbox-26" type="checkbox" onChange={handleCheckboxChange} />
                                <label for="_checkbox-26">
                                    <div class="tick_mark"></div>
                                </label>
                            </div>

                            {
                                loading ? <div className="loading">
                                    <PropagateLoader
                                        color={"#b30dee"}
                                        loading={loading}
                                        size={15}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </div>
                                    :
                                    <button class="butto" onClick={SubmitProduct}> Add-Cake </button>
                            }


                        </div>

                        <div className="footer">
                            <Footer />
                        </div>
                    </div>
                    :
                    null
            }
        </>
    )
}

export default AddCake;