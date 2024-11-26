import { test } from '@substrate-system/tapzero'
import {
    attributesToString,
    attributesAsObject,
    objectToString,
    setAttributes,
    parseForm
} from '../src/index.js'
import './email.js'
import './filesize.js'

test('formToObject', t => {
    document.body.innerHTML += `<form>
        <input name="hello" value="world" />
        <input name="testnull" />
    </form>`

    const form = document.querySelector('form')!
    const obj = parseForm(form)
    t.deepEqual(obj, {
        hello: 'world',
        testnull: ''
    }, 'should return the expected object')
})

test('attributesToString', t => {
    const el = document.querySelector('input')!
    const str = attributesToString(Array.from(el!.attributes))
    t.equal(str, 'type="text" required name="fooo" foo="bar"',
        'should return a string in the right format')
})

let obj
test('attributesAsObject', t => {
    const el = document.querySelector('input')!
    const attrs = Array.from(el.attributes)
    obj = attributesAsObject(attrs)
    console.log('object...', JSON.stringify(obj, null, 2))
    t.equal(obj.required, true, 'boolean attributes are set to `true`')
    t.equal(obj.name, 'fooo', 'should have name attribute')
    t.equal(obj.type, 'text', 'should have type attributes')
    t.equal(obj.foo, 'bar', 'should parse arbitrary attributes')
})

test('object to string', t => {
    const str = objectToString(obj)
    t.equal(str, 'type="text" required name="fooo" foo="bar"',
        'should serialize the attribute object')
})

test('setAttributes', t => {
    document.body.innerHTML += `
        <input id="test" class="test" name="example">
        </input>
    `

    const input = document.getElementById('test') as HTMLInputElement
    t.equal(input.getAttribute('name'), 'example')
    setAttributes(input, {
        required: true,
        name: 'fooo',
        class: 'testing'
    })

    console.log('input.attributes',
        attributesToString(Array.from(input.attributes))
    )

    t.equal(
        attributesToString(Array.from(input.attributes)),
        'id="test" class="testing" name="fooo" required',
        'should create the expected attributes'
    )

    setAttributes(input, { required: false })
    t.equal(input.getAttribute('required'), null,
        'should remove an attribute')
    t.equal(input.getAttribute('name'), 'fooo',
        'should not change other attributes')
})
