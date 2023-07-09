import React from "react";
import { Dice } from "./components/Dice.js";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./style.css";

export const App = () => {
  const [dice, setDice] = React.useState(allNewDice());

  const [tenzies, setTenzies] = React.useState(false);

  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allSame = dice.every((die) => dice[0].value === die.value);
    if (allHeld && allSame) {
      setTenzies(true);
      console.log("You won");
    }
  }, [dice]);

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newArr = [];
    for (let i = 0; i < 10; i++) {
      newArr.push(generateNewDice());
    }
    return newArr;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) => {
        setScore((prev) => prev + 1);
        return oldDice.map((die) => {
          return die.isHeld ? die : generateNewDice();
        });
      });
    } else {
      setScore(0);
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((prev) => {
      return prev.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : { ...die };
      });
    });
  }

  const diceElements = dice.map((elem, index) => {
    return (
      <Dice
        value={elem.value}
        key={index}
        id={elem.id}
        isHeld={elem.isHeld}
        holdDice={() => holdDice(elem.id)}
      />
    );
  });

  return (
    <main>
      {tenzies && <Confetti gravity={0.4} />} {/*for rain shower */}
      <h1>Tenzies</h1>
      <p className="summary">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container">{diceElements}</div>
      <div className="content">
        <button className="roll-button" onClick={rollDice}>
          {tenzies ? "Reset" : "Roll"}
        </button>
        <span className="score">Total Rolls : {score}</span>
      </div>
    </main>
  );
};
