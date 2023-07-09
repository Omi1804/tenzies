import React from 'react'

export const Dice = (props) => {

    const style ={
        backgroundColor: props.isHeld? "#59E391" : "white"
    }

  return (
    <div className="num" style={style} onClick={props.holdDice} >{props.value}</div>
  )
}
