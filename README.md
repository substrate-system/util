# util
![tests](https://github.com/substrate-system/util/actions/workflows/nodejs.yml/badge.svg)
[![types](https://img.shields.io/npm/types/@substrate-system/util?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

Utility functions for web components.

<!-- toc -->

- [install](#install)
- [API](#api)
  * [import](#import)
  * [`attributesToString`](#attributestostring)
  * [`setAttributes`](#setattributes)
  * [`attributesAsObject`](#attributesasobject)
  * [`objectToString`](#objecttostring)
- [pre-built JS](#pre-built-js)
  * [copy](#copy)

<!-- tocstop -->

## install

```sh
npm i -S @substrate-system/util
```

## API

### import

```js
import util from '@substrate-system/util'

// or individual functions
import { attributesToString } from '@substrate-system/util'
```

### `attributesToString` 

Take an array of attributes, and transform them into a string format. This can be useful for creating [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).

```ts
function attributesToString (attrs:Attr[]):string {
```

#### example
```ts
import { attributesToString } from '@substrate-system/util'

const el = document.getElementById('example')
const str = attributesToString(Array.from(el!.attributes))
console.log(str)
// => 'type="text" id="example" required'
```

### `setAttributes`

Set the given attributes from an object. Will handle boolean attributes like `required`.

```ts
function setAttributes (el:HTMLElement, attrs:Record<string, string|boolean>)
```

```ts
import { attributesToString, setAttributes } from '@substrate-system/util'

const input = document.getElementById('test') as HTMLInputElement

setAttributes(input, {
    required: true,
    name: 'fooo',
    class: 'testing'
})

console.log(attributesToString(Array.from(input.attributes)))
// => 'id="test" class="testing" name="fooo" required',
```

### `attributesAsObject` 
Return an object of `{ key: value }` from an array of attributes. If an
attribute is a boolean value, then it will be `{ name: true }`.

```ts
function attributesAsObject (attrs:Attr[]):Record<string, string|true>
```

```ts
import { attributesAsObject } from '@substrate-system/util'

const el = document.querySelector('input')
const attrs = Array.from(el!.attributes)
const obj = attributesAsObject(attrs)
console.log(obj)
// => {
//   "type": "text",
//   "required": true,
//   "name": "example",
//   "foo": "bar"
// }
```

### `objectToString`
Take an object, as from `attributesAsObject`, and stringify it for use in HTML.

```ts
function objectToString (obj:Record<string, string|true>):string
```

```ts
const str = objectToString(obj)
console.log(str)
// => 'type="text" required name="example" foo="bar"'
```

## pre-built JS
This package exposes minified JS files too. Copy them to a location that is
accessible to your web server, then link to them in HTML.

### copy
```sh
cp ./node_modules/@substrate-system/util/dist/index.min.js ./public/util.min.js
```

#### HTML
```html
<script type="module" src="./util.min.js"></script>
```
