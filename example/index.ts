import Debug from '@bicycle-codes/debug'
import { attributesToString } from '../src/index.js'
const debug = Debug()

const el = document.getElementById('example')
const str = attributesToString(Array.from(el!.attributes))

debug('attributes as string', `'${str}'`)
