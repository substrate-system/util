import { test } from '@bicycle-codes/tapzero'
import {
    attributesToString,
    attributesAsObject,
    objectToString
} from '../src/index.js'

test('attributesToString', t => {
    const el = document.querySelector('input')
    const str = attributesToString(Array.from(el!.attributes))
    t.equal(str, 'type="text" required name="fooo" foo="bar"',
        'should return a string in the right format')
})

let obj
test('attributesAsObject', t => {
    const el = document.querySelector('input')
    const attrs = Array.from(el!.attributes)
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
