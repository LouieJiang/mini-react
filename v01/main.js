
console.log('main.js');
const dom = document.createElement('div');
dom.id = 'app';
document.querySelector('#root').append(dom);

const textNode = document.createTextNode('');
textNode.textContent = 'app';
dom.append(textNode);


