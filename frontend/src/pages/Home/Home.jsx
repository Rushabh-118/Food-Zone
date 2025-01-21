import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Feedback from '../../components/Feedback/Feedback'

const Home = () => {

  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category ={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <Feedback />
    </div>
  )
}

export default Home
