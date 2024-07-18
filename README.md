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

Take an `HTMLElement`, and transform its attributes into a string format. This is sometimes useful for creating [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).

```ts
function attributesToString (el:HTMLElement):string
```

#### example
```ts
import { attributesToString } from '@substrate-system/util'
const el = document.getElementById('example')
const str = attributesToString(el!)
console.log(str)
// => 'type="text" id="example" required'
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
