# util
![tests](https://github.com/substrate-system/util/actions/workflows/nodejs.yml/badge.svg)
[![types](https://img.shields.io/npm/types/@substrate-system/util?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![install size](https://flat.badgen.net/packagephobia/install/@substrate-system/util?cache-control=no-cache)](https://packagephobia.com/result?p=@substrate-system/util)
[![license](https://img.shields.io/badge/license-Polyform_Small_Business-249fbc?style=flat-square)](LICENSE)


Utility functions for the front end.

<!-- toc -->

- [install](#install)
- [import](#import)
- [API](#api)
  * [toString](#tostring)
  * [lock & unlock scrolling](#lock--unlock-scrolling)
  * [Constants](#constants)
  * [HTML classes](#html-classes)
  * [`self`](#self)
  * [`humanFilesize`](#humanfilesize)
  * [Queue](#queue)
  * [`sleep`](#sleep)
  * [`isEmailValid(maybeEmail:string)`](#isemailvalidmaybeemailstring)
  * [`parseForm`](#parseform)
  * [`attributesToString`](#attributestostring)
  * [`setAttributes`](#setattributes)
  * [`attributesAsObject`](#attributesasobject)
  * [`objectToString`](#objecttostring)
  * [`CONSTANTS`](#constants)

<!-- tocstop -->

## install

```sh
npm i -S @substrate-system/util
```

## import

```js
import util from '@substrate-system/util'

// or individual functions
import { attributesToString } from '@substrate-system/util'
```

## API

### toString

Convert an object into a string suitable for HTML attributes. The object
should be like `{ attributeName: value }`. `value` can be and array, string,
or boolean. If it is a boolean, then this will add the attribute name only, eg

```js
import { attributes } from '@substrate-system/util/to-string.js'

attributes({ disabled: true })
// => 'disabled'
```

```js
import { attributes } from '@substrate-system/util/to-string.js'

const string = attributes({ hello: 'abc', ok: '123' })

// => 'hello="abc" ok="123"'
```

```js
import { attributes } from '@substrate-system/util/to-string.js'

test('Create attributes with null and undefined', t => {
    const str = attributes({
        hello: 'abc',
        abc: undefined,
        def: null,
        ghi: false,
        jkl: ''
    })

    t.equal(str, 'hello="abc"')
})
```

### lock & unlock scrolling

Prevents body scrolling, useful for things like "dialog" windows.
Keeps track of which elements requested a lock so multiple levels of
locking are possible without premature unlocking.

Originally seen in [the shoelace library](https://github.com/shoelace-style/shoelace/blob/fb59fda70ed737c92611051b49bc7e3a5fed5dc5/src/internal/scroll.ts#L58).

#### CSS

Depends on having this CSS:

```css
@supports (scrollbar-gutter:stable) {
    .scroll-lock body {
        overflow: hidden !important;
    }
}
```

Import from here to add it:
```js
import '@substrate-system/util/css/scroll'
```

#### example

```js
import {
    lockBodyScrolling,
    unlockBodyScrolling
} from '@substrate-system/util/scroll'

// stop scroll
lockBodyScrolling(document.body)

// ...sometime in the future...
unlockBodyScrolling(document.body)
```


#### `lockBodyScrolling`
Stop scrolling.

```ts
function lockBodyScrolling (lockingEl:HTMLElement):void
```

#### `unlockBodyScrolling`
Resume scrolling.

```ts
function unlockBodyScrolling (lockingEl:HTMLElement):void
```


### Constants

Various special characters.

```js
const EM_DASH = '\u2014'
const EN_DASH = '\u2013'
const NBSP = '\u00A0'
const PETABYTE = (2 ** 50)
const TERABYTE = (2 ** 40)
const GIGABYTE = (2 ** 30)
const MEGABYTE = (2 ** 20)
const KILOBYTE = (2 ** 10)
const ELLIPSIS = '\u2026'
const BULLET = '\u2022'
```

```js
import { ELLIPSIS } from '@substrate-system/util/constants'

element.textContent = `${ELLIPSIS} something dramatic ${ELLIPSIS}`
```

### HTML classes
Create a new class name string by concattenating the given input.

```js
import { classes } from '@substrate-system/util/classes'
const className = classes('hello', '123', '100')
// => 'hello 123 100'
```

### `self`
The [`self`](https://developer.mozilla.org/en-US/docs/Web/API/Window/self)
object for Node.

```js
import { self } from '@substrate-system/util/node'
```

### `humanFilesize`
Take the number of bytes, return a string abbreviated to common sizes
(megabyte, kilobyte, etc).

#### Example
```ts
import { humanFilesize } from '@substrate-system/util/filesize'

const size = humanFilesize(10_000)
console.log(size)
// => 9.8 KiB
```

#### API

```ts
function humanFilesize (
    bytes:number,
    si:boolean = false,
    dp:number = 1
):string
```

##### arguments

* `bytes` the byte count
* `si` -- use [SI](https://en.wikipedia.org/wiki/International_System_of_Units),
  instead of [EIC](https://en.wikipedia.org/wiki/Binary_prefix) units
  (default `false`)
* `dp` is the number of decimal places to show.

-------------------------------------------------------------------

### Queue
```js
import { Queue } from '@substrate-system/util/queue'
```

Create a queue of promises. Promises will execute 1 at a time, in
sequential order.

```ts
class Queue<T> {
    add (createP:()=>Promise<T>):Promise<T|void>
}
```

#### `queue.add`
Take a function that returns a promise. Return a promise that will resolve when
the created promise resolves.

```ts
add (createP:()=>Promise<T>):Promise<T|void>
```

> [!NOTE]  
> This will resolve promises in the order they were added to the queue.

#### example

```ts
import { test } from '@substrate-system/tapzero'
import { Queue } from '@substrate-system/util'

test('queue of 3 items', t => {
    const q = new Queue<string>()

    // [p1, p2, p3]
    const returned = [false, false, false]

    const p1 = q.add(() => {
        return new Promise<string>(resolve => {
            setTimeout(() => resolve('p1'), 300)
        })
    })

    const p2 = q.add(() => {
        return new Promise<string>(resolve => {
            setTimeout(() => resolve('p2'), 200)
        })
    })

    const p3 = q.add(() => {
        return new Promise<string>(resolve => {
            setTimeout(() => resolve('p3'), 100)
        })
    })

    // p1 takes the longest
    p1.then((value) => {
        t.equal(value, 'p1', '"p1" string is ok')
        returned[0] = true
        t.ok(!returned[2], 'p2 should not have returned yet')
        t.ok(!returned[1], 'p1 should not have returned yet')
    })

    p2.then(value => {
        t.equal(value, 'p2', 'should get string "p2"')
        returned[1] = true
        t.ok(returned[0], 'should have p1 b/c it was added first')
        t.ok(!returned[2], 'should not have 3 yet b/c it was addded last')
    })

    // p3 is the fastest
    p3.then(value => {
        t.equal(value, 'p3', 'should get string "p3"')
        returned[2] = true
        t.ok(returned[0], 'should have p1 because it was added first')
        t.ok(returned[1], 'should have p2 because it was added next')
    })

    // return 3 so the test knows when to end,
    // because they resolve in order,
    // even though the ms are backwards
    return p3
})
```

------------------------------------------------------------------

### `sleep`
Import sleep from here to reduce duplication.

```ts
function sleep (ms?:number):Promise<void>
```

```js
import { sleep } from '@substrate-system/util'

await sleep(500)  // 1/2 second
```

### `isEmailValid(maybeEmail:string)`
Validate an email address.

```ts
function isEmailValid (maybeEmail:string):boolean
```

#### example

```js
import { isEmailValid } from '@substrate-system/util/email'

isEmailValid('aaa@bbb.com')
// => true
```

------------------------------------------------------------------

### `parseForm`
Parse a form and return a plain object. If a form control with the same name
appears more than once, the property will be converted to an array.

```ts
function parseForm (form:HTMLFormElement):Record<string, unknown>
```

### `attributesToString` 
Take an array of attributes, and transform them into a string format. This can
be useful for creating
[web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).

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

------------------------------------------------------------------

### `setAttributes`
Set the given attributes from an object. Will handle boolean attributes
like `required`.

```ts
function setAttributes (el:HTMLElement, attrs:Record<string, string|boolean>)
```

```ts
import { attributesToString, setAttributes } from '@substrate-system/util'

const input = document.getElementById('test') as HTMLInputElement

setAttributes(input, {
    id: 'test',
    required: true,
    name: 'fooo',
    class: 'testing'
})

console.log(attributesToString(Array.from(input.attributes)))
// => 'id="test" class="testing" name="fooo" required',
```

------------------------------------------------------------------

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

------------------------------------------------------------------

### `objectToString`
Take an object, as from `attributesAsObject`, and stringify it for use in HTML.

```ts
function objectToString (obj:Record<string, string|true>):string
```

```ts
import { objectToString } from '@substrate-system/util'

const obj =  {
    type: "text",
    required: true,
    name: "example",
    foo: "bar"
}
const str = objectToString(obj)
console.log(str)
// => 'type="text" required name="example" foo="bar"'
```

### `CONSTANTS`
Expose unicode characters.

```ts
import * as CONSTANTS from '@substrate-system/util/CONSTANTS'
```

```ts
// CONSTANTS.ts
export const EM_DASH = '\u2014'
export const EN_DASH = '\u2013'
export const NBSP = '\u00A0'
```
