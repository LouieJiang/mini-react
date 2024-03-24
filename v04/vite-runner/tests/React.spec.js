import React from "../core/React";
import { it, expect, describe } from 'vitest'

describe('createElement', () => {
  it('props 为空', () => {
    const element = React.createElement('div', null, 'app77');
    expect(element).toMatchInlineSnapshot({
      type: 'div', props: {
        children: [
          {
            type: 'TEXT ELEMENT',
            props: {
              nodeValue: 'app77',
              children: [],
            },
          },
        ]
      }
    }, `
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "app77",
              },
              "type": "TEXT ELEMENT",
            },
          ],
        },
        "type": "div",
      }
    `);
  })
  it('props 有值', () => {
    const element = React.createElement('div', { id: 'app' }, 'app77');
    expect(element).toMatchInlineSnapshot({
      type: 'div', props: {
        id: 'app',
        children: [
          {
            type: 'TEXT ELEMENT',
            props: {
              nodeValue: 'app77',
              children: [],
            },
          },
        ]
      }
    }, `
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "app77",
              },
              "type": "TEXT ELEMENT",
            },
          ],
          "id": "app",
        },
        "type": "div",
      }
    `);
  });
})
