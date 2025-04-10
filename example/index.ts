import Debug from '@substrate-system/debug'
import { attributesToString } from '../src/index.js'
import { ELLIPSIS, BULLET } from '../src/CONSTANTS.js'
import { lockBodyScrolling, unlockBodyScrolling } from '../src/scroll.js'
import './style.css'
import '../src/scroll.css'
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

const lock = document.getElementById('lock')
const unlock = document.getElementById('unlock')

lock?.addEventListener('click', ev => {
    ev.preventDefault()
    debug('lock')
    lockBodyScrolling(document.body)
})

unlock?.addEventListener('click', ev => {
    ev.preventDefault()
    debug('unlock')
    unlockBodyScrolling(document.body)
})
