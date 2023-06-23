// Importing required libraries and assets
import React, { useState, useEffect } from 'react';

import eggBasketImage from './images/eggBasket.png'; 
import eggMan from './images/eggMan.gif'; 
import eggManOnDrag from './images/eggManEating.gif'; 
import egg from './images/egg.png';
import './styles.css';

// Main Application
export default function EggMan() {
  // State for tracking egg counts in the basket and bucket (egg man)
  const [eggBasketCount, setEggBasketCount] = useState(80);
  const [bucketCount, setBucketCount] = useState(0);

  // Function to transfer egg from basket to bucket
  const transferEgg = () => {
    // Check if there are any eggs left in the basket
    if (eggBasketCount > 0) {
      setEggBasketCount(eggBasketCount - 1);
      setBucketCount(bucketCount + 1)
      CheckStage(bucketCount);
    }
  }

  // Function to reset the egg counts in the basket
  const resetEggCounts = () => {
    setEggBasketCount(eggBasketCount + 80);
  }

  // Return Game Window
  return (
    // Components representing different parts of the game
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

// Component representing EggBasket
function EggBasket({ eggCount, transferEgg, resetEggCounts }) {
  // State to control the opening of the popup
  const [isOpen, setIsOpen] = useState(false);

  // React Hook to open the popup when there are no eggs left in the basket
  useEffect(() => {
    if (eggCount <= 0) {
      setIsOpen(true);
    }
  }, [eggCount]);

  // Function to handle drag start event
  const handleDragStart = (event) => {
    if (eggCount <= 0) {
      setIsOpen(true);  // Open the popup if there are no eggs left
    } else {
      // Set the drag data and image
      event.dataTransfer.setData('text/plain', 'egg');
      const dragImage = new Image();
      dragImage.src = egg;
      event.dataTransfer.setDragImage(dragImage, 20, 20);
    }
  };

  // Function to handle drop event
  const handleDrop = (event) => {
    event.preventDefault();
    transferEgg();
  };

  // Function to close the popup
  const handlePopupClose = () => {
    setIsOpen(false);
  };

  // Function to buy new eggs
  const handleBuyEggs = () => {
    resetEggCounts();
    setIsOpen(false);
  };

  // Render the EggBasket Component
  return (
    <div className="egg-basket" draggable onDragStart={handleDragStart} onDrop={handleDrop} >
      <img src={eggBasketImage} alt="Egg Basket" />
      <p>EGGS: {eggCount}</p>
      {isOpen ? (
        <Popup onClose={handlePopupClose} onBuyEggs={handleBuyEggs} />
      ) : null}
    </div>
  );
}

// Component representing the Bucket
function Bucket({ eggCount, transferEgg }) {
  // State to control the dragging and eating states
  const [isDragging, setIsDragging] = useState(false);
  const [isEating, setIsEating] = useState(false);
  // Key to force re-render and reset gif
  const [key, setKey] = useState(Math.random()); 

  // React Hook to handle eating animation timing
  useEffect(() => {
    if (isEating) {
      const timer = setTimeout(() => {
        setIsEating(false);
      }, 700); // Change here for duration of animation

      return () => clearTimeout(timer); // Clean up on unmount
    }
  }, [isEating]);

  // Function to handle drag over event
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true); // Set dragging state to true
  };

  // Function to handle drop event
  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    if (data === 'egg') {
      // Transfer egg and trigger eating animation
      transferEgg();
      setIsEating(true);
      setKey(Math.random()); // Reset gif by setting new key
    }
    setIsDragging(false); // Reset dragging state after drop
  };

  // Function to handle drag leave event
  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false); // Reset dragging state when dragged item leaves
  };

  // Render the Bucket Component
  return (
    <div className="bucket" onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>
      <img key={key} src={isEating ? eggManOnDrag : eggMan} alt="Bucket" />
      <p>{eggCount}</p>
    </div>
  );
}

// Popup component
const Popup = ({ onClose, onBuyEggs }) => {
  const [answer, setAnswer] = useState('');

  // Function to handle submit event
  const handleSubmit = (event) => {
    event.preventDefault();
    if (answer.toLowerCase() === 'yes') {
      onBuyEggs();
    } else if (answer.toLowerCase() === 'no') {
      onClose();
    }// else { alert("Please enter either 'yes' or 'no'");  -- optional to be more UX friendly but less accurate }
    setAnswer('');
  };

  // Function to handle changes in the input field
  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  // Render the Popup Component
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

// Function to check and handle game stages
function CheckStage({ bucketCount }) {
  const stage_one = 25 // 6 eggs
  const stage_two = 50 // 3 eggs
  const stage_three = 75 // 2 eggs
  const stage_four = 81 // 40 eggs
  const stage_five = 82 // you win

  if (bucketCount === stage_four) {
    console.log('Test') //Tests for stage_four condition outside of other stages 40 
  }

  // Display different messages based on the number of eggs in the bucket
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