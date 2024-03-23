
// console.log('main.js');
// const dom = document.createElement('div');
// dom.id = 'app';
// document.querySelector('#root').append(dom);

// const textNode = document.createTextNode('');
// textNode.textContent = 'app';
// dom.append(textNode);

// const textElement = {
//   type: 'TEXT ELEMENT',
//   props: {
//     nodeValue: 'app',
//     children: [],
//   },
// }



// const element = {
//   type: 'div',
//   props: {
//     id: 'app',
//     children: [
//       textElement
//     ],
//   },
// };

// const container = document.createElement(element.type);
// container.id = element.props.id;
// document.querySelector('#root').append(container);

// const textNode = document.createTextNode('');
// textNode.nodeValue = textElement.props.nodeValue;
// container.append(textNode);


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
      children,
    },
  };
}

const textElement = createTextNode('app');
const App = createElement('div', { id: 'app' }, textElement);

const container = document.createElement(App.type);
container.id = App.props.id;
document.querySelector('#root').append(container);

const textNode = document.createTextNode('');
textNode.nodeValue = textElement.props.nodeValue;
container.append(textNode);


