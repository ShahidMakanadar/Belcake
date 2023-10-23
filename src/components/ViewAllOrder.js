import { React, useEffect, useState } from "react";
import "./ViewAllOrder.css"
// import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from "react-spinners/PulseLoader";
import GridLoader from "react-spinners/GridLoader"
import Swal from 'sweetalert2'
import ModalImage from 'react-modal-image';

function ViewAllOrder() {

    const userAuth = JSON.parse(localStorage.getItem('user')) || "";

    // scrolling function
    let scrollBtn =
        //get cakes list
        useEffect(() => {
            getCakeList();

            // Move scrollBtn inside useEffect scope
            scrollBtn = document.getElementById("scroll");

            window.onscroll = function () {
                scrollfun();
            };

        }, []);
    //scrolling function 
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


    //Cake-list rendering  getting cakes in 
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false)
    const [loadingOrderId, setLoadingOrderId] = useState(null);
    const [refreshLoader, setRefreshLoader] = useState(false);
    const [Loading3, setLoading3] = useState(true)
    const [loadingUpdateId, setLoadingUpdateId] = useState(null);


    const getCakeList = async () => {
        setRefreshLoader(true)
        let result = await fetch(`https://belcakeback.vercel.app/getViewAllOrders/${userAuth.email}`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()

        localStorage.setItem('user', JSON.stringify(result.user));
        const newAuth = JSON.parse(localStorage.getItem('user')) || "";
        const checkOrderdItem = newAuth.viewAllOrders || [];
        setList(checkOrderdItem)
        setTimeout(() => {
            setRefreshLoader(false)
        }, 500)

    };

    //handling the Remove order cake  function
    const handleRemoveOrder = async (id) => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'confirmButton', //external css added with class name confirmButton loadingDelete
                cancelButton: 'cancelButton'   //external css added with class name cancelButton
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "Do you want to Remove this Order!",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true)
                    setLoadingOrderId(id)
                    let result = await fetch(`https://belcakeback.vercel.app/RemoveViewAllOrder/${id}/${userAuth._id}`, {
                        method: "DELETE",
                        headers: {
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
                            title: 'Order Removed..successfully'
                        })
                       
                    }
                }
                catch (error) {
                    console.error('Error Removing order cakes:', error);
                }

            }
        })
    };

    // Oeder status Upadating 
    const [selectedStatus, setSelectedStatus] = useState("");
    const [CheckId, setCheckId] = useState("")

    const chancing = (OrderedCakeId, Status) => {
        setSelectedStatus(Status)
        setCheckId(OrderedCakeId)
    }

    //order update status handling function
    const handleSubmitStatus = async (userId, orderId, OrderedCakeId) => {
        if (!selectedStatus) {
            alert("Please select the status to update...!")
        }
        else {
            setLoadingUpdateId(OrderedCakeId)
            setLoading3(true)
            let result = await fetch(`https://belcakeback.vercel.app/updateOrderStatus/${userId}/${orderId}/${OrderedCakeId}`, {
                method: "PUT",
                body: JSON.stringify({ selectedStatus }),
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });

            result = await result.json()
            setLoading3(false)
            setSelectedStatus("")

            if (result.JWT_Err) {
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
                    title: 'Status Updated Successfully.!'
                })
                getCakeList()
            }
        }
    };


    //search function handling
    const searchHandler = async (key) => {
        if (key) {
            try {
                const result = await fetch(`https://belcakeback.vercel.app/searchViewOrder/${key}`);
                const data = await result.json();

                if (Array.isArray(data)) {
                    // Data is an array, so it's the search results
                    setList(data);
                }
                else {
                    // Data is not an array, it might be the full cake list
                    if (data.OrdersList) {
                        setList(data.OrdersList);
                    } 
                    else {
                        // Handle unexpected response
                        console.error('Unexpected response from the server:', data);
                    }
                }
            } 
            catch (error) {
                console.error('Error searching products:', error);
            }
        }
        else {
            // If the search input is empty, fetch the initial list of cakes
            getCakeList();
        }
    };


    return (
        <>
            {
                userAuth.email === process.env.REACT_APP_OWNER_EMAIL ?
                    <div className="container">
                        <section className="banerrr">
                            <div className="hero-content">
                                <h1 id="heade">Users Ordered Cakes </h1>
                            </div>
                        </section>
                        {/**/}

                        {/* serching boox  */}
                        <div className="searchbox123">
                            <form class="form888">
                                <button>
                                    <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                                        <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                                <input class="input888" placeholder="Type your text" onChange={(e) => searchHandler(e.target.value)} required="" type="text" />
                                <button class="reset888" type="reset">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </form>
                        </div>

                        {/* refresh button  */}
                        <div className="butttonDiv">
                            <button class="button33" type="button" onClick={getCakeList}>
                                {
                                    refreshLoader ?
                                        <div class="spinner"></div>
                                        :
                                        <div class="spinnerConstant"></div>
                                }
                                Refresh
                            </button>
                        </div>

                        {/* scrolling functioin */}
                        <div className="">
                            <i className="bi bi-arrow-up-circle-fill" onClick={topscrollfun} id="scroll"></i>
                        </div>

                        {/* display cards  */}
                        <div class="cards123">
                            {
                                Array.isArray(list) && list.length > 0 ?

                                    list.map(items => {

                                        const OrderedCakeId = items._id;
                                        const userId = items.userId;
                                        const orderId = items.orderId;
                                        const img = items.url;
                                        const titl = items.cakeName;
                                        const photoOnCake = items.photoOnCake_URL;
                                        const flavour = items.flavour;
                                        const purpose = items.purpose;
                                        const nameOnCake = items.nameOnCake;
                                        const amount = items.TotalePrice;
                                        const quantity = items.quantity;
                                        const phoneNum = items.phoneNumber;
                                        const fullName = items.fullName;
                                        const address = items.address;
                                        const city = items.city;
                                        const zip = items.zipCode;
                                        const DateTimeString = items.DateTime;
                                        const orderStatus = items.orderStatus;
                                        const razorpay_payment_id = items.paymentDetailes.razorpay_payment_id;

                                        //status managing for changing background colore
                                        const statusOforder = orderStatus === "DPD" ? "UpdateStatusDPD" : orderStatus === "DONE" ? "UpdateStatusDONE" : "UpdateStatus";

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
                                                        <img src={img} id="images1" class="img-fluid rounded-start" alt="..." />
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
                                                            <h6> Name-On-Cake: <span id="spanTag">{nameOnCake}</span></h6>
                                                            <h6> Flavour: <span id="spanTag">{flavour}</span></h6>
                                                            <h6> Purpose: <span id="spanTag">{purpose}</span></h6>
                                                            <p id="addressDetailes"> <span>Address :</span> {fullName} , {phoneNum}  <br></br> {address} , {city} ,{zip}</p>
                                                       
                                                            <div className="payment">
                                                            { 
                                                                razorpay_payment_id === "Cash On Delivery" ?
                                                                    <h6 className="">Payment :<span id="spanTag"> { razorpay_payment_id} </span></h6>
                                                                    :
                                                                    <h6 className="">Payment :<span id="spanTag"> Paid </span>( {razorpay_payment_id} )</h6>
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
                                                            <button className="CancleBtn2" onClick={() => { handleRemoveOrder(OrderedCakeId) }}>
                                                                <span>REMOVE THIS!</span>
                                                            </button>
                                                    }

                                                    <div className={statusOforder}>
                                                        <div class="radio-inputs55">
                                                            <label class="radio55">
                                                                <input type="radio" value="DPD" checked={selectedStatus === "DPD" && CheckId === OrderedCakeId} onChange={() => chancing(OrderedCakeId, "DPD")} />
                                                                <span class="name55">DPD</span>
                                                            </label>

                                                            <label class="radio55">
                                                                <input type="radio" value="DONE" checked={selectedStatus === "DONE" && CheckId === OrderedCakeId} onChange={() => chancing(OrderedCakeId, "DONE")} />
                                                                <span class="name55">DONE</span>
                                                            </label>
                                                        </div>
                                                        <button id="UpdateStatusBtn" type="button" class="btn btn-dark" onClick={() => { handleSubmitStatus(userId, orderId, OrderedCakeId) }}>
                                                            {
                                                                Loading3 && OrderedCakeId === loadingUpdateId ?
                                                                    <div class="spinner-border text-light" id="updateLoader" role="status">
                                                                        <span class="visually-hidden">Loading...</span>
                                                                    </div>
                                                                    :
                                                                    <>
                                                                        UPDATE
                                                                    </>
                                                            }

                                                        </button>
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
                                        <h5>" Oops! empty orders . "</h5>
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

export default ViewAllOrder