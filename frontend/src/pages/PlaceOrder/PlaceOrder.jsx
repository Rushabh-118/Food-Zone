import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

//after checkout payment display

const {getTotalAmount,token,food_list,cartItems,URL} =  useContext(StoreContext);
const [data, setData] = useState({
  first_name: "",
  last_name: "",
  email: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
  phone: ""
})
const onchangeHandler = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  setData(data => ({...data, [name]: value}))
}

const placeOrder = async (event) => {
  event.preventDefault();
  let orderItems = [];
  food_list.map((item) => {
    if(cartItems[item._id] > 0){
      let itemInfo = { ...item };
      itemInfo["quantity"] = cartItems[item._id];
      orderItems.push(itemInfo);
    }
    return null;
  });
  let orderData = {
    address: data,
    items: orderItems,
    amount: getTotalAmount() + 20
  }
  let response = await axios.post(URL+"/api/order/place", orderData, { headers: { token } });
  if ( response.data.success ) {
    const {session_url} = response.data;
    window.location.replace(session_url);
  } else {
    alert("Order Placed Failed");
  }
}

const navigate = useNavigate();

useEffect(() => {
  if(!token) {
    navigate('/cart')
  } else if(getTotalAmount() === 0) {
    navigate('/cart') 
  }
})

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='first_name' onChange={onchangeHandler} value={data.first_name} type="text" placeholder='First-Name'/>
          <input required name='last_name' onChange={onchangeHandler} value={data.last_name} type="text" placeholder='Last-Name'/>
        </div>
        <input required name='email' onChange={onchangeHandler} value={data.email} type="email" placeholder='Email address'/>
        <input required name='street' onChange={onchangeHandler} value={data.street} type="text" placeholder='street'/>
        <div className="multi-fields">
          <input required name='city' onChange={onchangeHandler} value={data.city} type="text" placeholder='city'/>
          <input required name='state' onChange={onchangeHandler} value={data.state} type="text" placeholder='state'/>
        </div>
        <div className="multi-fields">
          <input required name='pincode' onChange={onchangeHandler} value={data.pincode} type="text" placeholder='pincode'/>
          <input required name='country' onChange={onchangeHandler} value={data.country} type="text" placeholder='country'/>
        </div>
        <input required name='phone' onChange={onchangeHandler} value={data.phone} type="text" placeholder='phone'/>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total:- </h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalAmount() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{getTotalAmount() === 0 ? 0 : getTotalAmount() + 20}</p>
            </div>
          </div>
            <button type='submit'>PROCEED TO PAY</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
