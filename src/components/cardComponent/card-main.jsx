import { useState, useReducer } from 'react'
import React from 'react'
import CardRow from './card-row'
import Search from '../searchComponent'
import foodSearch from '../searchComponent'
//import cimriScraper from '../../assets/scrape'


export default function mealCard() {

    let [showSearch, setshowSearch] = useState(false)
    let [FoodBasket, setFoodBasket] = useState([])
    let [kalori, setKalori] = useState(0)
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    function renderSearch() {
        setshowSearch(prevStat => !prevStat)
    }
    function updateFoodBasket(food) {

        let didFoodClicked = food.clicked;
        food.renderInput = true
        addOrDeleteFood(didFoodClicked, food)
    }

    function addOrDeleteFood(didFoodClicked, food) {
        didFoodClicked ? deleteFood(food) : addFood(food)
    }
    function deleteFood(food) {
        if (typeof food.kalori === "string") {
            let convertedFoodBasket = getKaloriAndGramFromFood(food)
            setKalori(prevKalori => prevKalori - convertedFoodBasket["kalori"])
        }
        else {
            console.log("kalori",typeof food.kalori)
            setKalori(prevKalori => prevKalori - food.kalori)
        }
        setFoodBasket(prevFood => {
            return prevFood.filter((foodItem) => foodItem.id != food.id)
        })
    }
    function addFood(food) {
        let convertedFoodBasket = getKaloriAndGramFromFood(food)
        setFoodBasket(prevFood => [...prevFood, { ...food, ...convertedFoodBasket }])
        setKalori(prevKalori => prevKalori + convertedFoodBasket["kalori"])
    }
    function getKaloriAndGramFromFood(food) {
        let kalori = food.kalori
        let gram = food.gram
        let pattern = new RegExp(/\d+/, 'i');
        kalori = kalori.match(pattern)[0]
        gram = gram.match(pattern)[0]
        return convertKaloriAndGramIntoInt(kalori, gram)
    }

    function convertKaloriAndGramIntoInt(kalori, gram) {
        return { "kalori": parseInt(kalori), "gram": parseInt(gram) }
    }
    function updateGram(event, foodId) {
        let gramInput = event.target.value
        if (event.key === 'Enter') {
            let foundIndexFromId = FoodBasket.findIndex((food) => food.id == foodId)
            updateFoodBasketWithKaloriAndGram(foundIndexFromId, gramInput)
            forceUpdate()
        }
    }
    function updateFoodBasketWithKaloriAndGram(foundIndexFromId, gramInput) {

        setFoodBasket(prevFoods => {
            let newValueOfFood = updateKaloriAndGram(prevFoods[foundIndexFromId], gramInput)
            prevFoods[foundIndexFromId] = newValueOfFood
            return prevFoods
        })

    }
    function updateKaloriAndGram(food, value) {
        food.gram = parseInt(value)

        let updatedFoodKalori = food.kalori * (value / 100)
        let differenceBetweenNewKaloriAndOldKalori = updatedFoodKalori - food.kalori

        setKalori(prevKalori => { return prevKalori + differenceBetweenNewKaloriAndOldKalori })

        food.kalori = updatedFoodKalori
        food.renderInput = false
        return food

    }


    return (
        <>
            <div class="meal-card" >
                <h3>Meal</h3>
                {showSearch && <> <button style={{color:"red"}}onClick={renderSearch}>kapat</button> <Search toggle={updateFoodBasket}/> </>}
                <table >
                    <thead>
                        <th>Yemek</th>
                        <th>Kalori</th>
                        <th>Tür</th>
                        <th>Miktar</th>
                    </thead>

                    <tbody>

                        {FoodBasket.map(
                            function (food) {
                                return (<CardRow delete={updateFoodBasket} updateGram={updateGram} item={food} />)
                            })}


                    </tbody>

                </table>
                <button onClick={renderSearch} className='button-add'>yemek ara</button>
                <p>Kalori {kalori}</p>

            </div>
        </>
    )
}
