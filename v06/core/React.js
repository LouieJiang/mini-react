function createTextNode(text) {
  return {
    type: 'TEXT ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => typeof child === 'object' ? child : createTextNode(child)),
    },
  };
}




function render(element, container) {
  nextWorkUnit = {
    dom: container,
    props: {
      children: [element],
    },
  };

  root = nextWorkUnit;
}

let root = null
let nextWorkUnit = null;
function workLoop(deadline) {
  let shouldYield = false;
  while (!shouldYield && nextWorkUnit) {
    nextWorkUnit = performWorkOfUnit(nextWorkUnit);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextWorkUnit && root) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

function commitRoot() {
  commitWork(root.child);
  root = null;
}

function commitWork(fiber) {
  if (!fiber) return;
  fiber.parent.dom.append(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);

}

function createDom(fiber) {
  return fiber.type === 'TEXT ELEMENT'
    ? document.createTextNode('')
    : document.createElement(fiber.type);
}

function updateProps(fiber, dom) {
  Object.keys(fiber.props)
    .filter(key => key !== 'children')
    .forEach(key => {
      dom[key] = fiber.props[key];
    });
}

function initChildren(fiber) {
  const children = fiber.props.children;
  let prevChild = null;
  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      sibling: null,
      dom: null,
    };
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevChild.sibling = newFiber;
    }
    prevChild = newFiber;
  });
}

function performWorkOfUnit(fiber) {
  if (!fiber.dom) {
    // 1. 创建 element
    const dom = (fiber.dom = createDom(fiber))

    // fiber.parent.dom.append(dom);

    // 2. 处理 props
    updateProps(fiber, dom);
  }

  // 3 转换链表 设置指针
  initChildren(fiber);

  // 4.返回下一个要执行的任务
  if (fiber.child) {
    return fiber.child;
  }
  if (fiber.sibling) {
    return fiber.sibling;
  }
  return fiber.parent?.sibling;
}


requestIdleCallback(workLoop)


const React = {
  render,
  createElement,
};

export default React;




