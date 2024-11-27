import { test } from '@substrate-system/tapzero'
import { isEmailValid } from '../src/email.js'

test('isEmailValid', async t => {
    t.ok(isEmailValid('aaa@bbb.com'), 'should validate a valid email')

    t.ok(!isEmailValid(''), 'should handle empty string')

    t.ok(!isEmailValid('bbbb'), 'should not validate an invalid email')

    t.ok(!isEmailValid('ccc@bbb'), 'should require a .')

    t.ok(!isEmailValid('ddd@bbb.'), 'should required a TLD')
})
