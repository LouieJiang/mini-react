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
      children: children.map(child => {
        const isTextNode = typeof child === 'string' || typeof child === 'number';
        return isTextNode ? createTextNode(child) : child
      }),
    },
  };
}

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
  };

  nextWorkUnit = wipRoot;
}

let wipRoot = null
let currentRoot = null;
let nextWorkUnit = null;
let deletions = []
function workLoop(deadline) {
  let shouldYield = false;
  while (!shouldYield && nextWorkUnit) {
    nextWorkUnit = performWorkOfUnit(nextWorkUnit);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextWorkUnit && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

function commitRoot() {
  deletions.forEach(commitDeletion);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
  deletions = [];
}

function commitDeletion(fiber) {
  if (fiber.dom) {
    let fiberParent = fiber.parent;
    while (!fiberParent.dom) {
      fiberParent = fiberParent.parent;
    }
    fiberParent.dom.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child);
  }

}

function commitWork(fiber) {
  if (!fiber) return;

  let fiberParent = fiber.parent;
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent;
  }

  if (fiber.effectTag === 'update') {
    updateProps(fiber.dom, fiber.props, fiber.alternate?.props);
  } else if (fiber.effectTag === 'placement') {
    if (fiber.dom) {
      fiberParent.dom.append(fiber.dom);
    }
  }

  if (fiber.dom) {
    fiberParent.dom.append(fiber.dom);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);

}

function createDom(fiber) {
  return fiber.type === 'TEXT ELEMENT'
    ? document.createTextNode('')
    : document.createElement(fiber.type);
}

function updateProps(dom, nextProps = {}, prevProps) {
  // Object.keys(fiber.props)
  //   .filter(key => key !== 'children')
  //   .forEach(key => {
  //     if (key.startsWith('on')) {
  //       const eventName = key.slice(2).toLowerCase();
  //       dom.addEventListener(eventName, fiber.props[key]);
  //     } else {
  //       dom[key] = fiber.props[key];
  //     }
  //   });

  // 
  Object.keys(prevProps).forEach(key => {
    if (key !== 'children') {
      if (!(key in nextProps)) {
        dom.removeAttribute(key);
      }
    }
  })


  Object.keys(nextProps).forEach(key => {
    if (key !== 'children') {
      if (nextProps[key] !== prevProps[key]) {
        if (key.startsWith('on')) {
          const eventName = key.slice(2).toLowerCase();
          dom.removeEventListener(eventName, prevProps[key]);
          dom.addEventListener(eventName, nextProps[key]);
        } else {
          dom[key] = nextProps[key];
        }
      }
    }
  })
}

function reconcileChildren(fiber, children) {
  let oldFiber = fiber.alternate?.child;
  let prevChild = null;
  children.forEach((child, index) => {

    const sameType = oldFiber && child.type === oldFiber.type;

    let newFiber = null;
    if (sameType) {
      newFiber = {
        type: child.type,
        props: child.props,
        child: null,
        parent: fiber,
        sibling: null,
        dom: oldFiber.dom,
        effectTag: 'update',
        alternate: oldFiber,
      };
    } else {
      newFiber = {
        type: child.type,
        props: child.props,
        child: null,
        parent: fiber,
        sibling: null,
        dom: null,
        effectTag: 'placement',
      };

      if (oldFiber) {
        deletions.push(oldFiber)
      }
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevChild.sibling = newFiber;
    }
    prevChild = newFiber;
  });

  while (oldFiber) {
    deletions.push(oldFiber);
    oldFiber = oldFiber.sibling;
  }
}

function undateFunctionComponent(fiber) {
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function undateHostComponent(fiber) {
  if (!fiber.dom) {
    // 1. 创建 element
    const dom = (fiber.dom = createDom(fiber))

    // 2. 处理 props
    updateProps(dom, fiber.props, {});
  }
}

function performWorkOfUnit(fiber) {

  const isFuntionComponent = typeof fiber.type === 'function';
  if (isFuntionComponent) {
    undateFunctionComponent(fiber);
  } else {
    undateHostComponent(fiber)
  }


  // 3 转换链表 设置指针
  const children = isFuntionComponent ? [fiber.type(fiber.props)] : fiber.props.children;
  reconcileChildren(fiber, children);

  // 4.返回下一个要执行的任务
  if (fiber.child) {
    return fiber.child;
  }
  if (fiber.sibling) {
    return fiber.sibling;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }

  // return fiber.parent?.sibling;
}


function update() {
  wipRoot = {
    dom: currentRoot.dom,
    props: currentRoot.props,
    alternate: currentRoot,
  };
  nextWorkUnit = wipRoot;
}

requestIdleCallback(workLoop)


const React = {
  render,
  update,
  createElement,
};

export default React;




