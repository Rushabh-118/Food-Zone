import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [food_list, setFoodlist] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const URL = "http://localhost:4000";
  const [token,setToken] = useState("")

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token) {
      await axios.post(`${URL}/api/cart/add`,{itemId},{headers:{token}})
    }

  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token) {
      await axios.post(`${URL}/api/cart/remove`,{itemId},{headers:{token}})
    }
  };

  const getTotalAmount = () => {
    let total = 0;
    for (const item in cartItems) {
        if (cartItems[item]>0) {
            let itemInfo = food_list.find((food) => food._id === item);
            total += itemInfo.price * cartItems[item];
        }
    }
    return total;
  }
  const fetchFoodList = async () => {
    const response = await axios.get(`${URL}/api/food/list`);
    setFoodlist(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.get(`${URL}/api/cart/get`, { headers: { token } });
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if(localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  },[])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
    URL,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
