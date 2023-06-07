import React, { useState, useEffect } from 'react';
import eggBasketImage from './eggBasket.png'; // Import the egg basket image
import bucketImage from './egg.png'; // Import the bucket image
import './styles.css'; // Tell webpack that Button.js uses these styles


export default function MyApp() {
  return (
    <div>
      <h1>Feed Eggs</h1>
      <div>
        <EggBasket />
        <Bucket />
      </div>
    </div>
  );
}

function EggBasket() {
  const [eggCount, setEggCount] = useState(80);

  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', 'egg');
  };

  return (
    <div className="egg-basket" draggable onDragStart={handleDragStart}>
      <img src={eggBasketImage} alt="Egg Basket" />
      Egg Basket ({eggCount} eggs)
    </div>
  );
}

function Bucket() {
  const [eggCount, setEggCount] = useState(80);
  const [isOpen, setIsOpen] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    if (data === 'egg') {
      setEggCount(eggCount - 1);
    }
  };

  useEffect(() => {
    if (eggCount <= 0) {
      setIsOpen(true);
    }
  }, [eggCount]);

  const handlePopupClose = () => {
    setIsOpen(false);
  };

  const handleBuyEggs = () => {
    setEggCount(80);
    setIsOpen(false);
  };

  return (
    <div className="bucket" onDragOver={handleDragOver} onDrop={handleDrop}>
      <img src={bucketImage} alt="Bucket" />
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
}
