import { useState } from 'react'
import React from 'react'


export default function cardRow(props) {
    let { Yemek, kalori, gram, tür, clicked,id,renderInput} = props.item;
    let columnHover = { backgroundColor: clicked ? "#36454F" : "#8A9A5B", color: clicked ? 'white' : 'black' }
   
    return (

        <tr onClick={() => props.toggle ? props.toggle(props.id):null} style={columnHover} >
            <td >
                {Yemek}
            </td>
            <td >
                {kalori}
            </td>
            <td >
                {tür}
            </td>
            <td >
               {renderInput && <input type="text"  onKeyDown={(event)=>props.updateGram(event,id)} />}
                {!renderInput && <p>{gram} gr </p>}
            </td>
            <td>
              <button onClick={()=>{
                props.item.clicked=!props.item.clicked
                props.delete(props.item)
              }}>Delete</button>
            </td>

        </tr>
    )


}