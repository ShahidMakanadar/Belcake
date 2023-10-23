import { React, useEffect, useState } from "react";
import "./OrderdCakesList.css"
// import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from "react-spinners/PulseLoader";
import GridLoader from "react-spinners/GridLoader"
import Swal from 'sweetalert2'
import ModalImage from 'react-modal-image';

function OrderdCakesList() {

    const userAuth = JSON.parse(localStorage.getItem('user')) || "";

    //get cakes list
    useEffect(() => {
        getCakeList();
    }, []);

    //Cake-list rendering  getting cakes in 
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false)
    const [loadingOrderId, setLoadingOrderId] = useState(null);

    const getCakeList = async () => {
        let result = await fetch(`https://belcake-ux.vercel.app/getOrderedList/${userAuth._id}`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()

        localStorage.setItem('user', JSON.stringify(result.user));
        const newAuth = JSON.parse(localStorage.getItem('user')) || "";
        const checkOrderdItem = newAuth.orderProducts || [];
        setList(checkOrderdItem)
    };

    //handling the Remove order cake  function
    const handleRemoveOrder = async (id, photoOnCake_Id, url, titl, photoOnCake, flavour, purpose, nameOnCake, quantity, amount, fullName, city, phoneNum) => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'confirmButton', //external css added with class name loadingDelete
                cancelButton: 'cancelButton'   //external css added with class name cancelButton
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "Do you want to Cancle this Order!",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true)
                    setLoadingOrderId(id)
                    let result = await fetch(`https://belcake-ux.vercel.app/RemoveOrderCake/${id}/${userAuth._id}`, {
                        method: "DELETE",
                        body: JSON.stringify({ photoOnCake_Id, url, titl, photoOnCake, flavour, purpose, nameOnCake, quantity, amount, fullName, city, phoneNum }),
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                        }
                    });

                    result = await result.json();
                    setLoading(false)
                    if (result.JWT_Err) {
                        alert("please..! login again for security purpose")
                    }
                    else {
                        localStorage.setItem('user', JSON.stringify(result));
                        getCakeList();
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
                            title: 'Order Cancelled. Check your Email Box...!'
                        }) 
                    }
                }
                catch (error) {
                    console.error('Error Removing order cakes:', error);
                }

            }
        })
    };

    return (

        <>
            {
                userAuth ?
                    <div className="container">
                        <section className="banerrr">
                            <div className="hero-content">
                                <h1 id="heade">Your Ordered Cakes </h1>
                            </div>
                        </section>

                        {/* display cards  */}
                        <div class="cards123">
                            {
                                Array.isArray(list) && list.length > 0 ?

                                    list.map(items => {

                                        const OrderedCakeId = items._id;
                                        const photoOnCake_Id = items.photoOnCake_Id;
                                        const img = items.url;
                                        const titl = items.cakeName;
                                        const photoOnCake = items.photoOnCake_URL;
                                        const flavour = items.flavour;
                                        const purpose = items.purpose;
                                        const nameOnCake = items.nameOnCake;
                                        const amount = items.TotalePrice;
                                        const quantity = items.quantity;
                                        const phoneNum = items.addressDetailes.phoneNumber;
                                        const fullName = items.addressDetailes.fullName;
                                        const city = items.addressDetailes.city;
                                        const DateTimeString = items.DateTime;
                                        const OrderStatus = items.orderStatus;
                                        const razorpay_payment_id = items.paymentDetailes.razorpay_payment_id;

                                        // Convert the date string to a JavaScript Date object
                                        const DateTime = new Date(DateTimeString);

                                        // Check if DateTime is a valid Date object
                                        if (DateTime instanceof Date && !isNaN(DateTime)) {
                                            // Format the date
                                            var formattedDate = `${DateTime.getDate()}/${DateTime.getMonth() + 1}/${DateTime.getFullYear()}`;
                                            // Format the time
                                            var formattedTime = `${DateTime.getHours()}:${String(DateTime.getMinutes()).padStart(2, '0')}`;
                                        }

                                        return (

                                            <div class="card mb-4" id="card123" key={OrderedCakeId} >
                                                <div class="row g-0">
                                                    <div class="col-4">
                                                        <img src={img} id="images" class="img-fluid rounded-start" alt="..." />
                                                    </div>
                                                    <div class="col-8">
                                                        <div class="card-body" id="CardBody">
                                                            <span id="dateTime">{formattedDate}  - ({formattedTime})</span>
                                                            <h6> Cake Name: <span id="spanTag">{titl}</span></h6>
                                                            <h6> Total Amt: <span id="spanTag">{amount}</span> ({quantity}kg)</h6>
                                                            {
                                                                photoOnCake === "Plain-cake" ?
                                                                    null
                                                                    :
                                                                    <h6> Photo-On-Cake:
                                                                        <div className="photoOnCake">
                                                                            <ModalImage
                                                                                small={photoOnCake}
                                                                                large={photoOnCake}
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                    </h6>
                                                            }
                                                            <h6>Name-On-Cake : <span id="spanTag">{nameOnCake}</span></h6>
                                                         
                                                            <div>
                                                                {
                                                                    razorpay_payment_id === "Cash On Delivery" ?
                                                                        <h6 className="">Payment : <span id="spanTag"> { razorpay_payment_id} </span></h6>
                                                                        :
                                                                        <h6 className="">Payment :<span id="spanTag"> Paid </span>(id = {razorpay_payment_id})</h6>
                                                                }
                                                            </div>                                                          
                                                        </div>
                                                    </div>
                                                    {
                                                        loading && OrderedCakeId === loadingOrderId ?
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
                                                            // CANCLE button  
                                                            <button className="CancleBtn" onClick={() => { handleRemoveOrder(OrderedCakeId, photoOnCake_Id, img, titl, photoOnCake, flavour, purpose, nameOnCake, quantity, amount, fullName, city, phoneNum) }}>
                                                                <span>CANCLE!</span>
                                                            </button>
                                                    }
                                                    <div className="OrderStatus">
                                                        <h6>ORDER-STATUS = : 
                                                            {
                                                                OrderStatus === "DONE" ?
                                                                    <span id="StatusOfOrderDelivered"> Delivered</span>
                                                                :
                                                                OrderStatus === "DPD" ?
                                                                    <span id="StatusOfOrderDispatched"> Dispatched</span>
                                                                :
                                                                <span id="StatusOfOrder"> Being Prepared</span>
                                                            }
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>

                                        );
                                    })

                                    :

                                    <div className="loading2">
                                        <GridLoader
                                            color={"#b30dee"}
                                            loading={true}
                                            size={23}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                        <h5>"Oops! haven't Orderd any cakes yet. Let's start Ordering some tasty Cakes!"</h5>
                                    </div>
                            }
                            <br></br>
                            <br></br>
                        </div>

                    </div>
                    :
                    null
            }
        </>
    )
}

export default OrderdCakesList