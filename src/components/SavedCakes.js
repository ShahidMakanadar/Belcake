import "./SavedCakes.css"
import { React, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./OrderCake.css"
import Footer from "./Footer"
import wp from "../img/cards/whatsapp.jpg"

// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GridLoader from "react-spinners/GridLoader"
import Swal from 'sweetalert2'
import PuffLoader from "react-spinners//PuffLoader";

//OrderPageConstact imported
import { OrderPageContext } from "../contexts/OrderPageContext";


const SavedCakes = () => {

    //useing Context 
    const { setName, setImage, setPrice } = useContext(OrderPageContext)
    const handleOrderData = (CakeTitle, CakeImg, CakePrz) => {
        setName(CakeTitle)
        setImage(CakeImg)
        setPrice(CakePrz)
    }

    //get cakes list
    useEffect(() => {

        getCakeList();

    }, []);


    //Cake-list rendering  getting cakes in 
    const [list, setList] = useState([]);

    const getCakeList = async () => {
        const checkUser = JSON.parse(localStorage.getItem('user')) || " ";
        const checkSavedItem = checkUser.savedProducts || [];
        setList(checkSavedItem)
    };


    //save ckae handling function 
    const [saveLoading, setSaveLoading] = useState(false)
    const [saveId, setSaveId] = useState(null);

    const userAuth = JSON.parse(localStorage.getItem('user')) || "";

    var cakeSaveHandle = async (productId) => {

        const userId = userAuth._id;
        try {
            setSaveLoading(true)
            setSaveId(productId)

            let result = await fetch(`https://belcakeback.vercel.app/saveProduct/${productId}/${userId}`, {
                method: "put",
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });

            result = await result.json();
            setSaveLoading(false)
            setSaveId(null)
            if (result.removed) {
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
            else{
                alert("please..! login again for security purpose")
            }
        }
        catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    return (

        <>
            {
                userAuth ?
                    <div className="container">
                        <section className="banerrr">
                            <div className="hero-content">
                                <h1 id="heade">Order Your Saved Cakes Today</h1>
                            </div>
                        </section>

                        {/* display cards  */}
                        <div div className="row">
                            {
                                Array.isArray(list) && list.length > 0 ?

                                    list.map(items => {

                                        const img = items.url;
                                        const titl = items.cakeName;
                                        const prz = items.price;

                                        // Encode the values and concatenate them with line breaks or a separator
                                        const message = `*Cake-Image :* ${encodeURIComponent(img)}%0A%0A`
                                            + `*Cake-Name :* ${encodeURIComponent(titl)}%0A%0A`
                                            + `*Cake-Price :* ${encodeURIComponent(prz)}%0A%0A`
                                            + `Is this available?`;

                                        // Create the WhatsApp link with the encoded message
                                        const whatsappLink = `https://api.whatsapp.com/send?phone=${process.env.REACT_APP_WHATES_APP_NUM}&text=${message}`;

                                        return (
                                            <div className="col-12 col-sm-4" >
                                                <p id="cakesId">{items.productId}</p>
                                                <div className="carde">
                                                    <div className="img" >
                                                        <img id="card-imgs" src={img} alt="..." ></img>
                                                        <div id="save-logo">
                                                            {
                                                                saveId === items.productId && saveLoading ?
                                                                    <div className="saveloading">
                                                                        <PuffLoader
                                                                            color={"#0ea093"}
                                                                            loading={saveLoading}
                                                                            size={40}
                                                                            aria-label="Loading Spinner"
                                                                            data-testid="loader"
                                                                        />
                                                                    </div>

                                                                    :

                                                                    <label class="ui-bookmark">
                                                                        <input type="checkbox" onClick={() => { cakeSaveHandle(items.productId) }} />
                                                                        <div class="bookmark">
                                                                            <svg viewBox="0 0 32 32">
                                                                                <g>
                                                                                    <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 
                                                                            4-4h14a4 4 0 0 1 4 4z"
                                                                                        fill="#8A2BE2"></path>
                                                                                </g>
                                                                            </svg>
                                                                        </div>
                                                                    </label>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="text">
                                                        <p className="h3">{titl}</p>
                                                        <h5> Rs : {prz}</h5>
                                                    </div>
                                                    <div className="order-btn">

                                                        <a id="wp_click" href={whatsappLink}>
                                                            <img id="wp_icon" src={wp} alt="....."></img>
                                                        </a>

                                                        <Link className="nav-link active" to="/orderProcess"  >
                                                            <button className="cta" onClick={() => { handleOrderData(titl, img, prz) }}>
                                                                <span>Order</span>
                                                                <svg viewBox="0 0 13 10" height="10px" width="15px">
                                                                    <path d="M1,5 L11,5"></path>
                                                                    <polyline points="8 1 12 5 8 9"></polyline>
                                                                </svg>
                                                            </button>
                                                        </Link>

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
                                        <h5>"Oops! It looks like you haven't saved any cakes yet. Let's start adding some tasty treats!"</h5>
                                    </div>
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
export default SavedCakes;