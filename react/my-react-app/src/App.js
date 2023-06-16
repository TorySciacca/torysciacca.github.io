import React, { useState, useEffect } from 'react';
import eggBasketImage from './eggBasket.png'; 
import eggMan from './eggMan.png'; 
import eggManOnDrag from './eggManOnDrag.png'; 
import egg from './egg.png';
import './styles.css';

export default function MyApp() {
  const [eggBasketCount, setEggBasketCount] = useState(80);
  const [bucketCount, setBucketCount] = useState(0);
  const stage_one = 25 // 6 eggs
  const stage_two = 40 // 3 eggs
  const stage_three = 60 // 2 eggs
  const stage_four = 61 // 40 eggs
  const stage_five = 62
  
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
      <div className='Title'>
        <h1>FEED EGGS</h1>
      </div>
      <div className='Game-Content'>
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
    const dragImage = new Image();
    dragImage.src = egg;
    event.dataTransfer.setDragImage(dragImage, 20, 20);
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
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true); // Set dragging state to true
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    if (data === 'egg') {
      transferEgg();
    }
    setIsDragging(false); // Reset dragging state after drop
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false); // Reset dragging state when dragged item leaves
  };

  return (
    <div className="bucket" onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>
      <img src={isDragging ? eggManOnDrag : eggMan} alt="Bucket" />
      <p>{eggCount}</p>
    </div>
  );
}

const Popup = ({ onClose, onBuyEggs }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>Dude, you ran out of eggs.</p>
        <p>Would you like to buy</p>
        <p>an 80 pack of eggs?</p>
        <button onClick={onBuyEggs}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
}