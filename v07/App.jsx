
import React from './core/React.js';

function Counter({ num }) {
  function onClick() {
    console.log('click')
  }
  return (
    <div>
      num:{num}
      <button onClick={onClick}>click</button>
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
