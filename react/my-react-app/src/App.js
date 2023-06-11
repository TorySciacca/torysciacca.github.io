import React, { useState, useEffect } from 'react';
import eggBasketImage from './eggBasket.png'; 
import eggMan from './eggMan.png'; 
import './styles.css';

export default function MyApp() {
  const [eggBasketCount, setEggBasketCount] = useState(80);
  const [bucketCount, setBucketCount] = useState(0);
  
  const transferEgg = () => {
    if (eggBasketCount > 0) {
      setEggBasketCount(eggBasketCount - 20);
      setBucketCount(bucketCount + 1);
    }
  }

  const resetEggCounts = () => {
    setEggBasketCount(eggBasketCount + 80);
  }

  const buy80Eggs = () => {
    setEggBasketCount(80);
    setBucketCount(0);
  }

  return (
    <div className = 'Game-Window'>
      <h1>FEED EGGS</h1>
      <div>
        <Bucket eggCount={bucketCount} transferEgg={transferEgg} />
        <EggBasket eggCount={eggBasketCount} transferEgg={transferEgg} resetEggCounts={resetEggCounts} />
      </div>
    </div>
  );
}

function EggBasket({ eggCount, transferEgg, resetEggCounts }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (eggCount <= 0) {
      setIsOpen(true);
    }
  }, [eggCount]);

  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', 'egg');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    transferEgg();
  };

  const handlePopupClose = () => {
    setIsOpen(false);
  };

  const handleBuyEggs = () => {
    resetEggCounts();
    setIsOpen(false);
  };

  return (
    <div className="egg-basket" draggable onDragStart={handleDragStart} onDrop={handleDrop}>
      <img src={eggBasketImage} alt="Egg Basket" />
      <p>Eggs: {eggCount}</p>
      {isOpen ? (
        <Popup onClose={handlePopupClose} onBuyEggs={handleBuyEggs} />
      ) : null}
    </div>
  );
}

function Bucket({ eggCount, transferEgg }) {
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    if (data === 'egg') {
      transferEgg();
    }
  };

  return (
    <div className="bucket" onDragOver={handleDragOver} onDrop={handleDrop}>
      <img src={eggMan} alt="Bucket" />
      <p>{eggCount}</p>
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