import { test } from '@substrate-system/tapzero'
import '../../src/node/self.js'

test('self exists', t => {
    t.ok(self, 'self should exist')
})
