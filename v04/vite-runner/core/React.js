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


function performWorkOfUnit(work) {
  // 1. 创建 element
  if (!work.dom) {
    const dom = (
      work.dom =
      work.type === 'TEXT ELEMENT'
        ? document.createTextNode('')
        : document.createElement(work.type)
    )

    work.parent.dom.append(dom);

    // 2. 处理 props
    Object.keys(work.props)
      .filter(key => key !== 'children')
      .forEach(key => {
        dom[key] = work.props[key];
      });
  }

  // 3 转换链表 设置指针
  const children = work.props.children;
  let prevChild = null;
  children.forEach((child, index) => {
    const newWork = {
      type: child.type,
      props: child.props,
      child: null,
      parent: work,
      sibling: null,
      dom: null,
    };
    if (index === 0) {
      work.child = newWork;
    } else {
      prevChild.sibling = newWork;
    }
    prevChild = newWork;
  });

  // 4.返回下一个要执行的任务
  if (work.child) {
    return work.child;
  }
  if (work.sibling) {
    return work.sibling;
  }
  return work.parent?.sibling;
}


requestIdleCallback(workLoop)


const React = {
  render,
  createElement,
};

export default React;
