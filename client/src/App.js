import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductPage from './pages/ProductPage'
import Register from "./pages/Register";
import SingleProduct from "./pages/SingleProduct";
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import {  useSelector } from "react-redux";
import Success from "./pages/Success";

function App() {

  const user = useSelector(state => state.user.currentUser);

  return (
    <>
    <Router>
        <Routes>
          <Route exact path ="/" element ={<Home/>} />
          <Route exact path ="/products" element ={<ProductPage/>} />
          <Route exact path ="/products/:category" element ={<ProductPage/>} />
          <Route exact path ="/product/:id" element ={<SingleProduct/>} />
          <Route exact path ="/cart" element ={<Cart/>} />
          <Route exact path ="/login" element ={user ? <Navigate to="/" /> : <Login/>} />
          <Route exact path ="/register" element ={user ? <Navigate to="/" /> : <Register/>} />
          <Route exact path ="/success" element ={<Success />} />
        </Routes>
    </Router>
    </>
  );
}

export default App;
