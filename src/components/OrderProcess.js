import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderProcess.css"
import RazorpayLogo from "../img/payment icons/RazorpayLogo.png";
import Footer from "../components/Footer"
import phonepay from "../img/payment icons/phonepe.png";
import googlepay from "../img/payment icons/googlepay.png";
import paytm from "../img/payment icons/paytm2.jpg";
import cash from "../img/payment icons/cash.png"
import upload_icon from "../img/upload-icon.jpg"

import PulseLoader from "react-spinners/PulseLoader";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';

//OrderPageConstact imported
import { OrderPageContext } from "../contexts/OrderPageContext";


const OrderProcess = () => {

    const auth = JSON.parse(localStorage.getItem('user')) || null;
    const navigate = useNavigate();

    //context Order page DATA use 
    const { Name, Image, Price, ProductId, photoCake } = useContext(OrderPageContext);

    const [selectedQuantity, setSelectedQuantity] = useState(1);
    let finelCakePrice = Price * selectedQuantity
    let TotalPrice = finelCakePrice + 30
    const handleQuantityChange = (quantity) => {
        setSelectedQuantity(quantity);
    };

    //inputs data handling
    const [photo, setPhoto] = useState("");
    const [nameOnCake, setNameOnCake] = useState("")
    const [flavour, setFlavour] = useState("Rasmalai cake")
    const [purpose, setPurpose] = useState("Birth Day Cake")
    const [fullName, setFullName] = useState("")
    const [phoneNmuber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [zip, setZip] = useState("")
    const [error, setErrore] = useState("")
    const [loading, setLoading] = useState(false)

    // uploaded photo handling 
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
            setPhoto(base64)
        }
    }

    //Payment method handling
    const [paymentMethod, setPaymentMethod] = useState("")

    //handle order
    const handleOrder = async () => {

        if ((!photo && photoCake === 'yes') || !nameOnCake || !fullName || !phoneNmuber || !address || !city || !zip) {
            setErrore(true);
            return false;
        }
        else {
            if (photoCake === 'yes') {
                var base64WithPrefix = photo; // Assuming this includes the data URI prefix
                var base64String = base64WithPrefix.split(',')[1]; // Remove the prefix

                // Remove whitespace and line breaks from the string
                var cleanedBase64String = base64String.replace(/\s/g, '');

                // Decode the cleaned base64 string
                var bytes = atob(cleanedBase64String);

                // Get the length of the byte array
                var sizeInBytes = bytes.length;

                // Convert bytes to kilobytes (1 KB = 1024 bytes)
                var sizeInKB = sizeInBytes / 1024;
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
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'confirmButton', //external css added with class name confirmButton loadingDelete
                        cancelButton: 'cancelButton'   //external css added with class name cancelButton
                    },
                    buttonsStyling: false
                })
                swalWithBootstrapButtons.fire({
                    title: 'Are you sure?',
                    text: "Do you want to place this order.!",
                    // icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancle',
                    reverseButtons: true
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            if (paymentMethod === "Payment") {
                                setLoading(true)
                                let getkey = await fetch('https://belcakeback.vercel.app/getKey')
                                let OrderData = await fetch(`https://belcakeback.vercel.app/checkout/${ProductId}`, {
                                    method: "POST",
                                    body: JSON.stringify({ selectedQuantity }),
                                    headers: {
                                        "Content-Type": "application/json",
                                        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                                    }
                                })
                                getkey = await getkey.json()
                                OrderData = await OrderData.json()
                                setLoading(false)
                                if (OrderData.JWT_Err) {
                                    alert("please..! login again for security purpose")
                                }
                                else {
                                    var options = {
                                        key: getkey.key,
                                        amount: OrderData.amount,
                                        currency: "INR",
                                        name: "Belcake Terdal",
                                        description: "Belcake Terdal, Online Cake Ordering",
                                        image: RazorpayLogo,
                                        order_id: OrderData.id,
                                        handler:  async(response)=>{
                                            const razorpay_payment_id= response.razorpay_payment_id;
                                            const razorpay_order_id=  response.razorpay_order_id
                                            const razorpay_signature=  response.razorpay_signature
                                            if(razorpay_payment_id && razorpay_order_id && razorpay_signature){
                                                let responseVerification = await fetch('https://belcakeback.vercel.app/Verification',{
                                                    method: 'post',
                                                    body: JSON.stringify({razorpay_order_id, razorpay_payment_id, razorpay_signature}),
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    }
                                                })
                                                responseVerification = await responseVerification.json()
                                                if(responseVerification.success)
                                                {
                                                    console.log("payment verified ")
                                                    handleSavingOrder(razorpay_payment_id, razorpay_order_id)
                                                }
                                                else{
                                                    setLoading(false)
                                                    alert("payment verification is false : please try")
                                                }
                                            }
                                        },
                                        prefill: {
                                            name: fullName,
                                            email: auth.email,
                                            contact: phoneNmuber
                                        },
                                        notes: {
                                            "address": " belcake terdal @RazorpayCorporateOffice"
                                        },
                                        theme: {
                                            "color": "#C043D0"
                                        }
                                    };
                                    const razor = new window.Razorpay(options);
                                    razor.open();
                                    //calling order save fuction
                                    // if()
                                }
                            }
                            else {
                                handleSavingOrder()
                            }
                        }
                        catch (error) {
                            console.error('Error place order :', error);
                        }

                    }
                    else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        navigate('/Order')
                        swalWithBootstrapButtons.fire(
                            'Cancelled',
                            'order is cancelled -:)',
                            'error'
                        )
                    }
                })
            }
        }
    }

    //order saving and placing call back 
    const handleSavingOrder = async ( razorpay_payment_id, razorpay_order_id) => {
        const photoOnCake = photo;
        setLoading(true)
        let result = await fetch(`https://belcakeback.vercel.app/OrderPlace/${auth._id}/${ProductId}`, {
            method: 'post',
            body: JSON.stringify({ selectedQuantity, photoOnCake, flavour, purpose, nameOnCake, fullName, phoneNmuber, address, city, zip ,razorpay_payment_id, razorpay_order_id}),
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

        });

        result = await result.json();

        if (result.JWT_Err) {
            setLoading(false)
            alert("please..! login again for security purpose")
        }
        else if (result) {
            localStorage.setItem('user', JSON.stringify(result));
            const tempAuth = JSON.parse(localStorage.getItem('user')) || null;
            const findcurrentOrder = tempAuth.orderProducts;
            const SelectCurrentOrder = findcurrentOrder[findcurrentOrder.length - 1];
            const currentOrderId = SelectCurrentOrder._id;

            let finalResult = await fetch(`https://belcakeback.vercel.app/OrderPlaceOwner/${tempAuth._id}/${currentOrderId}`, {
                method: 'get'
            })
            finalResult = await finalResult.json()
            setLoading(false)
            if (finalResult) {
                navigate('/OrderdCakesList')
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Order Placed Successfully',
                    showConfirmButton: false,
                    timer: 5000
                  })
               
            }
            else {
                alert("errore in :localhost:10000/OrderPlaceOwner")
            }
        }
        else {
            alert("please..! login again for security purpose")
        }
    }

    return (

        <>
            {
                auth ?
                    <div class="container" >
                        <ToastContainer />
                        <div id="mainCantainer">
                            <div class="container row" id="mainRoe">

                                {/* RUGHT SIDE */}
                                <div class="col-sm-4" id="rightSide">
                                    <div className="text-center">
                                        <br></br>
                                        <h4 id="orderName"> {Name} </h4>
                                        <img id="cakeImageSize" src={Image} alt="..." ></img>
                                        <h6 id="orderPrice">for <span id="priceSpanFonts"> {selectedQuantity} </span> Kg = <span id="priceSpanFonts"> {finelCakePrice} </span></h6>
                                    </div>

                                    {/* selection of quantity  */}
                                    <br></br>
                                    <h6>select the quantity :</h6>
                                    <div class="radio-input321">
                                        {
                                            [0.5, 1, 1.5, 2, 3,].map((quantity, index) => (
                                                <label key={index}>
                                                    <input
                                                        type="radio"
                                                        id={`value321-${index + 1}`}
                                                        name="value-radio"
                                                        value={quantity}
                                                        checked={selectedQuantity === quantity}
                                                        onChange={() => handleQuantityChange(quantity)}
                                                    />
                                                    <span>{quantity} kg</span>
                                                </label>
                                            ))
                                        }
                                        <span class="selection321"></span>
                                    </div>


                                    {/* choose the photo on cake   */}
                                    {
                                        photoCake === 'yes' ?
                                            <>
                                                <br></br>
                                                <h6>Select photo to print on cake :</h6>
                                                <div id="AddCake2">
                                                    <label htmlFor="img-upload2" className="upload-lable2">
                                                        <img src={photo || upload_icon} width="50" height="50" id="upload-img2" alt="..."></img>
                                                        <br></br>
                                                        <h6 id="imageText">Photo <span id="spanImgSize" >less then 60kb</span></h6>
                                                    </label>
                                                    <input type="file" className="inpu-upload-pic2" onChange={(e) => { handleImageUpload(e) }} label="Image" id="img-upload2" accept=" .png, .jpeg, .jpg " />
                                                </div>
                                                {error && !photo && <span id="err">! please choose a photo</span>}
                                            </>
                                            :
                                            null
                                    }


                                    {/* Select Flavour section */}
                                    <br></br>
                                    <h6>Select Flavour :</h6>
                                    {/* <label id="labels" htmlFor="inquiry2">Select Flavour :</label> */}
                                    <select id="flavourSelector" name="inquiry2" value={flavour} onChange={(e) => { setFlavour(e.target.value) }} >
                                        <option value="" disabled>Select an option</option>
                                        <option value="Rasmalai">Rasmalai </option>
                                        <option value="Pineapple">Pineapple </option>
                                        <option value="Black Forest">Black Forest </option>
                                        <option value="Butterscotch">Butterscotch </option>
                                        <option value="Red Velvet">Red Velvet </option>
                                        <option value="Vanilla">Vanilla </option>
                                        <option value="Strawberry">Strawberry </option>
                                        <option value="Fruit">Fruit Cake</option>
                                        <option value="Blueberry">Blueberry </option>
                                        <option value="Chocolate">Chocolate </option>
                                        <option value="Dark Black">Dark Black </option>
                                    </select>

                                    {/* Select Select purpose of cake */}
                                    <br></br>
                                    <br></br>
                                    <h6>Select purpose of cake :</h6>
                                    {/* <label id="labels" htmlFor="inquiry3">Select purpose of cake :</label> */}
                                    <select id="purposeSelector" name="inquiry3" value={purpose} onChange={(e) => { setPurpose(e.target.value) }} >
                                        <option value="" disabled >Select an option</option>
                                        <option value="Birth Day Cake">Birth Day Cake</option>
                                        <option value="Wedding Cake">Wedding Cake</option>
                                        <option value="Anniversary Cake">Anniversary Cake</option>
                                        <option value="Party Cake">Party Cake</option>
                                        <option value="None">None</option>
                                    </select>

                                    {/* taking name to print on cake  */}
                                    <br></br>
                                    <br></br>
                                    <h6>Message on cake :</h6>
                                    <input type="text" id="nameOnCake" placeholder="Enter Message on cake" onChange={(e) => { setNameOnCake(e.target.value) }} class="form-control" />
                                    {error && !nameOnCake && <span id="err">! Enter name to print on cake</span>}

                                    {/* Coupons apply */}
                                    <div class="card coupons" id="orderCoupon" aria-disabled>
                                        <div class="input-group mb-3" id="CouponInputGroup">
                                            <button class="btn btn-primary" type="button" id="button-addon1">Apply</button>
                                            <input type="text" class="form-control" id="couponInput" placeholder="apply coupon code" aria-describedby="button-addon1" />
                                        </div>
                                    </div>

                                </div>


                                {/* RUGHT SIDE */}
                                <div class="col-sm-8" id="leftSide">

                                    {/* amount details */}
                                    <div class="card checkout">
                                        <h5 class="title">Amount details</h5>
                                        <div class="details">
                                            <span>Your cake subtotal:</span>
                                            <span>{finelCakePrice}</span>
                                            <span>Coupons discount:</span>
                                            <span>0.00</span>
                                            <span>Shipping fees:</span>
                                            <span>30</span>
                                        </div>
                                        <div class="checkout--footer">
                                            <label class="price">Total =  {TotalPrice}</label>
                                        </div>
                                    </div>

                                    {/* address details */}
                                    <div class="AddressMain" aria-disabled>
                                        <h5 class="titleAddress">Address details</h5>
                                        <form class="row g-2">
                                            <div class="col-md-6">
                                                <input type="text" placeholder="Full Name" onChange={(e) => { setFullName(e.target.value) }} class="form-control" />
                                                {error && !fullName && <span id="err">! Enter full name</span>}
                                            </div>
                                            <div class="col-md-6">
                                                <input type="number" placeholder="Phone number" onChange={(e) => { setPhoneNumber(e.target.value) }} class="form-control" />
                                                {error && !phoneNmuber && <span id="err">! Enter phoneNmuber</span>}
                                            </div>

                                            <div class="col-12">
                                                <input type="text" class="form-control" onChange={(e) => { setAddress(e.target.value) }} id="inputAddress2" placeholder="Full address( home,srt,village )" />
                                                {error && !address && <span id="err">! Enter address</span>}
                                            </div>
                                            <div class="col-md-6">
                                                <input type="text" class="form-control" onChange={(e) => { setCity(e.target.value) }} placeholder="City" id="inputCity" />
                                                {error && !city && <span id="err">! Enter city</span>}
                                            </div>

                                            <div class="col-md-3">
                                                <input type="text" class="form-control" onChange={(e) => { setZip(e.target.value) }} placeholder="ZIP Code" id="inputZip" />
                                                {error && !zip && <span id="err">! Enter zip</span>}
                                            </div>
                                        </form>
                                    </div>

                                    {/* payment method  */}
                                    <div class="AddressMain" >
                                        <h5 class="titleAddress">Select Payment Method</h5>
                                        <div className="payment-selection">
                                            <div class="alert alert-danger d-flex align-items-center" id="alertWorn" role="alert">
                                                <i class="bi bi-info-circle-fill" id="warning"> </i>
                                                <div>
                                                    Only "Cash on Delivery"
                                                </div>
                                            </div>
                                            <div className="row text-center">
                                                <div className="col-sm-12">
                                                    <div className="payment-option" disabled>
                                                        <input type="radio" value="Payment" onChange={(e) => { setPaymentMethod(e.target.value) }} id="phonepe" name="payment" />
                                                        <label htmlFor="phonepe">
                                                            <img src={phonepay} alt="PhonePe" />
                                                            <span>PhonePe</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12" disabled>
                                                    <div className="payment-option ">
                                                        <input type="radio" value="Payment" onChange={(e) => { setPaymentMethod(e.target.value) }} id="googlepay" name="payment" />
                                                        <label htmlFor="googlepay">
                                                            <img src={googlepay} alt="Google Pay" />
                                                            <span>Google Pay</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12" disabled>
                                                    <div className="payment-option ">
                                                        <input type="radio" value="Payment" onChange={(e) => { setPaymentMethod(e.target.value) }} id="paytm" name="payment" />
                                                        <label htmlFor="paytm">
                                                            <img src={paytm} alt="Paytm" />
                                                            <span>Paytm pay</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12" >
                                                    <div className="payment-option">
                                                        <input type="radio" value="" id="cashondelivery" onChange={(e) => { setPaymentMethod(e.target.value) }} name="payment" defaultChecked />
                                                        <label htmlFor="cashondelivery">
                                                            <img src={cash} alt="Cash on Delivery" />
                                                            <span>Cash on Delivery</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                    {
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
                                            // order button  
                                            <button class="buttonOrder" type="submit" onClick={() => { handleOrder() }}>
                                                Order
                                            </button>
                                    }

                                </div>
                            </div>
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

export default OrderProcess;