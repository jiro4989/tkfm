import React, {useState} from 'react';

const TestCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>TestCounter</h2>
      <hr />
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}
export default TestCounter;
