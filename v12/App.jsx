
import React from './core/React.js';

let countFoo = 1;
function Foo() {
  console.log('Foo rerun');
  const update = React.update();
  function handleClick() {
    countFoo++
    update();
  }
  return (
    <div >
      Counter
      {countFoo}
      <button onClick={handleClick}>click</button>
    </div>
  )
}
let countBar = 1;

function Bar() {
  console.log('Bar rerun');
  const update = React.update();

  function handleClick() {
    countBar++
    update();
  }
  return (
    <div >
      countBar:{countBar}
      <button onClick={handleClick}>click</button>

    </div>
  )
}

let countRoot = 1;

function App() {
  console.log('App rerun');
  const update = React.update();

  function handleClick() {
    countRoot++
    update();
  }
  return (
    <div>
      app11
      countRoot:{countRoot}

      <button onClick={handleClick}>click</button>
      <Foo></Foo>
      <Bar></Bar>
    </div>
  )
}


export default App;
