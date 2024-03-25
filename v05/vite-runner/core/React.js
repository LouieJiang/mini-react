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

// function render(element, container) {
//   const _container = element.type === 'TEXT ELEMENT'
//     ? document.createTextNode('')
//     : document.createElement(element.type);

//   Object.keys(element.props)
//     .filter(key => key !== 'children')
//     .forEach(key => {
//       _container[key] = element.props[key];
//     });

//   const children = element.props.children;
//   children.forEach(child => render(child, _container));
//   container.append(_container);
// }



function render(element, container) {
  nextWorkUnit = {
    dom: container,
    props: {
      children: [element],
    },
  };
}

let nextWorkUnit = null;
function workLoop(deadline) {
  let shouldYield = false;
  while (!shouldYield && nextWorkUnit) {
    nextWorkUnit = performWorkOfUnit(nextWorkUnit);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
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

    fiber.parent.dom.append(dom);

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




