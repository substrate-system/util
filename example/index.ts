import Debug from '@substrate-system/debug'
import { attributesToString } from '../src/index.js'
const debug = Debug()

const el = document.getElementById('example')
const str = attributesToString(Array.from(el!.attributes))

// @ts-expect-error dev
window.el = el

debug('attributes as string', `'${str}'`)

// @ts-expect-error dev
window.test = function () {
}
