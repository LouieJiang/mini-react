
import React from './core/React.js';

let showBar = false;
function Counter() {
  const bar = <div>bar</div>
  function handleShowBar() {
    showBar = !showBar;
    React.update();
  }
  return (
    <div >
      Counter
      {showBar && bar}
      <button onClick={handleShowBar}>click</button>
    </div>
  )
}

function CounterContainer() {
  return <Counter num={10} />
}

function App() {
  return (
    <div>
      app11
      <Counter num={10} />
      {/* <Counter num={20} /> */}
    </div>
  )
}


export default App;
