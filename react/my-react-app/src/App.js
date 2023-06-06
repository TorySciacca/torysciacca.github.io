/*
import { useState } from 'react';

export default function MyApp() {
  return (
    <div>
      <h1>Feed Eggs</h1>
      <div>
      <p>egg</p>
      <MyButton />
      <p>egg basket</p>
      </div>
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      {count} eggs
    </button>
  );
}
*/

// start with 100 eggs
// 25 clicks = 6 eggs
// 25 clicks = 3 eggs
// 25 clicks = 2 eggs
// "Dude, you ran out of eggs. Would you like to buy an 80 pack of eggs? yes/no"
// 1 click = 40 eggs
// 41 eggs = win
// You're looking at aa nude egg

import React, { useState, useEffect } from 'react';

export default function MyApp() {
  return (
    <div>
      <h1>Feed Eggs</h1>
      <div>
        <MyButton />
      </div>
    </div>
  );
}

function MyButton() {
  const [eggCount, setEggCount] = useState(80);
  const [clickCount, setClickCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  const threshold = 1;
  const eggsPerClick = 1;

  useEffect(() => {
    const eggsSpent = Math.floor(clickCount / threshold) * eggsPerClick;
    const remainingEggs = 80 - eggsSpent;
    setEggCount(remainingEggs);

    if (remainingEggs <= 0) {
      setIsOpen(true);
    }
  }, [clickCount]);

  const handlePopupClose = () => {
    setIsOpen(false);
  };

  const handleBuyEggs = () => {
    setEggCount(40);
    setClickCount(0);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleClick} disabled={eggCount <= 0}>
        Feed Eggs
      </button>
      <p>Eggs remaining: {eggCount}</p>
      {isOpen ? (
        <Popup onClose={handlePopupClose} onBuyEggs={handleBuyEggs} />
      ) : null}
    </div>
  );
}

const Popup = ({ onClose, onBuyEggs }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>Dude, you ran out of eggs.</p>
        <p>Would you like to buy an 80 pack of eggs?</p>
        <button onClick={onBuyEggs}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
};
