// 任务调度器demo
let count = 0
function doWork(deadline) {
  count++
  let shouldYield = false
  while (!shouldYield) {
    console.log(`count: ${count}`);
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(doWork)
}

requestIdleCallback(doWork)
