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
  const _container = element.type === 'TEXT ELEMENT'
    ? document.createTextNode('')
    : document.createElement(element.type);

  Object.keys(element.props)
    .filter(key => key !== 'children')
    .forEach(key => {
      _container[key] = element.props[key];
    });

  const children = element.props.children;
  children.forEach(child => render(child, _container));
  container.append(_container);
}





const React = {
  render,
  createElement,
};

export default React;
