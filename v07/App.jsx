
import React from './core/React.js';

let count = 10
let props = { id: 111111 }
function Counter({ num }) {
  function onClick() {
    console.log('click')
    count++
    props = {}
    React.update()
  }
  return (
    <div {...props}>
      count:{count}
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
