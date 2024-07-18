import { test } from '@bicycle-codes/tapzero'
import { attributesToString } from '../src/index.js'

test('example', async t => {
    const el = document.querySelector('input')
    const str = attributesToString(Array.from(el!.attributes))
    t.equal(str, 'type="text" required name="fooo"',
        'should return a string in the right format')
})
