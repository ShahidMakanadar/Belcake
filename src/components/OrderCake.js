import { React, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./OrderCake.css"
import Footer from "./Footer"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import wp from "../img/cards/whatsapp.jpg"

// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RiseLoader from "react-spinners/RiseLoader";
import PuffLoader from "react-spinners//PuffLoader";
import GridLoader from "react-spinners/GridLoader"
import Swal from 'sweetalert2';


//OrderPageConstact imported
import { OrderPageContext } from "../contexts/OrderPageContext";


const OrderCake = () => {

    //useing Context 
    const { setName, setImage, setPrice, setProductId, setPhotoCake } = useContext(OrderPageContext)

    const handleOrderData = (CakeTitle, CakeImg, CakePrz, PId, photoCake) => {
        setName(CakeTitle)
        setImage(CakeImg)
        setPrice(CakePrz)
        setProductId(PId)
        setPhotoCake(photoCake)
    }

    // scrolling function
    let scrollBtn = 
    useEffect(() => {

        getCakeList();

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


    //Cake-list rendering  getting cakes in 
    const [list, setList] = useState([]);

    const getCakeList = async () => {
        try {
            let cakeList = await fetch('http://localhost:10000/cakeList')

            cakeList = await cakeList.json();
            setList(cakeList)

        }
        catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    //deliting cakes
    const [loading, setLoading] = useState(false)
    const [deletedCardId, setDeletedCardId] = useState(null);


    const deleteCake = async (id) => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'confirmButton', //external css added with class name confirmButton loadingDelete
                cancelButton: 'cancelButton'   //external css added with class name cancelButton
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this!",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true)
                setDeletedCardId(id)
                try {
                    let result = await fetch(`http://localhost:10000/deleteCake/${id}`, {
                        method: "DELETE",
                        headers: {
                            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                        }
                    });

                    result = await result.json();
                    if(result.JWT_Err){
                        setLoading(false)
                        alert("please..! login again for security purpose")
                    }
                    else{
                        setLoading(false)
                        setDeletedCardId(null)

                        getCakeList();

                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                        Toast.fire({
                            icon: 'success',
                            title: 'Deleted successfully..! '
                        })
                    }
                }
                catch (error) {
                    console.error('Error deleting product:', error);
                }

            }
        })
    };


    //save ckae handling function 
    const [saveLoading, setSaveLoading] = useState(false)
    const [saveId, setSaveId] = useState(null);
    const userAuth = JSON.parse(localStorage.getItem('user'));

    var cakeSaveHandle = async (productId) => {
        const userId = userAuth._id;
        try {
            setSaveLoading(true)
            setSaveId(productId)
            let result = await fetch(`http://localhost:10000/saveProduct/${productId}/${userId}`, {
                method: "put",
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });

            result = await result.json();
            setSaveLoading(false)
            setSaveId(null)
            if(result.JWT_Err){
                alert("please..! login again for security purpose")
            }
            else if (result.removed) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Removed successfully..! '
                })

                localStorage.setItem('user', JSON.stringify(result.removed));
                getCakeList()

            }
            else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Saved successfully..! '
                })

                localStorage.setItem('user', JSON.stringify(result));
                getCakeList()
            }
        }
        catch (error) {
            console.error('Error deleting product:', error);
        }

    }


    //search function handling
    const searchHandler = async (key) => {
        if (key) {
            try {
                const result = await fetch(`http://localhost:10000/searchCakes/${key}`);
                const data = await result.json();

                if (Array.isArray(data)) {
                    // Data is an array, so it's the search results
                    setList(data);
                } else {
                    // Data is not an array, it might be the full cake list
                    if (data.cakeList) {
                        setList(data.cakeList);
                    } else {
                        // Handle unexpected response
                        console.error('Unexpected response from the server:', data);
                    }
                }
            } catch (error) {
                console.error('Error searching products:', error);
            }
        } else {
            // If the search input is empty, fetch the initial list of cakes
            getCakeList();
        }
    };

    //user auth
    const auth = JSON.parse(localStorage.getItem('user')) || " ";
    const userEmail = auth ? auth.email : '';

    //saved product handle icon colore
    const checkUser = JSON.parse(localStorage.getItem('user')) || " "
    const checkSavedItem = checkUser.savedProducts || [];

    return (
        <div className="container">
            <section className="baner">
                <div className="hero-content">
                    <h1 id="heade">Order Your Quality Premium Cake</h1>
                    <p id="pass">Your Trusted Baking Partner BELCAKE TERDAL</p>
                </div>
            </section>
            {/* serching boox  */}
            <div className="searchbox">
                <div class="input-wrapperOrder">
                    <button class="iconOrder">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25px" width="25px">
                            <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#eeb5e0" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"></path>
                            <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#eeb5e0" d="M22 22L20 20"></path>
                        </svg>
                    </button>
                    <input placeholder="search cakes..." class="inputOrder" type="text" onChange={(e) => searchHandler(e.target.value)} />
                </div>
            </div>

            {/* scrolling functioin */}
            <div className="">
                <i className="bi bi-arrow-up-circle-fill" onClick={topscrollfun} id="scroll"></i>
            </div>

            {/* display cards  */}
            <div div className="row">
                {
                    Array.isArray(list) && list.length > 0 ?

                        list.map(items => {
                            const auth = localStorage.getItem("user")

                            const img = items.cakeImage.url;
                            const titl = items.cakeName;
                            const prz = items.price;
                            const PId = items._id;
                            const photoCake = items.photoCake;

                            // Encode the values and concatenate them with line breaks or a separator
                            const message = `*Cake-Image :* ${encodeURIComponent(img)}%0A%0A`
                                + `*Cake-Name :* ${encodeURIComponent(titl)}%0A%0A`
                                + `*Cake-Price :* ${encodeURIComponent(prz)}%0A%0A`
                                + `Is this available?`;

                            // Create the WhatsApp link with the encoded message
                            const whatsappLink = `https://api.whatsapp.com/send?phone=${process.env.REACT_APP_WHATES_APP_NUM}&text=${message}`;


                            return (
                                <div className="col-12 col-sm-4" >
                                    <p id="cakesId">{items._id}</p>
                                    <div className="carde">
                                        <div className="img" >
                                            {
                                                deletedCardId === items._id && loading ?
                                                    <div className="loadingDelete">
                                                        <RiseLoader
                                                            color={"#ff0000"}
                                                            loading={loading}
                                                            size={15}
                                                            aria-label="Loading Spinner"
                                                            data-testid="loader"
                                                        />
                                                    </div>
                                                    :
                                                    <>
                                                        {
                                                            userEmail === process.env.REACT_APP_OWNER_EMAIL ?
                                                                <div>
                                                                    <i class="bi bi-trash-fill" id="remove-icon" onClick={() => { deleteCake(items._id) }}  ></i>
                                                                </div>
                                                                :
                                                                null
                                                        }

                                                        <img id="card-imgs" src={img} alt="..." ></img>

                                                        {
                                                            userAuth ?
                                                                <div id="save-logo"  >
                                                                    {
                                                                        saveId === items._id && saveLoading ?
                                                                            <div className="saveloading">
                                                                                <PuffLoader
                                                                                    color={"#000000"}
                                                                                    loading={saveLoading}
                                                                                    size={40}
                                                                                    aria-label="Loading Spinner"
                                                                                    data-testid="loader"
                                                                                />
                                                                            </div>

                                                                            :

                                                                            <label class="ui-bookmark">
                                                                                <input type="checkbox" onClick={() => { cakeSaveHandle(items._id) }} />
                                                                                <div class="bookmark">
                                                                                    <svg viewBox="0 0 32 32">
                                                                                        <g>
                                                                                            {
                                                                                                checkSavedItem && checkSavedItem.some(savedItem => savedItem.productId === items._id) ?
                                                                                                    <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 
                                                                                            4-4h14a4 4 0 0 1 4 4z"
                                                                                                        fill="#8A2BE2"></path>
                                                                                                    :
                                                                                                    <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 
                                                                                            4-4h14a4 4 0 0 1 4 4z"
                                                                                                        fill="white"></path>

                                                                                            }

                                                                                        </g>
                                                                                    </svg>
                                                                                </div>
                                                                            </label>
                                                                    }

                                                                </div>
                                                                :
                                                                null
                                                        }

                                                    </>
                                            }

                                        </div>

                                        <div className="text">
                                            <p className="h3">{titl}</p>
                                            <h5> Rs : {prz}</h5>
                                        </div>
                                        <div className="order-btn">
                                            {
                                                auth ?
                                                    <a id="wp_click" href={whatsappLink}>
                                                        <img id="wp_icon" src={wp} alt="....."></img>
                                                    </a>
                                                    :
                                                    <p id="wp_click">
                                                        <Link className="nav-link active" data-bs-toggle="modal" data-bs-target="#loginModal">
                                                            <Tippy content="Only Register/Login user can order" >
                                                                <img id="wp_icon" src={wp} alt="....."></img>
                                                            </Tippy>
                                                        </Link>
                                                    </p>
                                            }

                                            {
                                                auth ?
                                                    <Link className="nav-link active" to="/orderProcess"  >
                                                        <button className="cta" onClick={() => { handleOrderData(titl, img, prz, PId, photoCake) }}>
                                                            <span>Order</span>
                                                            <svg viewBox="0 0 13 10" height="10px" width="15px">
                                                                <path d="M1,5 L11,5"></path>
                                                                <polyline points="8 1 12 5 8 9"></polyline>
                                                            </svg>
                                                        </button>

                                                    </Link>
                                                    :
                                                    <Link className="nav-link active" data-bs-toggle="modal" data-bs-target="#loginModal">
                                                        <button className="cta">
                                                            <span>Order</span>
                                                            <svg viewBox="0 0 13 10" height="10px" width="15px">
                                                                <path d="M1,5 L11,5"></path>
                                                                <polyline points="8 1 12 5 8 9"></polyline>
                                                            </svg>
                                                        </button>
                                                    </Link>
                                            }
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
                            <h5>Cakes are not available...!</h5>
                        </div>
                }
            </div>

            <div className="footer">
                <Footer />
            </div>
        </div>

    )
}


export default OrderCake; 