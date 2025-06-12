import { test } from '@substrate-system/tapzero'
import { attributes } from '../../src/to-string.js'
import '../../src/node/self.js'

test('self exists', t => {
    t.ok(self, 'self should exist')
})

test('Create attributes string', t => {
    const string = attributes({ hello: 'abc', ok: '123' })
    t.equal(string, 'hello="abc" ok="123"')
})

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

test('Attributes can handle arrays', t => {
    const string = attributes({ hello: 'ok', abc: ['aaa', 'bbb', 123] })
    t.equal(string, 'hello="ok" abc="aaa bbb 123"', 'should convert the array')
})
