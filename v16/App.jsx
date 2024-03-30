
import React from './core/React.js';

function Foo() {
  console.log('foo run');
  const [count, setCount] = React.useState(10)
  const [bar, setBar] = React.useState('bar')
  function handleClick() {
    setCount(c => c + 1)
    setBar('barbar')
  }

  React.useEffect(() => { console.log('init'); }, [])
  React.useEffect(() => { }, [count])
  return (
    <div >
      <h1>foo11</h1>
      {count}
      <br />
      {bar}
      <button onClick={handleClick}>click</button>
    </div>
  )
}

function App() {
  return (
    <div>
      app11
      <Foo></Foo>
    </div>
  )
}


export default App;
