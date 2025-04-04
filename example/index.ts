import Debug from '@substrate-system/debug'
import { attributesToString } from '../src/index.js'
import { ELLIPSIS, BULLET } from '../src/CONSTANTS.js'
const debug = Debug()

const el = document.getElementById('example')
const str = attributesToString(Array.from(el!.attributes))

// @ts-expect-error dev
window.el = el

debug('attributes as string', `'${str}'`)

const preview = document.querySelector('.constants')
preview!.textContent = `the ellipsis${ELLIPSIS}`

preview!.textContent += `

The bullet character: ${BULLET}
`

// @ts-expect-error dev
window.test = function () {
}
