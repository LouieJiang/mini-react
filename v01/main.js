
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

// const _container = document.createElement(element.type);
// _container.id = element.props.id;
// document.querySelector('#root').append(_container);

// const textNode = document.createTextNode('');
// textNode.nodeValue = textElement.props.nodeValue;
// _container.append(textNode);


// function createTextNode(text) {
//   return {
//     type: 'TEXT ELEMENT',
//     props: {
//       nodeValue: text,
//       children: [],
//     },
//   };
// }

// function createElement(type, props, ...children) {
//   return {
//     type,
//     props: {
//       ...props,
//       children,
//     },
//   };
// }

// const textElement = createTextNode('app');
// const App = createElement('div', { id: 'app' }, textElement);

// const _container = document.createElement(App.type);
// _container.id = App.props.id;
// document.querySelector('#root').append(_container);

// const textNode = document.createTextNode('');
// textNode.nodeValue = textElement.props.nodeValue;
// _container.append(textNode);


// function createTextNode(text) {
//   return {
//     type: 'TEXT ELEMENT',
//     props: {
//       nodeValue: text,
//       children: [],
//     },
//   };
// }

// function createElement(type, props, ...children) {
//   return {
//     type,
//     props: {
//       ...props,
//       children: children.map(child => typeof child === 'object' ? child : createTextNode(child)),
//     },
//   };
// }
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

// const textElement = createTextNode('app');
// const App = createElement('div', { id: 'app' }, 'app22');
// render(App, document.querySelector('#root'));

// const ReactDom = {
//   createRoot(container) {
//     return {
//       render(element) {
//         render(element, container);
//       },
//     };
//   }
// };

import ReactDom from './core/ReactDom.js';
import App from './App.js';

ReactDom.createRoot(document.querySelector('#root')).render(App);
