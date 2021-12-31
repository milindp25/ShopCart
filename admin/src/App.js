import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Navigate
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/Login";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector(state => state.user.currentUser);
  const admin = true;
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element ={user ? <Navigate to="/" /> : <Login/>} />
        {admin && (
          <>
              <Route exact path="/" element ={<> <Topbar/> <div className="container"><Sidebar /><Home /></div></>} />
              <Route exact path="/users" element ={<> <Topbar/> <div className="container"><Sidebar /><UserList /></div></>} />
              <Route exact path="/user/:userId"  element ={<> <Topbar/> <div className="container"><Sidebar /> <User /></div></>} />
              <Route exact path="/newUser"  element ={<> <Topbar/> <div className="container"><Sidebar /> <NewUser /></div></>} />
              <Route exact path="/products"  element ={<> <Topbar/> <div className="container"><Sidebar /> <ProductList /></div></> } />
              <Route exact path="/product/:productId"  element ={ <> <Topbar/> <div className="container"><Sidebar /> <Product /></div></> } />
              <Route exact path="/newproduct"  element ={<> <Topbar/> <div className="container"><Sidebar /> <NewProduct /></div></> } />
          
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
