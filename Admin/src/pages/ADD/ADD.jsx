import React, { useState } from 'react'
import './ADD.css'
import { assets } from '../../assets/assets'
import axios from 'axios'

const ADD = ({url}) => {
    const [image, setImage] = useState(false)
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })

    const onChangeHandler = (event) => {
        const Name = event.target.name;
        const value = event.target.value;
        setData(data=> ({...data,[Name]:value}))
    } 

    const onSubmitHandler = async (event) => {
        const formData = new FormData();
        formData.append('image',image)
        formData.append('name',data.name)
        formData.append('description',data.description)
        formData.append('price',Number(data.price))
        formData.append('category',data.category)
        const response = await axios.post(`${url}/api/food/add`,formData)
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"Salad"
            })
            setImage(false)
        } else {
            alert('Failed to Add Product')
        }
    }

  return (
    <div className='add'>
        <form className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor='image'>
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='image' hidden required/>
            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input onChange={onChangeHandler} name="name" type="text" placeholder="Enter Product Name" required/>
            </div>
            <div className="add-product-desc">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} name="description" id="" rows="6" placeholder="Enter Product Description" required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Category</p>
                    <select onChange={onChangeHandler} name="category" id="" required>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Price</p>
                    <input onChange={onChangeHandler} name="price" type="number" placeholder="Enter Price" required/>
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
      
    </div>
  )
}

export default ADD
