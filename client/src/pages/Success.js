import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../API_Request_Call";
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/reduxCart';

const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const homeOnClick = () =>{
    dispatch(clearCart(""));
    navigate("/");
  };

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders/placeOrder", {
          userId: currentUser.User_id,
          products: cart.products.map((item) => ({
            productId: item.id ? item.id : item[0].id,
            quantity: item.cartedQuantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data.orderID);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been placed successfully. Your order number is ${orderId}.You can track the same using the order Number`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }} onClick={homeOnClick}>Go to Homepage</button>
    </div>
  );
};

export default Success;