import React, { useState, useEffect } from 'react';
import eggBasketImage from './eggBasket.png'; 
import eggMan from './eggMan.png'; 
import eggManOnDrag from './eggManOnDrag.png'; 
import egg from './egg.png';
import './styles.css';

export default function MyApp() {
  const [eggBasketCount, setEggBasketCount] = useState(80);
  const [bucketCount, setBucketCount] = useState(0);

  const transferEgg = () => {
    if (eggBasketCount > 0) {
      setEggBasketCount(eggBasketCount - 20);
      setBucketCount(bucketCount + 1)
      CheckStage(bucketCount);
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
        <CheckStage bucketCount={bucketCount} />
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
    if (eggCount <= 0) {
      setIsOpen(true);  // Open the popup if there are no eggs left
    } else {
      event.dataTransfer.setData('text/plain', 'egg');
      const dragImage = new Image();
      dragImage.src = egg;
      event.dataTransfer.setDragImage(dragImage, 20, 20);
    }
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
    <div className="egg-basket" draggable onDragStart={handleDragStart} onDrop={handleDrop} >
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
  const [answer, setAnswer] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (answer.toLowerCase() === 'yes') {
      onBuyEggs();
    } else if (answer.toLowerCase() === 'no') {
      onClose();
    }// else { alert("Please enter either 'yes' or 'no'");    }
    setAnswer('');
  };

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <p>Dude, you ran out of eggs.</p>
        <p>Would you like to buy</p>
        <p>an 80 pack of eggs?</p>
        <form onSubmit={handleSubmit}>
          <input type="text" value={answer} onChange={handleChange} style={{textTransform: "uppercase"}}/>
        </form>
      </div>
    </div>
  );
}
function CheckStage({ bucketCount }) {
  const stage_one = 25 // 6 eggs
  const stage_two = 50 // 3 eggs
  const stage_three = 80 // 2 eggs
  const stage_four = 81 // 40 eggs
  const stage_five = 82 // you win

  if (bucketCount === stage_one) {
    return (
      <div className="popup">
        <div className="popup-content">
          <p>6 EGGS</p>
        </div>
      </div>
    );
  }
  else if (bucketCount === stage_two) {
    return (
      <div className="popup">
        <div className="popup-content">
          <p>3 EGGS</p>
        </div>
      </div>
    );
  }
  else if (bucketCount === stage_three) {
    return (
      <div className="popup">
        <div className="popup-content">
          <p>2 EGGS</p>
        </div>
      </div>
    );
  }
  else if (bucketCount === stage_four) {
    return (
      <div className="popup">
        <div className="popup-content">
          <p>You now have 40 eggs.</p>
        </div>
      </div>
    );
  }
  else if (bucketCount === stage_five) {
    return (
      <div className="popup">
        <div className="popup-content">
          <p>You Win</p>
        </div>
      </div>
    );
  }
  else {
    // If none of the conditions are met, render nothing
    return null;
  }
}
