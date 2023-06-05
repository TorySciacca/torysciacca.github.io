
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

// start with 100 eggs
// 25 clicks = 6 eggs
// 25 clicks = 3 eggs
// 25 clicks = 2 eggs
// "Dude, you ran out of eggs. Would you like to buy an 80 pack of eggs? yes/no"
// 1 click = 40 eggs
// 41 eggs = win
// You're looking at aa nude egg