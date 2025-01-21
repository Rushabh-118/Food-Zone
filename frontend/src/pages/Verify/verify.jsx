import React, { useContext, useEffect } from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {URL} = useContext(StoreContext);
    const navigate = useNavigate();
    
    const verifyPayment = async () => {
        
        const response = await axios.post(`${URL}/api/order/verify`, {success, orderId});
        console.log(success, orderId);
        
        if(response.data.success) {
            navigate("/myorders");
        } else {
            navigate("/")
        }
        
    }
    useEffect(() => {
        verifyPayment()
    }, [])

  return (
    <div className='loader'></div>
  )
}

export default Verify
