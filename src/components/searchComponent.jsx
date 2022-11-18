import { useState } from 'react'
import React from 'react'
import CardRow from './cardComponent/card-row'
import Data from '../assets/data'
import { nanoid } from 'nanoid'


export default function foodSearch(props) {

    let [foods, addFoods] = useState([])
    function search(event) {
        //Searches query in data
        //updates state respectively.
       
        let query = event.target.value;
        let foodGroupKeys = Object.keys(Data)
        let foundFoods=searchFoodOnGroups(query,foodGroupKeys)
        addLimitedAmountOfFood(foundFoods)
  
    }

    function addLimitedAmountOfFood(foundFoods){
        
        foundFoods.length < 10 ?
        addFoods(foundFoods)
        :
        addFoods(foundFoods.slice(0, 9))

    }

    function searchFoodOnGroups(query,foodGroupKeys){
        // iterates groups
        let foundFoods=[]
        if (query.length > 1) {
            foodGroupKeys.map((foodGroupKey) => {
                foundFoods.push(...searchFoodOnGroup(foodGroupKey, query))
            })
        }
        return foundFoods

    }

    function searchFoodOnGroup(foodGroupKey, query) {
        // substr search on food group
        let foundFoods = []
        Data[`${foodGroupKey}`].map((food) => {

            if (food["Yemek"].toLowerCase().search(query.toLowerCase()) != -1) {
                food.id = nanoid()
                food.clicked = false;
                foundFoods.push(food)
            }
        }

        )
        return foundFoods
    }
    function chooseClickedFood(id) {
        addFoods(foods.map((food) => {
            if (food.id == id) {
                props.toggle(food)
                return { ...food, clicked: !food.clicked }
            }
            else { return food }
        }))
    }


    return (
        <div className="food-search">
            <input onChange={search} className="food-search-bar" />

            <table className="search-table">
                <tbody>

                    {foods.map((food) => (<CardRow toggle={chooseClickedFood} id={food.id} key={food.id} className="search-card-row" item={food} />))}
                </tbody>
            </table>


        </div>

    )

}