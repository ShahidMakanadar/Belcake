import React ,{useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import Home from './components/Home';
import OrderCake from './components/OrderCake';
import Contact from './components/Contact';
import About from './components/About';
import AddCake from './components/addCake';
import SavedCakes from './components/SavedCakes';
import ForgotPassword from './components/ForgotPassword';
import OrderProcess from './components/OrderProcess';
import OrderdCakesList from './components/OrderdCakesList';
import ViewAllOrder from './components/ViewAllOrder';

//OrderPageConstact imported
import { OrderPageContext } from './contexts/OrderPageContext';

function App() {
  
  const [Name , setName] = useState("")
  const [Image , setImage] = useState("")
  const [Price , setPrice] = useState("")
  const [ProductId , setProductId] = useState("")
  const [photoCake , setPhotoCake] = useState("")


  return (
    <div className="">
      <OrderPageContext.Provider value={{Name,setName , Image,setImage , Price,setPrice ,ProductId,setProductId , photoCake,setPhotoCake}}>
        <BrowserRouter>
          < Navbar />
          <Routes>
              <Route path='/' element={< Home />}></Route>
              <Route path='/Order' element={< OrderCake />}></Route>
              <Route path='/About' element={< About />}></Route>
              <Route path='/Contact' element={< Contact />}></Route>
              <Route path='/AddCake' element={< AddCake />}></Route>
              <Route path='/savedCakes' element={< SavedCakes />}></Route>
              <Route path='/orderProcess' element={< OrderProcess />}></Route>
              <Route path='/OrderdCakesList' element={<OrderdCakesList />}></Route>
              <Route path='/ViewAllOrders' element={<ViewAllOrder />}></Route>
              <Route path='/forgot-password/:id/:token' element={< ForgotPassword />}></Route>
          </Routes>
        </BrowserRouter>
      </OrderPageContext.Provider>
    </div>
  );
}

export default App;