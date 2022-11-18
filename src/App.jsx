import { useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import './styling/App.css'
import MealCard from './components/cardComponent/card-main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1><span>Budget</span> Eats</h1>
      
      <MealCard/>
      <MealCard/>
      <MealCard/>
      <MealCard/>
      <p className="read-the-docs">
        a Mehmet Onur Çetindere Production
      </p>
    </div>
  )
}

export default App
