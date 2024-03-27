
import React from './core/React.js';

function Counter({ num }) {
  return <div>num:{num}</div>
}

function CounterContainer() {
  return <Counter num={10} />
}

function App() {
  return (
    <div>
      app11
      <Counter num={10} />
      <Counter num={20} />
    </div>
  )
}


export default App;
